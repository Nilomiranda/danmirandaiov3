'use server'

export type Post =  {
  name: string,
  path: string,
  sha: string,
  size: number,
  url: string,
  /**
   * Link that will be used to access the file
   */
  html_url: string,
  git_url: string,
  download_url: string,
  type: 'file' | 'dir',
  _links: unknown[]
}

const requestPayload = {
  baseURL: `${process.env.GITHUB_POSTS_BASE_PATH_URL}/contents`,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }
}

export async function listPosts(): Promise<Post[]> {
  const response = await fetch(requestPayload.baseURL, {
    headers: requestPayload.headers
  })

  const parsedResponse = await response.json();

  console.log({parsedResponse})

  return parsedResponse
}