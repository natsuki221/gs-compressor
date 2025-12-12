export type CompressionMode = 'ai' | 'print' | 'transfer'

interface CompressionStrategy {
  getArgs(): string[]
}

class AIStrategy implements CompressionStrategy {
  getArgs(): string[] {
    return [
      '-dPDFSETTINGS=/screen',
      '-dColorImageResolution=72',
      '-dGrayImageResolution=72',
      '-dMonoImageResolution=72'
    ]
  }
}

class PrintStrategy implements CompressionStrategy {
  getArgs(): string[] {
    return [
      '-dPDFSETTINGS=/prepress',
      '-dColorImageResolution=300',
      '-dGrayImageResolution=300',
      '-dMonoImageResolution=300',
      '-sColorConversionStrategy=LeaveColorUnchanged'
    ]
  }
}

class TransferStrategy implements CompressionStrategy {
  getArgs(): string[] {
    return [
      '-dPDFSETTINGS=/ebook',
      '-dColorImageResolution=150',
      '-dGrayImageResolution=150',
      '-dMonoImageResolution=150'
    ]
  }
}

export function getStrategy(mode: CompressionMode): CompressionStrategy {
  switch (mode) {
    case 'ai':
      return new AIStrategy()
    case 'print':
      return new PrintStrategy()
    case 'transfer':
      return new TransferStrategy()
    default:
      throw new Error(`Unknown compression mode: ${mode}`)
  }
}
