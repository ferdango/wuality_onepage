import BlogRail from "./BlogRail";
import { blog } from "@/lib/content";

export default function Blog() {
  return (
    <section id="blog" className="bg-ink">
      <BlogRail title={blog.title} items={blog.items} ariaLabel="Artículos y episodios de Wuality" />
    </section>
  );
}
