// contents.ts

export const AllPostsContents = {
    header: {
      title: "All Posts",
      description:
        "Explore our collection of articles. Each post includes an AI-generated summary to help you quickly find what interests you.",
    },
  
    search: {
      placeholder: "Search posts by title, content, or tags...",
      noResults: "No posts found matching your criteria.",
    },
  
    category: {
      all: "All",
    },
  
    posts: {
      aiSummaryBadge: "AI Summary",
      readMore: "Read more",
      byAuthor: "By",
      showing: (shown: number, total: number) =>
        `Showing ${shown} of ${total} posts`,
    },
  };
  