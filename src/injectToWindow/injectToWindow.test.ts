import { injectToWindowPlugin } from './index'

describe('injectToWindowPlugin', () => {
  it('should inject variables into window object', () => {
    const variables = {
      testVar1: 'value1',
      testVar2: 12345,
      testVar3: true,
    }

    const plugin = injectToWindowPlugin(variables)

    const mockCode = 'console.log("Original code");'
    const result = (plugin as any)?.renderChunk(mockCode)
    const expectedInjectCode =
      `window.testVar1 = "value1";window.testVar2 = 12345;window.testVar3 = true;`.trim()

    const normalizedResult = result?.code.replace(/\s+/g, '')
    const normalizedExpected = (mockCode + `\n\n${expectedInjectCode}`).replace(/\s+/g, '')

    expect(normalizedResult).toContain(normalizedExpected)
  })

  it('should handle empty variables object', () => {
    const variables = {}

    const plugin = injectToWindowPlugin(variables)

    const mockCode = 'console.log("Original code");'
    const result = (plugin as any)?.renderChunk(mockCode)

    expect(result?.code).toContain(mockCode)
  })

  it('should correctly stringify complex objects', () => {
    const variables = {
      complexVar: { key1: 'value1', key2: [1, 2, 3] },
    }

    const plugin = injectToWindowPlugin(variables)

    const mockCode = 'console.log("Original code");'
    const result = (plugin as any)?.renderChunk(mockCode)

    const expectedInjectCode = `window.complexVar = {"key1":"value1","key2":[1,2,3]};`.trim()

    expect(result?.code).toContain(expectedInjectCode)
  })
})
