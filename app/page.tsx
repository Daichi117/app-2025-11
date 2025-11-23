import { HomePage } from "./components/home/page";
import { getAllPosts } from "./lib/posts";

export default function Home() {
  const posts = getAllPosts();
  
  return <HomePage posts={posts} />;
}



