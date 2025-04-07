"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostBySlug } from "@/lib/queries/getPostsBySlug";
import { getCurrentUser } from "@/lib/supabase/client-auth";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title is required and must be at least 3 characters." }).max(60, { message: "Title must be less than 60 characters." }),
  description: z.string().min(5, { message: "Description is required and must be at least 5 characters." }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL." }),
  content: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"], {
    required_error: "Status is required.",
  }),
});

export default function EditPostForm() {
  const params = useParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      content: "",
      status: undefined,
    },
  });

  useEffect(() => {
    const checkAuthAndFetchPost = async () => {
      try {
        const [post, user] = await Promise.all([
          getPostBySlug(params.slug as string),
          getCurrentUser()
        ]);

        if (!post || !user) {
          console.error("Post not found or user not authenticated");
          router.push("/");
          return;
        }

        // Check if current user is the author
        if (post.authorId !== user.id) {
          // console.error("Unauthorized: You are not the author of this post");
          toast.error("Unauthorized: You are not the author of this post")
          router.push(`/post/${params.slug}`);
          return;
        }

        setIsAuthorized(true);
        form.reset({
          title: post.title || "",
          description: post.description || "",
          thumbnail: post.thumbnail || "",
          content: post.content || "",
          status: post.status || "draft",
        });
      } catch (error) {
        console.error("Error:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      checkAuthAndFetchPost();
    }
  }, [params.slug, form, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.slug}`, values);
      router.push(`/post/${params.slug}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="frame max-w-xl py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="frame max-w-xl mx-auto py-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your content..." className="min-h-[200px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Update Post
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 