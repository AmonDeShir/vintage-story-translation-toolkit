import { ThemeProvider } from "@emotion/react";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { theme } from "../../theme/theme";
import { Container } from "./container";

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

describe(`Container`, () => {
  it(`should display children`, () => {
    render(<Container>Test</Container>, { wrapper });

    expect(screen.getByText("Test")).toBeInTheDocument();
  })

  it(`should display shadow on the left side of the component`, () => {
    render(<Container side="left">Test</Container>, { wrapper });

    expect(screen.getByText("Test")).toHaveStyle(`box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.5);`);
  })

  it(`should display shadow on the right side of the component`, () => {
    render(<Container side="right">Test</Container>, { wrapper });

    expect(screen.getByText("Test")).toHaveStyle(`box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.5);`);
  })

  it(`should display shadows on both sides of the element`, () => {
    render(<Container side="center">Test</Container>, { wrapper });

    expect(screen.getByText("Test")).toHaveStyle(`box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);`);
  })
})