import { clsx, type ClassValue } from 'clsx'

/** Tiny className combiner (keeps class strings readable). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
