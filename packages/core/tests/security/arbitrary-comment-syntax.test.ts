import { describe, expect, it } from "vitest";
import { setupCompose } from "../../src/tailwind-buddy";
import { generateSafeList } from "../../src/utils/tailwind-utils";
import { cleanString } from "../../src/utils/strings";

const urlClass = "bg-[url(https://cdn.example/a.svg)]";
const lineCommentClass = "before:content-['//']";
const blockCommentClass = "after:content-['/*keep*/']";

describe("Tailwind arbitrary values containing comment syntax", () => {
  it("only normalizes whitespace in class strings", () => {
    expect(
      cleanString(
        `\n  ${urlClass}   ${lineCommentClass}\n  ${blockCommentClass}  `
      )
    ).toBe(`${urlClass} ${lineCommentClass} ${blockCommentClass}`);
  });

  it("preserves arbitrary values in runtime and definition output", () => {
    const component = setupCompose(["sm"] as const)({
      slots: {
        root: `${urlClass} hidden`,
      },
      variants: {
        state: {
          active: `${lineCommentClass} pointer-events-none ${blockCommentClass}`,
        },
      },
      defaultVariants: {
        state: "active",
      },
      responsiveVariants: ["state"],
    })();

    expect(component.root()).toBe(
      `${urlClass} hidden ${lineCommentClass} pointer-events-none ${blockCommentClass}`
    );
    expect(component.definition().slots.root).toBe(`${urlClass} hidden`);
    expect(component.definition().variants!.state.active).toBe(
      `${lineCommentClass} pointer-events-none ${blockCommentClass}`
    );
  });

  it("preserves arbitrary values in generated safelists", () => {
    const component = setupCompose(["sm"] as const)({
      slots: { root: "block" },
      variants: {
        state: {
          active: `${urlClass} ${lineCommentClass} ${blockCommentClass}`,
        },
      },
      defaultVariants: { state: "active" },
      responsiveVariants: ["state"],
    })();

    expect(generateSafeList([component], ["sm"])).toEqual([
      `sm:${urlClass}`,
      `sm:${lineCommentClass}`,
      `sm:${blockCommentClass}`,
    ]);
  });
});
