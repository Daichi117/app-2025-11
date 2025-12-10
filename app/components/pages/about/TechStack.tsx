"use client";

import { AboutPageContents } from "./contents";

const {title,items} = AboutPageContents.techstack
export function TechStack() {
    return (
        <>
         <section className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-8">
                <h2 className="text-foreground mb-6 text-center">{title}</h2>

                {items.map((item,i)=> {
                    return (
                        <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-background rounded-lg">
                            <p className="text-foreground">{item}</p>
                        </div>
                        </div>

                    )


                })}
            </div>
         </section>
        </>
    )
}