import { describe, expect, it } from "vitest";
import { escapeChar } from "./index";

describe("regex string special character replacement", () => {
    it("should escape special characters", () => {
        expect(escapeChar("$")).toBe("\\$");
        expect(escapeChar(".")).toBe("\\.");
        expect(escapeChar("+")).toBe("\\+");
        expect(escapeChar("?")).toBe("\\?");
        expect(escapeChar("^")).toBe("\\^");
        expect(escapeChar("$")).toBe("\\$");
        expect(escapeChar("{")).toBe("\\{");
        expect(escapeChar("}")).toBe("\\}");
        expect(escapeChar("[")).toBe("\\[");
        expect(escapeChar("]")).toBe("\\]");
        expect(escapeChar("\\")).toBe("\\\\");
        expect(escapeChar("*")).toBe("\\*");
        expect(escapeChar("(")).toBe("\\(");
        expect(escapeChar(")")).toBe("\\)");
        expect(escapeChar("|")).toBe("\\|");
    });

    it("should create regex for multiple keys", () => {
        expect(escapeChar("$$")).toBe("\\$\\$");
        expect(escapeChar("$$_")).toBe("\\$\\$_");
        expect(escapeChar("$$_$")).toBe("\\$\\$_\\$");
        expect(escapeChar("|?")).toBe("\\|\\?");
        expect(escapeChar("$.+?^${}()|[]\\")).toBe(
            "\\$\\.\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\",
        );
    });

    it("should not escape the non-special characters", () => {
        expect(escapeChar("a")).toBe("a");
        expect(escapeChar("//_")).toBe("//_");
        expect(escapeChar("~_")).toBe("~_");
    });
});
