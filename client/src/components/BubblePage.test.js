import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import useAuth from "../hooks/useAuth";

const token = "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";
const axiosAuth = useAuth("token", false);
axiosAuth.setT(token);

test("Fetches data and renders the bubbles", async () => {
  const { getByText } = render(<BubblePage />);
  await waitFor(async () => {
    const aqua = getByText(/aqua/i);
    expect(aqua);
  });
});
