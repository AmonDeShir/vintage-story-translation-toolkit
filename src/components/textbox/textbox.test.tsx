import { render, screen } from "@testing-library/react";
import { Textbox } from "./textbox";
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

  it(`should render a multiline input`, () => {
    render(<Textbox multiline placeholder="Test" />, { wrapper });

    expect(screen.getByPlaceholderText("Test")).toHaveStyle(`height: 100%;`);
  });

  it(`should render a single-line input`, () => {
    render(<Textbox placeholder="Test" />, { wrapper });

    expect(screen.getByPlaceholderText("Test")).toHaveStyle(`height: 40px;`);
  });
})