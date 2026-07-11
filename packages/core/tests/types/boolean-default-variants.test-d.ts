/**
 * Boolean variant keys are stringified by JavaScript, but their public values
 * remain booleans when used in defaultVariants.
 */
import { setupCompose } from "../../src/tailwind-buddy";

const compose = setupCompose([] as const);

compose({
  slots: { root: "base" },
  variants: {
    disabled: {
      true: "opacity-50",
      false: "opacity-100",
    },
  },
  defaultVariants: { disabled: false },
});

compose({
  slots: { root: "base" },
  variants: {
    disabled: {
      true: "opacity-50",
      false: "opacity-100",
    },
  },
  // @ts-expect-error Boolean variants accept booleans, not stringified keys.
  defaultVariants: { disabled: "false" },
});
