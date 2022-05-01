import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;

      primaryText: string;
      secondaryText: string;
      text: string;
      accent: string;
      divider: string;
    };
  }
}
