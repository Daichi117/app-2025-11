import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-foreground">BloomLog</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Design</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Lifestyle</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
            <Menu className="size-6" />
          </Button>
          <Button className="hidden md:inline-flex">Subscribe</Button>
        </div>
      </div>
    </header>
  );
}