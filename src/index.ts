import { createExtractRegex, createMatchingRegex } from "./regex";
import type { Mapper } from "./type";

/**
 * Replace the patterns in the content with the key-value pairs in the mapper
 *
 * @param patterns - a tuple of prefix and suffix: [prefix, suffix], prefix and suffix cannot be empty string
 * @param mapper - The mapper object
 * @param content - The content to be replaced
 * @returns The replaced content
 *
 * @example
 * Here is an example of replacing the content with given patterns
 * ```ts
 * replace(["{", "}"], { a: "123", b: "456" }, "This is a {a}, {b} and {a}");
 * ```
 * // return "This is a 123, 456 and 123"
 */
export function replace(
    [prefix, suffix]: [string, string],
    mapper: Mapper,
    content: string,
): string {
    const superRegex = createMatchingRegex([prefix, suffix], mapper);
    return content.replace(superRegex, (_, p) => {
        if (typeof p !== "string") {
            throw new Error("Could not match the pattern group");
        }
        return mapper[p];
    });
}

/**
 * Extract the pattern keys from the content
 *
 * @param patterns - a tuple of prefix and suffix: [prefix, suffix], prefix and suffix cannot be empty string
 * @param content - The content to be replaced
 * @returns The extracted keys
 *
 * @example
 * Here is an example of extracting the keys from the content
 * ```ts
 * extractKeys(["{", "}"], "This is a {a} and {b} and {a}");
 * ```
 * // return ["a", "b"]
 */
export function extractKeys(
    [prefix, suffix]: [string, string],
    content: string,
): string[] {
    const superRegex = createExtractRegex([prefix, suffix]);
    const results = content.matchAll(superRegex);

    const keys = new Set<string>();
    for (const result of results) {
        const group = result[1];
        if (!group) continue;
        keys.add(group);
    }

    return Array.from(keys);
}
