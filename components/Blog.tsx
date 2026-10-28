"use client";

import BlogRail from "./BlogRail";
import { useContent } from "./LangProvider";

export default function Blog() {
  const { blog, ui } = useContent();
  return (
    <section id="blog" className="bg-ink">
      <BlogRail title={blog.title} items={blog.items} ariaLabel={ui.blog.label} />
    </section>
  );
}
