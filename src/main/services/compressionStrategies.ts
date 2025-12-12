import { CompressionMode } from '../../shared/types'

/**
 * Generates the Ghostscript arguments array for compressing a file.
 *
 * @param inputPath Absolute path to the source PDF.
 * @param outputPath Absolute path where the compressed PDF should be saved.
 * @param mode The compression strategy to apply.
 * @returns Array of string arguments for ghostscript execution.
 */
export function getGhostscriptArgs(
  inputPath: string,
  outputPath: string,
  mode: CompressionMode = 'transfer'
): string[] {
  // Base arguments for non-interactive safe execution
  const baseArgs = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    '-dPDFSETTINGS=/' + getPdfSettings(mode),
    '-dNOPAUSE',
    '-dQUIET', // Suppress copyright msg
    '-dBATCH',
    '-dSAFER', // Security: restricted FS access
    `-sOutputFile=${outputPath}`,
    inputPath
  ]

  // We could add more specific flags per mode here if dPDFSETTINGS is not detailed enough
  // e.g., downsampling resolution overrides.

  return baseArgs
}

function getPdfSettings(mode: CompressionMode): string {
  switch (mode) {
    case 'ai':
      return 'screen' // 72 dpi, lowest quality
    case 'print':
      return 'prepress' // 300 dpi, high quality
    case 'transfer':
    default:
      return 'ebook' // 150 dpi, medium quality
  }
}
