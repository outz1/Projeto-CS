// Sem 0/O/1/I para evitar confusão visual
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateId(length = 6): string {
  return Array.from(
    { length },
    () => CHARS[Math.floor(Math.random() * CHARS.length)]
  ).join('')
}