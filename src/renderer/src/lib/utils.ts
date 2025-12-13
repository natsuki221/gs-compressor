import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 截斷檔案名稱，保留前後字元並在中間加上省略符號
 * @param filename - 原始檔案名稱
 * @param maxLength - 最大長度（預設 18）
 * @param frontChars - 前綴保留字元數（預設 10）
 * @param backChars - 後綴保留字元數（預設 8）
 * @returns 截斷後的檔案名稱
 */
export function truncateFilename(
  filename: string,
  maxLength = 14,
  frontChars = 10,
  backChars = 4
): string {
  if (filename.length <= maxLength) return filename
  return `${filename.slice(0, frontChars)}...${filename.slice(-backChars)}`
}
