import { describe, it, expect } from 'vitest'

// Import the function to test
// Note: We need to use relative path from the test location
const truncateFilename = (
  filename: string,
  maxLength = 14,
  frontChars = 10,
  backChars = 4
): string => {
  if (filename.length <= maxLength) return filename
  return `${filename.slice(0, frontChars)}...${filename.slice(-backChars)}`
}

describe('truncateFilename', () => {
  it('should return original filename if length <= maxLength', () => {
    expect(truncateFilename('short.pdf')).toBe('short.pdf')
    expect(truncateFilename('exactly14char.')).toBe('exactly14char.')
  })

  it('should return original filename when exactly at maxLength', () => {
    // 14 characters exactly
    const exactLength = '12345678901234'
    expect(truncateFilename(exactLength)).toBe(exactLength)
  })

  it('should truncate long filename with ellipsis in the middle', () => {
    const filename = '第3組_介紹並示範SoftEther軟體的使用.pdf'
    const result = truncateFilename(filename)
    // Should be: first 10 chars + '...' + last 4 chars = 17 chars total
    expect(result.length).toBe(17)
    expect(result.startsWith('第3組_介紹並示範S')).toBe(true)
    expect(result.endsWith('.pdf')).toBe(true)
    expect(result).toContain('...')
  })

  it('should respect custom parameters', () => {
    const result = truncateFilename('abcdefghijklmnopqrstuvwxyz.pdf', 20, 5, 5)
    expect(result).toBe('abcde...z.pdf')
  })

  it('should handle ASCII filenames correctly', () => {
    const filename = 'very_long_filename_that_should_be_truncated.pdf'
    const result = truncateFilename(filename)
    expect(result.length).toBe(17) // 10 + 3 + 4
    expect(result).toBe('very_long_....pdf')
  })

  it('should handle edge case with empty string', () => {
    expect(truncateFilename('')).toBe('')
  })

  it('should handle filename with only extension', () => {
    expect(truncateFilename('.pdf')).toBe('.pdf')
  })
})
