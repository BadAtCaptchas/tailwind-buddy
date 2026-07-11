import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Label } from "../src/components/Label/Label";

describe("Label", () => {
  it("forwards disabled to a native element", () => {
    const markup = renderToStaticMarkup(
      <Label as="button" disabled>
        Label
      </Label>,
    );

    expect(markup).toContain("disabled");
  });

  it("forwards disabled to a custom component", () => {
    let receivedDisabled: boolean | undefined;
    const CustomComponent = ({ disabled }: { disabled?: boolean }) => {
      receivedDisabled = disabled;
      return <span />;
    };

    renderToStaticMarkup(<Label as={CustomComponent} disabled />);

    expect(receivedDisabled).toBe(true);
  });
});
