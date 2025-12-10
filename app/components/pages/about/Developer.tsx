"use client";

import { AboutPageContents } from "./contents";

export function DeveloperInfo() {
  const { title, image, paragraphs } = AboutPageContents.developer;

  return (
    <section className="max-w-5xl mx-auto mb-16">
      <h2 className="text-foreground text-center mb-12">{title}</h2>

      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* 画像 */}
        <img
          src={image.src}
          alt={image.alt}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />

        {/* 段落（mapで全部ループ） */}
        <div className="md:w-2/3">
          {paragraphs.map((text, i) => (
            <p key={i} className="text-muted-foreground mb-4">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
