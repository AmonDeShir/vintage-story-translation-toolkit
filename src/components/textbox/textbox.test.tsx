import { render, screen } from "@testing-library/react";
import { MultilineTextbox, Textbox } from "./textbox";
import { theme } from "../../theme/theme";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@emotion/react";

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);


describe(`Textbox`, () => {
  it(`should render an input component`, () => {
    render(<Textbox placeholder="Test" />, { wrapper });

    const textbox = screen.getByPlaceholderText("Test");
    expect(textbox.tagName).toEqual('INPUT');
  });
})

describe(`MultilineTextbox`, () => {
  it(`should render an textarea component`, () => {
    render(<MultilineTextbox placeholder="Test" />, { wrapper });

    const textbox = screen.getByPlaceholderText("Test");
    expect(textbox.tagName).toEqual('TEXTAREA');
  });
});