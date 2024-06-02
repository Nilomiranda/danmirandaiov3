import {loadPost} from "@/app/blog/[postDocumentPath]/actions";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Metadata} from "next";

type BlogPostPageProps = {
  params: { postDocumentPath: string }
}

export async function generateMetadata({ params: {postDocumentPath} }: BlogPostPageProps): Promise<Metadata> {
  return {
    title: decodeURI(postDocumentPath)
  }
}

export default async function BlogPostPage({ params: { postDocumentPath } }: BlogPostPageProps) {
  const postFileContent = await loadPost(postDocumentPath);

  return (
    <article className="flex flex-col w-full max-w-2xl mx-auto">
      <h1 className="mb-10">{decodeURI(postDocumentPath)}</h1>
      <Markdown
        components={{
          code(props) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={darcula}
                className="code-block"
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code> )
          }
        }}
      >
        {postFileContent}
      </Markdown>
    </article>
  )
}