import React from "react";
import { render, wait } from "@testing-library/react";
import BubblePage from "./BubblePage";

const token = "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";
test("Fetches data and renders the bubbles", async () => {
  const { getByText } = render(<BubblePage token={token} />);
  await wait(() => {
    const aqua = getByText(/aquamarine/i);
    expect(aqua.textContent).toBe("x aquamarine");
  }, 2000);
});
