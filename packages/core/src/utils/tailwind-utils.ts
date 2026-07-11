import { generateResponsiveVariants } from "./generate-responsive-variants";
import { cleanString } from "./strings";

const DEFAULT_SCREENS = ["sm", "md", "lg", "xl", "2xl"] as const;

type SafeListCompoundVariant = {
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly class?: unknown;
  readonly classes?: unknown;
};

type SafeListOptions = {
  readonly variants?: Readonly<
    Record<string, Readonly<Record<string, unknown>>>
  >;
  readonly compoundVariants?: readonly SafeListCompoundVariant[];
  readonly responsiveVariants?: readonly string[];
};

/** A composed component shape accepted by {@link generateSafeList}. */
export type SafeListSource = {
  readonly options: SafeListOptions;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const addClassTokens = (value: unknown, safelistClasses: Set<string>): void => {
  if (typeof value === "string") {
    cleanString(value)
      .split(" ")
      .filter(Boolean)
      .forEach((className) => safelistClasses.add(className));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((classValue) => addClassTokens(classValue, safelistClasses));
    return;
  }

  if (isRecord(value)) {
    Object.values(value).forEach((classValue) =>
      addClassTokens(classValue, safelistClasses)
    );
  }
};

/**
 * Generates responsive Tailwind safelist entries without modifying the
 * composed component definitions passed by the caller.
 */
export const generateSafeList = (
  sources: readonly SafeListSource[],
  screens: readonly string[] = DEFAULT_SCREENS
): string[] => {
  const safelistClasses = new Set<string>();

  for (const { options } of sources) {
    for (const variantName of options.responsiveVariants ?? []) {
      addClassTokens(options.variants?.[variantName], safelistClasses);

      for (const compound of options.compoundVariants ?? []) {
        if (compound.conditions[variantName] === undefined) continue;

        addClassTokens(
          compound.classes !== undefined ? compound.classes : compound.class,
          safelistClasses
        );
      }
    }
  }

  return generateResponsiveVariants(Array.from(safelistClasses), screens);
};
