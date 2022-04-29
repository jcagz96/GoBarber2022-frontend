import React, { createContext, useCallback, useState, useContext } from 'react';

interface ThemeContextData {
  theme: string;
  switchTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    const storageTheme = localStorage.getItem('@GoBarber:theme');

    console.log(`storage theme: ${storageTheme}`);

    if (storageTheme) {
      return storageTheme;
    }
    return 'light';
  });

  const switchTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    console.log(`dps do setTheme: ${theme}`);

    const themeToStore = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('@GoBarber:theme', themeToStore);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }
  return context;
}
