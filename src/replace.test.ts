import { describe, expect, it } from "vitest";
import { replace } from "./index";

describe("magic replace unit tests", () => {
    it("should replace matched pattern", () => {
        expect(
            replace(
                ["{", "}"],
                { a: "123", b: "456" },
                "This is a {a} and {b}",
            ),
        ).toBe("This is a 123 and 456");

        expect(replace(["?", ":"], { aba: "123" }, "This is a ?aba:")).toBe(
            "This is a 123",
        );
    });

    it("should replace multiple matched pattern", () => {
        expect(
            replace(
                ["{", "}"],
                { a: "123", b: "456" },
                "This is a {a} and {b} and {a}",
            ),
        ).toBe("This is a 123 and 456 and 123");
    });

    it("should allow escapable characters in the mapper keys", () => {
        expect(replace(["?", ":"], { "?:": "123" }, "This is a ??::")).toBe(
            "This is a 123",
        );

        expect(
            replace(["?", ":"], { "?:": "123", "?a": "456" }, "This is a ??::"),
        ).toBe("This is a 123");

        expect(replace(["*", "*"], { "***": "123" }, "This is a *****")).toBe(
            "This is a 123",
        );
    });

    it.skip("should not replace unmatched pattern", () => {
        expect(
            replace(["~", "~"], { a: "123", b: "456" }, "This is a ~a"),
        ).toBe("This is a ~a");

        expect(
            replace(["?", ":"], { a: "123", b: "456" }, "This is a :a"),
        ).toBe("This is a :a");
    });
});
