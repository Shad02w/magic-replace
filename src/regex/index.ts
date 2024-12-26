const escapeCharRegex = /[.*+?^${}()|[\]\\]/g;

export function escapeChar(str: string) {
    return str.replace(escapeCharRegex, "\\$&");
}

export function createMatchingRegex(
    [prefix, suffix]: [string, string],
    mapper: Record<string, string>,
) {
    assertPattern([prefix, suffix]);
    const keys = Object.keys(mapper).map((key) => escapeChar(key));

    const union = `${escapeChar(prefix)}(${keys.join("|")})${escapeChar(suffix)}`;
    return new RegExp(union, "g");
}

export function createExtractRegex([prefix, suffix]: [string, string]) {
    assertPattern([prefix, suffix]);
    const escapedPrefix = escapeChar(prefix);
    const escapedSuffix = escapeChar(suffix);
    return new RegExp(
        `${escapedPrefix}((?:(?!${escapedPrefix}|${escapedSuffix}).)+)${escapedSuffix}`,
        "g",
    );
}

function assertPattern([prefix, suffix]: [string, string]) {
    if (prefix.length === 0 && suffix.length === 0) {
        throw new TypeError("prefix and suffix cannot be empty string");
    }

    if (prefix.length === 0) {
        throw new TypeError("prefix cannot be empty string");
    }

    if (suffix.length === 0) {
        throw new TypeError("suffix cannot be empty string");
    }
}
