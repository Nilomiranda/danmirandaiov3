import {loadPost} from "@/app/blog/[postDocumentPath]/actions";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Metadata} from "next";
import frontmatter from 'remark-frontmatter'
import extractMetadataFromFrontMatter from "@/utils/file/metadataExtractor";

type BlogPostPageProps = {
  params: { postDocumentPath: string }
}

export async function generateMetadata({ params: {postDocumentPath} }: BlogPostPageProps): Promise<Metadata> {
  const postFileContent = await loadPost(postDocumentPath);
  const metadataFromFrontMatter = extractMetadataFromFrontMatter(postFileContent)
  const decodedTitle = decodeURI(postDocumentPath)

  return {
    title: metadataFromFrontMatter?.title || decodedTitle,
    description: metadataFromFrontMatter?.description,
    openGraph: {
      title: metadataFromFrontMatter?.title || decodedTitle,
      description: metadataFromFrontMatter?.description,
      images: [metadataFromFrontMatter?.coverImageUrl || '']
    }
  }
}

export default async function BlogPostPage({ params: { postDocumentPath } }: BlogPostPageProps) {
  const postFileContent = await loadPost(postDocumentPath);

  return (
    <article className="flex flex-col w-full max-w-2xl mx-auto">
      <h1 className="mb-10">{decodeURI(postDocumentPath)}</h1>
      <Markdown
        remarkPlugins={[frontmatter]}
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