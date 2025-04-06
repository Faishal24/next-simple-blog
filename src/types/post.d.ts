export interface PostProps {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  thumbnail: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
  
  // For Display
  author: {
    name: string;
    avatar: string;
    slug: string;
  }
}
