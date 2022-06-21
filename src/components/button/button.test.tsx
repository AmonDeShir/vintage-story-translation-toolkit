import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Button } from "./button";
import { theme } from "../../theme/theme";

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

describe(`Button`, () => {
  it(`should display button text`, () => {
    render(<Button text="Test" />, { wrapper });

    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  it(`should call onClick function if button is clicked`, () => {
    const fn = jest.fn();
    render(<Button text="Test" onClick={fn} />, { wrapper });

    fireEvent.click(screen.getByDisplayValue('Test'));

    expect(fn).toBeCalledTimes(1);
  }); 
});