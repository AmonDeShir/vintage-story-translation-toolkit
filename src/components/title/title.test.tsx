import { ThemeProvider } from "@emotion/react";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { theme } from "../../theme/theme";
import { Title } from "./title";

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);


describe('Title', () => {
  it(`should render a h1 element`, () => {
    render(<Title>Test</Title>, { wrapper });
    
    expect(screen.getByText("Test")).toBeInTheDocument();
  })
})