import { AboutPageContents } from "./contents"

const {title,paragraphs} = AboutPageContents.mission
export function Mission() {
    return (
        <>
   <section className="max-w-4xl mx-auto mb-16">

    {paragraphs.map((item,i)=>{
            return (
                <div key={i} className="bg-card rounded-lg p-8 md:p-12">
                <h2 className="text-foreground mb-4">{title}</h2>
                <p className="text-muted-foreground mb-4">
                  {item}
                </p>
              </div>
            )})}
 </section>
        </>
    )
}