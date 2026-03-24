import BlogPost from "../../../../components/Blog/BlogPost";
import { blogPosts, slugify } from "../../../../components/Blog/blog-data";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: slugify(post.title) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => slugify(p.title) === slug);
  return {
    title: post ? `${post.title} | Aptahire Blog` : "Post Not Found | Aptahire Blog",
    description: post?.excerpt ?? "",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
}
