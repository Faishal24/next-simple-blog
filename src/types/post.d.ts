export interface PostProps {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  author_id: string;
  
  // For Display
  name: string;
  avatar: string;
  userSlug: string;
}
