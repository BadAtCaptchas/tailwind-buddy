import { compose, setupCompose } from "../../src/main";
import type { VariantProps, VariantsProps } from "../../src/main";

const screens = ["sm", "md", "lg", "xl", "2xl"] as const;

type ButtonDefinition = {
  slots: ["root", "label"];
  variants: {
    tone: ["primary", "secondary"];
    size: ["small", "large"];
  };
  props: { disabled?: boolean };
  screens: typeof screens;
};

const button = compose<ButtonDefinition>({
  slots: { root: "inline-flex", label: "font-medium" },
  variants: {
    tone: { primary: "bg-blue-600", secondary: "bg-gray-100" },
    size: { small: "h-8", large: "h-11" },
  },
  compoundVariants: [{ conditions: { disabled: true }, classes: "opacity-50" }],
  defaultVariants: { tone: "primary", size: "small" },
  responsiveVariants: ["size"],
});

type ButtonProps = VariantProps<
  ButtonDefinition["variants"],
  ButtonDefinition["screens"]
> &
  ButtonDefinition["props"];

const props: ButtonProps = {
  disabled: true,
  size: { initial: "small", md: "large" },
};
button.slots.root(props);

const legacyButton = setupCompose(screens)({
  slots: { root: "inline-flex" },
  variants: { tone: { primary: "bg-blue-600" } },
  defaultVariants: { tone: "primary" },
})<{ disabled?: boolean }>();

const legacyProps: VariantsProps<typeof legacyButton> = {
  disabled: true,
  tone: "primary",
};
legacyButton.root(legacyProps);
