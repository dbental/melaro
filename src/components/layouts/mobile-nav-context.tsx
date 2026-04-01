"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface MobileNavCtx {
  open: boolean;
  openNav: () => void;
  closeNav: () => void;
}

const MobileNavContext = createContext<MobileNavCtx>({
  open: false,
  openNav: () => {},
  closeNav: () => {},
});

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openNav  = useCallback(() => setOpen(true),  []);
  const closeNav = useCallback(() => setOpen(false), []);
  return (
    <MobileNavContext.Provider value={{ open, openNav, closeNav }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  return useContext(MobileNavContext);
}
