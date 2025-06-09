export function parseFirestoreTimestamps<T extends Record<string, any>>(
  data: T
): T {
  const result: any = { ...data };

  for (const key of Object.keys(result)) {
    const value = result[key];

    if (
      value &&
      typeof value === "object" &&
      typeof value.toDate === "function"
    ) {
      result[key] = value.toDate().toISOString();
    }
  }

  return result;
}
