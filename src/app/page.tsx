import {listPosts} from "@/app/actions";
import Link from "next/link";

export default async function Home() {
  const posts = await listPosts();
  const filteredPosts = posts.filter(post => post.type !== 'dir');

  return (
    <main className="h-screen w-full flex flex-col items-center">
      <h1>Danilo's tech blog</h1>

      <section>
        <ul>
          {
            filteredPosts.map(post => (
              <Link key={post.sha} href={`/blog/${post.path.replace('.md', '')}`}>{post.name.replace('.md', '')}</Link>
            ))
          }
        </ul>
      </section>
    </main>
  );
}
