import PostDetailPage from "../../components/postDetail/page";
import { getPostById } from "../../lib/posts";
import { notFound } from "next/navigation";

export default function PostDetail({ params }: { params: { id: string } }) {
  const post = getPostById(Number(params.id));
  
  if (!post) {
    notFound();
  }

  return <PostDetailPage post={post} />;
}

