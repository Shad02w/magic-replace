const escapeCharRegex = /[.*+?^${}()|[\]\\]/g;

export function escapeChar(str: string) {
    return str.replace(escapeCharRegex, "\\$&");
}

export function createMatchingRegex(
    [prefix, suffix]: [string, string],
    mapper: Record<string, string>,
) {
    const keys = Object.keys(mapper).map((key) => escapeChar(key));

    const union = `${escapeChar(prefix)}(${keys.join("|")})${escapeChar(suffix)}`;
    return new RegExp(union, "g");
}

export function createExtractRegex([prefix, suffix]: [string, string]) {
    const escapedPrefix = escapeChar(prefix);
    const escapedSuffix = escapeChar(suffix);
    return new RegExp(
        `${escapedPrefix}((?:(?!${escapedPrefix}|${escapedSuffix}).)+)${escapedSuffix}`,
        "g",
    );
}
