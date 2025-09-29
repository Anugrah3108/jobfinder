"use client";
import { Theme } from "@radix-ui/themes";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeContext({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isDark, setIsDark] = useState<boolean>(true);
  return (
    <Context.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </Context.Provider>
  );
}
