import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
    Mail,
    Send,
    Twitter,
    Linkedin,
    Github,
  } from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success(
      "Message sent successfully! We'll get back to you soon.",
    );
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-foreground mb-4">Get In Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say
            hello? We'd love to hear from you. Fill out the form
            below or connect with us on social media.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-8">
              <h2 className="text-foreground mb-6">
                Send us a message
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="size-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-foreground mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground">Email</p>
                    <p className="text-muted-foreground">
                      hello@theblog.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-foreground mb-4">
                Follow Us
              </h3>
              <div className="space-y-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition-colors group"
                >
                  <Twitter className="size-5 text-primary" />
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      Twitter (X)
                    </p>
                    <p className="text-muted-foreground text-sm">
                      @theblog
                    </p>
                  </div>
                </a>

                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition-colors group"
                >
                  <svg
                    className="size-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      Bluesky
                    </p>
                    <p className="text-muted-foreground text-sm">
                      @theblog.bsky.social
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition-colors group"
                >
                  <Linkedin className="size-5 text-primary" />
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      LinkedIn
                    </p>
                    <p className="text-muted-foreground text-sm">
                      The Blog
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition-colors group"
                >
                  <Github className="size-5 text-primary" />
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      GitHub
                    </p>
                    <p className="text-muted-foreground text-sm">
                      @theblog
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-foreground mb-2">
                Quick Response
              </h3>
              <p className="text-muted-foreground">
                We typically respond within 24-48 hours during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}