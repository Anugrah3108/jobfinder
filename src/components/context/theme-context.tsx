//@ts-nocheck
"use client";
import { Theme } from "@radix-ui/themes";
import { createContext, useState } from "react";

export const Context = createContext();

export default function ThemeContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(true);
  return (
    <Context.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </Context.Provider>
  );
}
