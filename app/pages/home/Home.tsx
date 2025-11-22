import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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

interface HomePageProps {
  posts: Post[];
  onNavigate: (page: string, postId?: number) => void;
}

export function HomePage({ posts, onNavigate }: HomePageProps) {
  const latestPosts = posts.slice(0, 3);
  const featuredPost = posts[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-4">
              Welcome to The Blog
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover stories, thinking, and expertise from
              writers on any topic that matters to you.
              AI-powered summaries help you find the perfect
              read.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("work")}
            >
              Explore All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">
              Featured Story
            </h2>
            <p className="text-muted-foreground">
              Our top pick this week
            </p>
          </div>

          <article
            className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() =>
              onNavigate("post-detail", featuredPost.id)
            }
          >
            <div className="relative h-96 overflow-hidden">
              <ImageWithFallback
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-3">
                {featuredPost.category}
              </Badge>
              <h2 className="text-foreground mb-3 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {featuredPost.aiSummary || featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  By {featuredPost.author}
                </span>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Latest Posts */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-foreground mb-2">
              Latest Posts
            </h2>
            <p className="text-muted-foreground">
              Recent articles from our community
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2"
            onClick={() => onNavigate("work")}
          >
            View All <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
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
                <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">
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
      </section>

      {/* CTA Section */}
      <section className="bg-card py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-foreground mb-4">
              Start Sharing Your Stories
            </h2>
            <p className="text-muted-foreground mb-6">
              Join our community of writers. Create posts with
              AI-powered summaries and share them across social
              platforms.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("getstarted")}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}