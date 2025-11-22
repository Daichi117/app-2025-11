export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">About</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p className="mb-4">
            Welcome to The Blog, a platform dedicated to sharing stories, ideas, and insights 
            on technology, design, lifestyle, and more.
          </p>
          <p className="mb-4">
            Our mission is to create a space where writers and readers can connect, learn, 
            and grow together. We believe in the power of storytelling and the importance 
            of diverse perspectives.
          </p>
          <p>
            Join our community and start sharing your stories today!
          </p>
        </div>
      </div>
    </div>
  );
}

