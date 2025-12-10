"use client";

import Link from "next/link";
import { Badge } from "@ui/badge";
import { Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { HomePageContents } from "./contents";
import { Post } from "@type/types";

interface FeaturedPostSectionProps {
    featuredPost: Post | null; // もし値がない場合に備えて null も許可
  }
  
export function FeaturedPostSection ({featuredPost}:FeaturedPostSectionProps) {
    if(!featuredPost){
        return null;
    }

    const {title,subtitle} = HomePageContents.featured;

    return (
        <>
         <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <Link href={`${HomePageContents.featured.link}/${featuredPost.id}`}>
      <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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

            <h2 className="text-foreground mb-3">{featuredPost.title}</h2>

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
      </Link>
      </section>
        </>
    )

}