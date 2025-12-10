"use client" 
import { AboutPageContents } from "./contents"

 export function Hero() {
  return (
    <>
  <section className="max-w-4xl mx-auto text-center mb-16">
    <h1 className="text-foreground mb-6">{AboutPageContents.hero.title}</h1>
    <p className="text-muted-foreground text-lg">
      {AboutPageContents.hero.description}
    </p>
  </section>
    </>
  )
 }

