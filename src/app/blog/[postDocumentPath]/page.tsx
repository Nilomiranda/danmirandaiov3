import {loadPost} from "@/app/blog/[postDocumentPath]/actions";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Metadata} from "next";
import frontmatter from 'remark-frontmatter'
import extractMetadataFromFrontMatter from "@/utils/file/metadataExtractor";
import {friendlyUrlsMap, friendlyUrlToGithubPath} from "@/utils/friendlyUrlsMap";
import Link from "next/link";

type BlogPostPageProps = {
  params: { postDocumentPath: string }
}

export async function generateMetadata({ params: {postDocumentPath} }: BlogPostPageProps): Promise<Metadata> {
  const documentPath = friendlyUrlToGithubPath[postDocumentPath] || postDocumentPath
  const postFileContent = await loadPost(documentPath);
  const potentiallyLoadedWithError = typeof postFileContent !== 'string'

  if (potentiallyLoadedWithError) {
    return {}
  }

  const { title } = friendlyUrlsMap[documentPath] || { title: decodeURI(postDocumentPath) }
  const metadataFromFrontMatter = extractMetadataFromFrontMatter(postFileContent)

  return {
    title: metadataFromFrontMatter?.title || title,
    description: metadataFromFrontMatter?.description,
    openGraph: {
      title: metadataFromFrontMatter?.title || title,
      description: metadataFromFrontMatter?.description,
      images: [metadataFromFrontMatter?.coverImageUrl || '']
    }
  }
}

export default async function BlogPostPage({ params: { postDocumentPath } }: BlogPostPageProps) {
  const documentPath = friendlyUrlToGithubPath[postDocumentPath]  || postDocumentPath
  const postFileContent = await loadPost(documentPath);
  const potentiallyLoadedWithError = typeof postFileContent !== 'string'

  if (potentiallyLoadedWithError && postFileContent?.status === 404) {
    return (
      <article className="flex flex-col w-full max-w-2xl mx-auto">
        <p>Publication not found 😢. Check <Link href="/">other posts</Link></p>
      </article>
    )
  }

  if (potentiallyLoadedWithError) {
    return (
      <article className="flex flex-col w-full max-w-2xl mx-auto">
        <p>Error loading publication 😢. Check <Link href="/">other posts</Link></p>
      </article>
    )
  }

  const { title } = friendlyUrlsMap[documentPath] || { title: '' }


  return (
    <article className="flex flex-col w-full max-w-2xl mx-auto">
      <h1 className="mb-10">{title || decodeURI(postDocumentPath)}</h1>
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