import { useState } from "react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Calendar, Clock, Search } from "lucide-react";
import { Input } from "../../ui/input";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.excerpt
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-foreground mb-4">All Posts</h1>
        <p className="text-muted-foreground mb-8">
          Explore our collection of articles. Each post includes
          an AI-generated summary to help you quickly find what
          interests you.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() =>
                  onNavigate("post-detail", post.id)
                }
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      {post.category}
                    </Badge>
                    {post.aiSummary && (
                      <Badge
                        variant="outline"
                        className="text-primary border-primary"
                      >
                        AI Summary
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-3">
                    {post.aiSummary || post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground border-t border-border pt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span className="text-sm">
                          {post.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span className="text-sm">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    By {post.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing {filteredPosts.length} of {posts.length}{" "}
            posts
          </p>
        </div>
      )}
    </div>
  );
}