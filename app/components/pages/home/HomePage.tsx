"use client";
import { Hero } from "./Hero";
import { FeaturedPostSection } from "./Featured";
import { LatestPostsSection } from "./LatestPostSection";
import { CTASection } from "./CTASection";
import { Post } from "@type/types";

interface HomePageProps {
  posts: Post[];
}
export function HomePage({posts}:HomePageProps) {
  const LatestPost = posts.slice(0,3);
  const FeaturedPost = posts[0];

  return (
    <>
    <Hero />
    <FeaturedPostSection featuredPost={FeaturedPost} />
      <LatestPostsSection latestPosts={LatestPost} />
      <CTASection />
    </>
  )
}