import { createContext, useEffect, useState, ReactNode } from "react";

type SystemTheme = "dark" | "light";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProviderContext = createContext<{ systemTheme: SystemTheme }>({
  systemTheme: "light",
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(systemTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [systemTheme]);

  return (
    <ThemeProviderContext.Provider value={{ systemTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
