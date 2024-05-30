import {loadPost} from "@/app/blog/[postDocumentPath]/actions";
import Markdown from "react-markdown";

export default async function BlogPostPage({ params: { postDocumentPath } }: { params: { postDocumentPath: string } }) {
  console.log({postDocumentPath})

  const postFileContent = await loadPost(postDocumentPath);
  console.log({postFileContent})

  return (
    <main>
      <Markdown>
        {postFileContent}
      </Markdown>
    </main>
  )
}