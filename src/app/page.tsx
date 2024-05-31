import {listPosts} from "@/app/actions";
import Link from "next/link";

export default async function Home() {
  const posts = await listPosts();
  const filteredPosts = posts.filter(post => post.type !== 'dir');
  const hasNoPosts = !Boolean(filteredPosts.length)

  return (
    <main className="h-screen w-full flex flex-col items-center">
      <h1 className="mb-10">Danilo's tech blog</h1>

      { hasNoPosts && <strong>Nothing to see here</strong>}

      <ul className="flex flex-col items-stretch gap-y-2">
        {
          filteredPosts.map(post => (
            <li key={post.sha}>
              <Link href={`/blog/${post.path.replace('.md', '')}`}>{post.name.replace('.md', '')}</Link>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
