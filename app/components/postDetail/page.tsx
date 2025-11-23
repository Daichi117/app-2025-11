"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
}

export function PostDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.aiSummary || post.title);

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "bluesky") {
      shareUrl = `https://bsky.app/intent/compose?text=${text}`;
    } else if (platform === "copy") {
      // Fallback for environments where clipboard API is blocked
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              toast.success("Link copied to clipboard!");
            })
            .catch(() => {
              // Fallback: create temporary input element
              const input = document.createElement('input');
              input.value = window.location.href;
              document.body.appendChild(input);
              input.select();
              document.execCommand('copy');
              document.body.removeChild(input);
              toast.success("Link copied to clipboard!");
            });
        } else {
          // Legacy fallback
          const input = document.createElement('input');
          input.value = window.location.href;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          toast.success("Link copied to clipboard!");
        }
      } catch (error) {
        toast.error("Could not copy link. Please copy manually.");
      }
      return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/work')}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Back to all posts
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 md:p-12 shadow-lg">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline">#{tag}</Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-foreground mb-6">{post.title}</h1>

            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">{post.author[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-foreground">By {post.author}</p>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
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
              </div>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('bluesky')}
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>

            {/* AI Summary */}
            {post.aiSummary && (
              <div className="bg-primary/10 rounded-lg p-6 mb-8 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-5 text-primary" />
                  <h3 className="text-foreground">AI Summary</h3>
                </div>
                <p className="text-foreground">{post.aiSummary}</p>
              </div>
            )}

            {/* Body */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                {post.body.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Share CTA */}
          <div className="bg-card rounded-lg p-8 mt-6 text-center">
            <h3 className="text-foreground mb-3">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-4">
              Share it with your network and help others discover great content
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleShare('twitter')}>
                Share on X
              </Button>
              <Button variant="outline" onClick={() => handleShare('bluesky')}>
                Share on Bluesky
              </Button>
            </div>
          </div>
        </div>
      </article>

      <div className="h-16" />
    </div>
  );
}