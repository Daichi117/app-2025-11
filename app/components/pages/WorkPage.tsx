import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Badge } from "../../ui/badge";
import { Calendar, Clock } from "lucide-react";

interface Post {
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

interface WorkPageProps {
  posts: Post[];
  onNavigate: (page: string, postId?: number) => void;
}

export function WorkPage({ posts, onNavigate }: WorkPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">All Posts</h1>
        <p className="text-muted-foreground">
          Explore all our articles and stories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onNavigate("post-detail", post.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <Badge variant="secondary" className="mb-2">
                {post.category}
              </Badge>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {post.aiSummary || post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

