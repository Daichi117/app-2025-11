import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Badge } from "../../ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";

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

interface PostDetailPageProps {
  post: Post;
  onNavigate: (page: string) => void;
}

export function PostDetailPage({ post, onNavigate }: PostDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => onNavigate("work")}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Posts
        </Button>

        <article>
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{post.readTime}</span>
              </div>
              <span>By {post.author}</span>
            </div>
          </div>

          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            <div className="text-foreground whitespace-pre-line">
              {post.body}
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

