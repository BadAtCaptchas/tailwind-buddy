import { describe, expect, test } from "vitest";
import { generateSafeList } from "../../src/utils/tailwind-utils";
import { simpleResponsiveComponent } from "../setup/simple-responsive";
import { simpleCompoundComponent } from "../setup/simple-compound";
describe("safelist", () => {
  test("uses Tailwind's default 2xl breakpoint without the non-standard xxl alias", () => {
    const generated = generateSafeList([simpleResponsiveComponent]);

    expect(generated.some((className) => className.startsWith("2xl:"))).toBe(
      true
    );
    expect(generated.some((className) => className.startsWith("xxl:"))).toBe(
      false
    );
  });

  test("does not mutate composed component options", () => {
    const before = JSON.stringify(simpleCompoundComponent.options);

    generateSafeList([simpleCompoundComponent], ["sm", "md"] as const);

    expect(JSON.stringify(simpleCompoundComponent.options)).toBe(before);
  });

  test("without compounds", () => {
    const str = [
      "sm:text-xl",
      "md:text-xl",
      "sm:text-4xl",
      "md:text-4xl",
      "sm:text-5xl",
      "md:text-5xl",
      "sm:leading-tight",
      "md:leading-tight",
      "sm:bg-orange-500",
      "md:bg-orange-500",
    ];

    const generate_str = generateSafeList(
      [simpleResponsiveComponent],
      ["sm", "md"]
    );
    expect(generate_str).toStrictEqual(str);
  });

  test("with compounds", () => {
    const str = [
      "sm:text-red-200",
      "md:text-red-200",
      "sm:text-green-100",
      "md:text-green-100",
      "sm:text-purple-200",
      "md:text-purple-200",
    ];
    const generate_str = generateSafeList(
      [simpleCompoundComponent],
      ["sm", "md"]
    );
    expect(generate_str).toStrictEqual(str);
  });
});
