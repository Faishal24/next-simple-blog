export interface PostProps {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  thumbnail: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  authorId: string;
  created_at?: string;
  updated_at?: string;
  
  // For Display
  author: {
    name: string;
    avatar: string;
    slug: string;
  }
}
