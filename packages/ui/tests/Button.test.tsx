import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "../src/components/Button/Button";

describe("Button", () => {
  it("renders start and end icons around the label", () => {
    const markup = renderToStaticMarkup(
      <Button
        iconStart={<span>start icon</span>}
        iconEnd={<span>end icon</span>}
      >
        label
      </Button>
    );

    expect(markup.indexOf("start icon")).toBeLessThan(markup.indexOf("label"));
    expect(markup.indexOf("label")).toBeLessThan(markup.indexOf("end icon"));
  });
});
