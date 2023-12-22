import React, { createContext, useState, useContext, useMemo } from "react";

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [color, setColor] = useState("#511c47");

  const value = useMemo(() => ({ color, setColor }), [color, setColor]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export const useColor = () => {
  return useContext(ColorContext);
};
