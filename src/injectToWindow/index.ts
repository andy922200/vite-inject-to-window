import { Plugin } from 'vite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowVariables = Record<string, any>

const injectToWindowPlugin = <T extends WindowVariables>(variables: T): Plugin => {
  return {
    name: 'inject-to-window',
    renderChunk(code: string) {
      const injectCode = Object.keys(variables)
        .map((key) => `window.${key} = ${JSON.stringify(variables[key])};`)
        .join('\n')

      return {
        code: code + `\n\n${injectCode}`,
        map: null,
      }
    },
  }
}

export { injectToWindowPlugin }
