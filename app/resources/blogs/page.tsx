import { Suspense } from "react";
import BlogListing from "../../../components/Blog/BlogListing";

export const metadata = {
  title: "Blog | Aptahire",
  description: "Recruitment strategies, AI tools, and people practices — written by practitioners.",
};

export default function BlogsPage() {
  return (
    <Suspense>
      <BlogListing />
    </Suspense>
  );
}
