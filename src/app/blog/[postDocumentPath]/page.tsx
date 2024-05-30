import {loadPost} from "@/app/blog/[postDocumentPath]/actions";
import Markdown from "react-markdown";

export default async function BlogPostPage({ params: { postDocumentPath } }: { params: { postDocumentPath: string } }) {
  const postFileContent = await loadPost(postDocumentPath);

  return (
    <article className="flex flex-col items-center">
      <h1>{decodeURI(postDocumentPath)}</h1>
      <Markdown>
        {postFileContent}
      </Markdown>
    </article>
  )
}