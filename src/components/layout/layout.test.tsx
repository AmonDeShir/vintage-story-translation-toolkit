import { render, screen } from "@testing-library/react"
import { Buttons, Items } from "./layout"

describe(`Layout`, () => {
  describe(`Buttons`, () => {
    it(`should display children`, () => {
      render(
        <Buttons>
          <div>Button 1</div>
          <div>Button 2</div>
        </Buttons>
      );

      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
    })
  });

  describe(`Items`, () => {
    it(`should display children`, () => {
      render(
        <Items>
          Text
        </Items>
      );

      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it(`should subtract element height`, () => {
      render(
        <Items subtractHeight="50px">
          Text
        </Items>
      );

      expect(screen.getByText('Text')).toHaveStyle(`height: calc(100% - var(--subtractHeight));`);
      expect(getComputedStyle(screen.getByText('Text')).getPropertyValue('--subtractHeight')).toEqual("50px");
    });
  });
})