import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
    },
  
    font: {
      big: string;
      normal: string;
      small: string;
    }
  }
}