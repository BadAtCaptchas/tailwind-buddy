import { expectTypeOf } from "vitest";
import { compose, generateSafeList } from "../../src/main";
import type { SafeListSource } from "../../src/main";

const screens = ["sm", "2xl"] as const;
const component = compose<{
  slots: ["root"];
  variants: { size: ["small", "large"] };
  props: {};
  screens: typeof screens;
}>({
  slots: { root: "block" },
  variants: {
    size: {
      small: "p-2",
      large: "p-4",
    },
  },
  compoundVariants: [
    { conditions: { size: "small" }, class: "text-sm" },
    { conditions: { size: "large" }, classes: "text-lg" },
  ],
  defaultVariants: { size: "small" },
  responsiveVariants: ["size"],
});

expectTypeOf(component).toMatchTypeOf<SafeListSource>();
expectTypeOf(generateSafeList([component] as const, screens)).toEqualTypeOf<
  string[]
>();
