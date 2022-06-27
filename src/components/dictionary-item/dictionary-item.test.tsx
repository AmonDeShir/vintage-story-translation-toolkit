import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, screen } from "@testing-library/react"
import { PropsWithChildren } from "react";
import { theme } from "../../theme/theme";
import { DictionaryHeader, DictionaryItem } from "./dictionary-item"

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);


describe(`DictionaryItem`, () => {
  it(`should render source and translation`, () => {
    render(<DictionaryItem source="Test 1" translation="Test 2" />);

    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("- Test 2")).toBeInTheDocument();
  })

  it(`should display only 25 characters of texts`, () => {
    let testA = "Test 1";
    let testB = "Test 2"
    
    for (let i = 0; i < 20; i++) {
      testA = `A${testA}`;
      testB = `B${testB}`;
    }

    render(<DictionaryItem source={testA} translation={testB} />);

    expect(screen.getByText("AAAAAAAAAAAAAAAAAAAATest ...")).toBeInTheDocument();
    expect(screen.getByText("- BBBBBBBBBBBBBBBBBBBBTest ...")).toBeInTheDocument();
  })

  it(`should show and hide full version when is double clicked`, async () => {
    let testA = "Test 1";
    let testB = "Test 2"
    
    for (let i = 0; i < 20; i++) {
      testA = `A${testA}`;
      testB = `B${testB}`;
    }

    render(<DictionaryItem source={testA} translation={testB} />);

    fireEvent.doubleClick(await screen.findByText(`AAAAAAAAAAAAAAAAAAAATest ...`));

    expect(screen.getByText("AAAAAAAAAAAAAAAAAAAATest 1")).toBeInTheDocument();
    expect(screen.getByText("- BBBBBBBBBBBBBBBBBBBBTest 2")).toBeInTheDocument();

    fireEvent.doubleClick(await screen.findByText(`- BBBBBBBBBBBBBBBBBBBBTest 2`));

    expect(screen.getByText("AAAAAAAAAAAAAAAAAAAATest ...")).toBeInTheDocument();
    expect(screen.getByText("- BBBBBBBBBBBBBBBBBBBBTest ...")).toBeInTheDocument();
  });

  it(`should call the onClick handler when is clicked and the long mod is disabled`, async () => {
    const onClick = jest.fn();
    render(<DictionaryItem source={"item A"} translation={"Item B"} onClick={onClick} />);

    fireEvent.click(await screen.findByText(`item A`));

    expect(onClick).toBeCalledTimes(1);
  });

  it(`should call the onClick handler when is clicked and the long mod is enabled`, async () => {
    const onClick = jest.fn();

    let testA = "Test 1";
    let testB = "Test 2"
    
    for (let i = 0; i < 20; i++) {
      testA = `A${testA}`;
      testB = `B${testB}`;
    }

    render(<DictionaryItem source={testA} translation={testB} onClick={onClick} />);

    fireEvent.click(await screen.findByText(`AAAAAAAAAAAAAAAAAAAATest ...`));

    expect(onClick).toBeCalledTimes(1);
  });
});


describe(`DictionaryHeader`, () => {
  it(`should display title`, () => {
    render(<DictionaryHeader name="Header" />, { wrapper });

    expect(screen.getByText('Header')).toBeInTheDocument();
  })

  it(`should display children`, () => {
    render(<DictionaryHeader name="Header">Test</DictionaryHeader>, { wrapper });

    expect(screen.getByText('Test')).toBeInTheDocument();
  })

  it(`should hide and show children when is clicked`, async () => {
    render(<DictionaryHeader name="Header">Test</DictionaryHeader>, { wrapper });

    fireEvent.click(await screen.findByText(`Header`));

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();

    fireEvent.click(await screen.findByText(`Header`));
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  })

  it(`should enter into edit mode when is double clicked`, async () => {
    render(<DictionaryHeader name="Header">Test</DictionaryHeader>, { wrapper });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    fireEvent.dblClick(await screen.findByText(`Header`));

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();

    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  })

  it(`should exit edit mode when Done button is clicked`, async () => {
    render(<DictionaryHeader name="Header">Test</DictionaryHeader>, { wrapper });

    expect(screen.getByText('Test')).toBeInTheDocument();

    fireEvent.dblClick(await screen.findByText(`Header`));

    expect(screen.queryByText('Test')).not.toBeInTheDocument();

    fireEvent.click(await screen.findByText(`Done`));

    expect(screen.getByText('Test')).toBeInTheDocument();
  })

  it(`should exit edit mode when Remove button is clicked`, async () => {
    render(<DictionaryHeader name="Header">Test</DictionaryHeader>, { wrapper });

    expect(screen.getByText('Test')).toBeInTheDocument();

    fireEvent.dblClick(await screen.findByText(`Header`));

    expect(screen.queryByText('Test')).not.toBeInTheDocument();

    fireEvent.click(await screen.findByText(`Remove`));

    expect(screen.getByText('Test')).toBeInTheDocument();
  })

  it(`should call the onRemove handler if the Remove button is clicked`, async () => {
    const onRemove = jest.fn();
    render(<DictionaryHeader name="Header" onRemove={onRemove}>Test</DictionaryHeader>, { wrapper });

    fireEvent.dblClick(await screen.findByText(`Header`));
    fireEvent.click(await screen.findByText(`Remove`));

    expect(onRemove).toBeCalledTimes(1);
  })

  it(`should call the onRenamed handler if the textbox is changed Done button is clicked`, async () => {
    const onRenamed = jest.fn();
    render(<DictionaryHeader name="Header" onRenamed={onRenamed}>Test</DictionaryHeader>, { wrapper });

    fireEvent.dblClick(await screen.findByText(`Header`));

    fireEvent.select(await screen.findByRole(`textbox`));
    fireEvent.change(await screen.findByRole(`textbox`), { target: { value: "New value" }});

    fireEvent.click(await screen.findByText(`Done`));

    expect(onRenamed).toBeCalledTimes(1);
    expect(onRenamed).toBeCalledWith("New value");
  });
});