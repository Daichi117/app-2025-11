"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Label } from "@ui/label";
import { Badge } from "@ui/badge";
import { Sparkles, Save, Send, Calendar, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";

export function PostPage() {
  const router = useRouter();
  const { username, isLoggedIn } = useAuth();

  // Redirect if not logged in
  if (!isLoggedIn) {
    router.push('/getstarted');
    return null;
  }

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
    imageUrl: "",
    scheduleDate: "",
    scheduleTime: ""
  });
  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);

  const categories = ["Technology", "Design", "Lifestyle", "Photography", "Travel", "Food"];

  const generateAISummary = () => {
    setIsGenerating(true);
    
    // Mock AI summary generation
    setTimeout(() => {
      const summaries = [
        "This insightful article explores innovative approaches and practical applications in modern contexts.",
        "A comprehensive guide that breaks down complex concepts into actionable insights for readers.",
        "Discover key perspectives and expert analysis on this timely and relevant topic.",
        "An engaging exploration of current trends and their implications for the future.",
        "Learn from real-world examples and gain valuable knowledge in this well-researched piece."
      ];
      
      const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
      setAiSummary(randomSummary);
      setIsGenerating(false);
      toast.success("AI summary generated!");
    }, 1500);
  };

  const handleAddTag = () => {
    if (formData.tags.trim() && !tagList.includes(formData.tags.trim())) {
      setTagList([...tagList, formData.tags.trim()]);
      setFormData(prev => ({ ...prev, tags: "" }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTagList(tagList.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    if (!formData.title || !formData.body || !formData.category) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // In a real app, this would save to database
    toast.success(isDraft ? "Post saved as draft!" : "Post published successfully!");
    router.push('/work');
  };

  const handleShareToSocial = (platform: string) => {
    if (!aiSummary && !formData.body) {
      toast.error("Please generate an AI summary first!");
      return;
    }

    const text = aiSummary || formData.body.substring(0, 280);
    const url = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(text);

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${url}`;
    } else if (platform === "bluesky") {
      shareUrl = `https://bsky.app/intent/compose?text=${shareText}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      toast.success(`Opening ${platform} share dialog...`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Create New Post</h1>
          <p className="text-muted-foreground">
            Write your story and let AI help you create the perfect summary
          </p>
        </div>

        <form className="space-y-6">
          {/* Title */}
          <div className="bg-card rounded-lg p-6">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your post title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="mt-2"
            />
          </div>

          {/* Body */}
          <div className="bg-card rounded-lg p-6">
            <Label htmlFor="body">Content *</Label>
            <Textarea
              id="body"
              placeholder="Write your post content here..."
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              required
              rows={12}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {formData.body.split(' ').filter(w => w).length} words · {Math.ceil(formData.body.split(' ').length / 200)} min read
            </p>
          </div>

          {/* AI Summary */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Label>AI-Generated Summary</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAISummary}
                disabled={isGenerating || !formData.body}
              >
                <Sparkles className="size-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Summary"}
              </Button>
            </div>
            {aiSummary && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-foreground">{aiSummary}</p>
              </div>
            )}
            {!aiSummary && (
              <p className="text-muted-foreground text-sm">
                Generate an AI summary to make your post more discoverable and shareable
              </p>
            )}
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
                className="mt-2 w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="bg-card rounded-lg p-6">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add a tag..."
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>
              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tagList.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="bg-card rounded-lg p-6">
            <Label htmlFor="imageUrl">Featured Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="mt-2"
            />
          </div>

          {/* Scheduling (Optional Feature) */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-5 text-primary" />
              <Label>Schedule Publication (Optional)</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduleDate" className="text-sm text-muted-foreground">Date</Label>
                <Input
                  id="scheduleDate"
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="scheduleTime" className="text-sm text-muted-foreground">Time</Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleTime: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* SNS Sharing */}
          <div className="bg-card rounded-lg p-6">
            <Label className="mb-4 block">Share to Social Media</Label>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                disabled={!aiSummary && !formData.body}
              >
                <svg className="size-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share to X
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleShareToSocial('bluesky')}
                disabled={!aiSummary && !formData.body}
              >
                <svg className="size-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10z"/>
                </svg>
                Share to Bluesky
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={(e) => handleSubmit(e, true)}
            >
              <Save className="size-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={(e) => handleSubmit(e, false)}
            >
              <Send className="size-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}