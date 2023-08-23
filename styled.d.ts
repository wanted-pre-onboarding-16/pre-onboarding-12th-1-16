import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      deepWhite: string;
      red: string;
      lightRed: string;
    };
  }
}
