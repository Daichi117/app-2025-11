export interface Post {
    id: number;
    title: string;
    excerpt: string;
    body: string;
    image: string;
    category: string;
    tags: string[];
    date: string;
    readTime: string;
    author: string;
    aiSummary?: string;
  }