import { Sparkles, Share2, Users, TrendingUp } from "lucide-react";


export const AboutPageContents = {
  hero: {
    title: "About The Blog",
    description:
      "A modern blogging platform powered by AI, designed to help writers share their stories and connect with readers in meaningful ways.",
  },

  mission: {
    title: "Our Mission",
    paragraphs: [
      "We believe that everyone has a story worth telling. The Blog combines the power of artificial intelligence with intuitive design to make content creation and discovery effortless.",
      "Our AI-powered summarization helps readers quickly find content they'll love, while giving writers powerful tools to reach their audience across multiple platforms.",
    ],
  },

  features: {
    title: "Key Features",
    list: [
      {
        icon: Sparkles,
        title: "AI Summaries",
        description: "Automatic AI-generated summaries for every post",
      },
      {
        icon: Share2,
        title: "Social Sharing",
        description: "Share to X and Bluesky with one click",
      },
      {
        icon: Users,
        title: "User Management",
        description: "Secure authentication and author controls",
      },
      {
        icon: TrendingUp,
        title: "Post Scheduling",
        description: "Schedule posts for optimal engagement",
      },
    ],
  },
  developer: {
    title: "About the Developer",
    image: {
      src: "https://images.unsplash.com/photo-1742440710136-1976b1cad864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjM3MDQwODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Developer",
    },
    paragraphs: [
      "The Blog was created by a passionate developer who believes in the power of combining human creativity with artificial intelligence to create better content experiences.",
      "With a focus on clean design, intuitive user experiences, and cutting-edge AI technology, this platform represents the future of content creation and sharing.",
      "Our goal is to empower writers of all levels to share their unique perspectives with the world, while making it easier for readers to discover content that resonates with them.",
    ],
  },

  techstack: {
    title: "Technology Stack",
    items: ["React", "TypeScript", "Tailwind CSS", "AI APIs"],
  },
};
