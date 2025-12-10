"use client"
import { AllPostsContents } from "./contents"

const {title,description} = AllPostsContents.header
export default function Header() {
  return (
   <>
    <h1 className="text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">
          {description}
        </p>
   </>
  )
}
