import {listPosts} from "@/app/actions";
import Link from "next/link";
import {friendlyUrlsMap} from "@/utils/friendlyUrlsMap";

export default async function Home() {
  const posts = await listPosts();
  const filteredPosts = posts.filter(post => {
    const isDirectory = post.type === 'dir';
    const isMDFileType = post.name.endsWith('.md')

    return !isDirectory && isMDFileType;
  }).map(post => {
    const { friendlyUrl, title } = friendlyUrlsMap[post.path];
    return { ...post, friendlyUrl, title }
  });
  console.log({filteredPosts})
  const hasNoPosts = !Boolean(filteredPosts.length)

  return (
    <main className="w-full flex flex-col items-center">
      <div className="mb-10 flex flex-col items-center">
        <h1>Danilo da Silva</h1>
        <h2>Building software. Breaking bugs</h2>
      </div>

      {hasNoPosts && <strong>Nothing to see here</strong>}

      <ul className="flex flex-col items-stretch gap-y-2">
        {
          filteredPosts.map(post => (
            <li key={post.sha}>
              <Link href={`/blog/${post.friendlyUrl}`}>{post.title}</Link>
              {/*<Link href={`/blog/${post.path.replace('.md', '')}`}>{post.name.replace('.md', '')}</Link>*/}
            </li>
          ))
        }
      </ul>
    </main>
  );
}