import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export function BlogCard({ title, excerpt, image, category, date, readTime, featured }: BlogCardProps) {
  if (featured) {
    return (
      <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <div className="relative h-96 overflow-hidden">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <Badge variant="secondary" className="mb-3">{category}</Badge>
          <h2 className="text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h2>
          <p className="text-muted-foreground mb-4">{excerpt}</p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-3">{excerpt}</p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}