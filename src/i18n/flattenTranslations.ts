/**
 * Shared with LanguageContext and server-side translators.
 * Flattens nested objects to dot keys: { a: { b: "x" } } -> { "a.b": "x" }
 */
export type TranslationValue = string | { [key: string]: TranslationValue };

export function flattenTranslations(
  node: TranslationValue | undefined,
  prefix = ""
): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof node === "string") {
    out[prefix] = node;
    return out;
  }
  if (!node || typeof node !== "object") return out;

  for (const key of Object.keys(node)) {
    const val = node[key];
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "string") {
      out[nextKey] = val;
    } else {
      Object.assign(out, flattenTranslations(val, nextKey));
    }
  }
  return out;
}
