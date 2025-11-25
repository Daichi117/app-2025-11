"use client";

import Link from "next/link";
import { Button } from "@ui/button";
import { HomePageContents } from "./contents";

export function CTASection() {
  const { title, description, buttonLabel, buttonLink } =
    HomePageContents.cta;

  return (
    <section className="bg-card py-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>

          <Link href={buttonLink}>
            <Button size="lg">{buttonLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
