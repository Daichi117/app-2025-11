import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Sparkles, Users, Share2, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-foreground mb-6">About The Blog</h1>
        <p className="text-muted-foreground text-lg">
          A modern blogging platform powered by AI, designed to help writers share their stories 
          and connect with readers in meaningful ways.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-card rounded-lg p-8 md:p-12">
          <h2 className="text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            We believe that everyone has a story worth telling. The Blog combines the power of 
            artificial intelligence with intuitive design to make content creation and discovery 
            effortless.
          </p>
          <p className="text-muted-foreground">
            Our AI-powered summarization helps readers quickly find content they'll love, while 
            giving writers powerful tools to reach their audience across multiple platforms.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-foreground text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="size-6 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">AI Summaries</h3>
            <p className="text-muted-foreground">
              Automatic AI-generated summaries for every post
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="size-6 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">Social Sharing</h3>
            <p className="text-muted-foreground">
              Share to X and Bluesky with one click
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="size-6 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">User Management</h3>
            <p className="text-muted-foreground">
              Secure authentication and author controls
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="size-6 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">Post Scheduling</h3>
            <p className="text-muted-foreground">
              Schedule posts for optimal engagement
            </p>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1742440710136-1976b1cad864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjM3MDQwODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Developer"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-foreground mb-4">About the Developer</h2>
              <p className="text-muted-foreground mb-4">
                The Blog was created by a passionate developer who believes in the power of 
                combining human creativity with artificial intelligence to create better content 
                experiences.
              </p>
              <p className="text-muted-foreground mb-4">
                With a focus on clean design, intuitive user experiences, and cutting-edge AI 
                technology, this platform represents the future of content creation and sharing.
              </p>
              <p className="text-muted-foreground">
                Our goal is to empower writers of all levels to share their unique perspectives 
                with the world, while making it easier for readers to discover content that 
                resonates with them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-8">
          <h2 className="text-foreground mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-foreground">React</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-foreground">TypeScript</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-foreground">Tailwind CSS</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-foreground">AI APIs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
