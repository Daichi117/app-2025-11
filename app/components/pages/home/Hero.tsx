"use client";
import Link from "next/link";
import { HomePageContents } from "./contents";
import { Button } from "@ui/button";

export function Hero() {
    return (
        <div>
             <section className="bg-card py-12 md:py-16">
 <div className="container mx-auto px-4">
   <div className="max-w-3xl mx-auto text-center">
     <h1 className="text-foreground mb-4">
       {HomePageContents.hero.title}
     </h1>
     <p className="text-muted-foreground mb-8">
       {HomePageContents.hero.description}
     </p>
     <Link href={HomePageContents.hero.buttonLink}>
       <Button size="lg"></Button>
     </Link>
   </div>
 </div>
</section>
        </div>
    )
}
 {/* Hero Section */}
