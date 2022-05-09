import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;
      third: string;

      errorColor: string;

      primaryText: string;
      secondaryText: string;
      text: string;
      accent: string;
      divider: string;
    };
  }
}
