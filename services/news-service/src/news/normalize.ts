import { compile } from 'html-to-text'

const convert = compile({
  wordwrap: false,
  selectors: [
    {
      selector: 'a',
      options: {
        ignoreHref: true,
      },
    },
    {
      selector: 'img',
      format: 'skip',
    },
  ],
})

export function normalize(content: string): string {
  return convert(content)
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
