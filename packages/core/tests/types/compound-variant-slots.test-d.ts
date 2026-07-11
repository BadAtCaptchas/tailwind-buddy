/**
 * Compound variant slot maps must use keys declared by `slots`. Otherwise the
 * runtime ignores the class while flattening the compound variant.
 */
import { setupCompose } from "../../src/tailwind-buddy";

const compose = setupCompose([] as const);

compose({
  slots: {
    root: "base-root",
    label: "base-label",
  },
  variants: {
    tone: {
      primary: "tone-primary",
    },
  },
  compoundVariants: [
    {
      conditions: { tone: "primary" },
      class: { root: "valid-v2-class" },
    },
    {
      conditions: { tone: "primary" },
      classes: { label: ["valid-v3-class"] },
    },
    {
      conditions: { tone: "primary" },
      // @ts-expect-error Compound class maps only accept declared slot names.
      class: { rooot: "silently-dropped-at-runtime" },
    },
    {
      conditions: { tone: "primary" },
      // @ts-expect-error The v3 alias has the same slot-aware constraint.
      classes: { lable: "silently-dropped-at-runtime" },
    },
  ],
  defaultVariants: { tone: "primary" },
});
