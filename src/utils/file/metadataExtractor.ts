import {unified} from "unified";
import remarkParse from "remark-parse";
import frontmatter from "remark-frontmatter";

interface BlogPostFrontMatterData {
  title: string;
  description: string;
  coverImageUrl: string;
}

export default function extractMetadataFromFrontMatter(markdownContent: string): BlogPostFrontMatterData | null {
  const processed = unified()
    .use(remarkParse)
    .use(frontmatter)
    .parse(markdownContent)

  const { children } = processed;
  const [possibleYamlFrontmatter] = children;

  const isValidYamlFrontmatter = possibleYamlFrontmatter.type === 'yaml';

  if (isValidYamlFrontmatter) {
    const { value } = possibleYamlFrontmatter
    const metadata = value.split('\n')

    return metadata.map(data => {
      const [metadataKey, metadataValue] = data.split(':')
      return { [metadataKey]: metadataValue }
    })
      .reduce((smallerObject, currentMajorObject) => Object.assign(smallerObject, currentMajorObject), {}) as unknown as BlogPostFrontMatterData
  }

  return null;
}

