import { describe, it, expect } from 'vitest'
import { getGhostscriptArgs } from './compressionStrategies'

describe('getGhostscriptArgs', () => {
  const input = '/path/to/input.pdf'
  const output = '/path/to/output.pdf'

  it('should include mandatory security and batch flags', () => {
    const args = getGhostscriptArgs(input, output, 'transfer')
    expect(args).toContain('-dSAFER')
    expect(args).toContain('-dBATCH')
    expect(args).toContain('-dNOPAUSE')
    expect(args).toContain('-sDEVICE=pdfwrite')
  })

  it('should use correct settings for "ai" mode', () => {
    const args = getGhostscriptArgs(input, output, 'ai')
    expect(args).toContain('-dPDFSETTINGS=/screen')
  })

  it('should use correct settings for "print" mode', () => {
    const args = getGhostscriptArgs(input, output, 'print')
    expect(args).toContain('-dPDFSETTINGS=/prepress')
  })

  it('should use correct settings for "transfer" mode', () => {
    const args = getGhostscriptArgs(input, output, 'transfer')
    expect(args).toContain('-dPDFSETTINGS=/ebook')
  })

  it('should default to "transfer" / ebook if mode is omitted', () => {
    const args = getGhostscriptArgs(input, output) // @ts-ignore testing default
    expect(args).toContain('-dPDFSETTINGS=/ebook')
  })

  it('should set correct input and output paths', () => {
    const args = getGhostscriptArgs(input, output, 'transfer')
    expect(args).toContain(`-sOutputFile=${output}`)
    expect(args[args.length - 1]).toBe(input)
  })
})
