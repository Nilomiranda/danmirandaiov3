'use server'

const requestPayload = {
  baseURL: `${process.env.GITHUB_POSTS_BASE_PATH_URL}/contents`,
  headers: {
    Accept: 'application/vnd.github.raw+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }
}

export async function loadPost(postDocumentPath: string) {
  return fetch(`${requestPayload.baseURL}/${postDocumentPath}.md`, {
    headers: requestPayload.headers
  }).then(res => res.text())
}