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
  try {
    const res = await fetch(`${requestPayload.baseURL}/${postDocumentPath}`, {
      headers: requestPayload.headers
    })

    const parsedResponse = await res.text()
    const jsonResponse = parsedResponse.includes('"status":"404"') && JSON.parse(parsedResponse)
    const { status } = jsonResponse

    if (status === '404') {
      const secondAttemptToLoadPostResponse = await fetch(`${requestPayload.baseURL}/${postDocumentPath}.md`, {
        headers: requestPayload.headers
      })

      const parsedSecondAttempt = await secondAttemptToLoadPostResponse.text()
      const jsonSecondAttempt = parsedSecondAttempt.includes('"status":"404"') && JSON.parse(parsedSecondAttempt)

      if (jsonSecondAttempt.status === '404') {
        return {
          status: 404,
          code: 'POST_NOT_FOUND'
        }
      }

      return parsedSecondAttempt;
    }

    return parsedResponse

  } catch (err) {
    console.error('error loading post', err)

    return {
      status: 500,
      code: 'INTERNAL_SERVER_ERROR'
    }
  }
}