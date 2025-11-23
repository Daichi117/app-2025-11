import WorkPage from "../components/work/page";
import { getAllPosts } from "../lib/posts";

export default function Work() {
  const posts = getAllPosts();
  return <WorkPage posts={posts} />;
}

