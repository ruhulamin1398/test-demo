export function applyUpdates<T extends object>(
  target: T,
  updates: Partial<T>,
  allowedFields: (keyof T)[]
): void {
  for (const key of allowedFields) {
    const value = updates[key];
    if (value !== undefined) {
      target[key] = value as T[typeof key];
    }
  }
}
