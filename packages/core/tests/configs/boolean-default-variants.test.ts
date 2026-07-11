import { describe, expect, test } from "vitest";
import { setupCompose } from "../../src/tailwind-buddy";

const booleanVariants = setupCompose(["md"] as const)({
  slots: { root: "base" },
  variants: {
    disabled: {
      true: "opacity-50",
      false: "opacity-100",
    },
  },
  defaultVariants: { disabled: false },
})();

// The defaultVariants contract exposes true/false keys as booleans. Use the
// same runtime values here to cover scalar overrides, responsive overrides,
// and the cache key shared by scalar calls.
const rootWithBooleanValues = booleanVariants.root as unknown as (props?: {
  disabled?: boolean | { initial: boolean; md?: boolean };
}) => string;

describe("boolean variant values", () => {
  test("applies a boolean default variant", () => {
    expect(booleanVariants.root()).toBe("base opacity-100");
  });

  test("keeps true and false scalar values distinct in the cache", () => {
    expect(rootWithBooleanValues({ disabled: true })).toBe("base opacity-50");
    expect(rootWithBooleanValues({ disabled: false })).toBe("base opacity-100");
  });

  test("applies boolean responsive values", () => {
    expect(
      rootWithBooleanValues({ disabled: { initial: false, md: true } })
    ).toBe("base opacity-100 md:opacity-50");
  });
});
