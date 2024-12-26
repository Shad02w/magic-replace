import { createRegex } from "./regex";
import type { Mapper } from "./type";

/**
 * Replace the patterns in the content with the key-value pairs in the mapper
 *
 * @param patterns - a tuple of prefix and suffix: [prefix, suffix]
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
    const superRegex = createRegex([prefix, suffix], mapper);
    return content.replace(superRegex, (_, p) => {
        if (typeof p !== "string") {
            throw new Error("Could not match the pattern group");
        }
        return mapper[p];
    });
}
