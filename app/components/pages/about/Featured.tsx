"use client";

import { AboutPageContents } from "./contents";


export function FeaturedPostSection() {

  const { title, list } = AboutPageContents.features;

  return (
    <section className="max-w-5xl mx-auto mb-16">
      <h2 className="text-foreground text-center mb-12">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-card rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
