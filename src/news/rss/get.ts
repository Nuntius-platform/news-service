export async function get(url: string): Promise<string> {
  const response: Response = await fetch(url, {
    headers: {
      'User-Agent': 'Nuntius/1.0',
      Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
  }

  return response.text()
}
