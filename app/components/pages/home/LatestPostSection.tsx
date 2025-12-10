"use client";

import Link from "next/link";
import { Badge } from "@ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Button } from "@ui/button";
import { HomePageContents } from "./contents";
import { Post } from "@type/types";

interface LatestPostSectionProps {
    latestPosts: Post[] | null; // もし値がない場合に備えて null も許可
  }


export function LatestPostsSection({ latestPosts }:LatestPostSectionProps) {
  const { title, subtitle, viewAllLabel } = HomePageContents.latest;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <Link href={HomePageContents.latest.link}>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            {viewAllLabel} <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestPosts?.map((post) => (
          <Link key={post.id} href={`${HomePageContents.latest.link}/${post.id}`}>
            <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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

                <h3 className="text-foreground mb-2">{post.title}</h3>

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
          </Link>
        ))}
      </div>
    </section>
  );
}
