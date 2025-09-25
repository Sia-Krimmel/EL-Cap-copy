'use client';

import { THEME_TYPES } from '@root/common/types';
import { createContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  updateTheme: (newTheme: THEME_TYPES) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const getThemeColor = (theme: THEME_TYPES) => {
  switch (theme) {
    case THEME_TYPES.THEME_BEIGE:
      return {
        background: 'var(--color-beige)',
        text: 'var(--color-brown-dark)',
      };
    case THEME_TYPES.THEME_PINK:
      return {
        background: 'var(--color-pink-dark)',
        text: 'var(--color-pink-light)',
      };

    case THEME_TYPES.THEME_GREEN:
      return {
        background: 'var(--color-green-dark)',
        text: 'var(--color-green-light)',
      };
    case THEME_TYPES.THEME_BLACK:
      return {
        background: 'var(--color-black)',
        text: 'var(--color-white)',
      };
    case THEME_TYPES.THEME_BLUE:
      return {
        background: 'var( --color-blue-light)',
        text: 'var(--color-text)',
      };
    case THEME_TYPES.THEME_BROWN:
      return {
        background: 'var(--color-brown100)',
        text: ' var(--color-brown-dark)',
      };
    default:
      return {
        background: 'var(--color-beige)',
        text: 'var(--color-brown-dark)',
      };
  }
};

export const THEME_PATH_MAP = {
  'reading-list': THEME_TYPES.THEME_GREEN,
  about: THEME_TYPES.THEME_BLUE,
  blog: THEME_TYPES.THEME_PINK,
  contributors: THEME_TYPES.THEME_BROWN,
  portfolio: THEME_TYPES.THEME_BLACK,
  '/': THEME_TYPES.THEME_BEIGE,
};

export type ThemeType = keyof typeof THEME_TYPES;

export function useTheme(initialTheme?: any, newTheme?: any) {
  const [theme, setTheme] = useState<ThemeType>(initialTheme || newTheme);

  useEffect(() => {
    const setThemeClass = (theme) => {
      document.body.classList.remove(...Object.values(THEME_TYPES));
      document.body.classList.add(theme);
      document.body.style.transition = 'background-color 600ms ease-out, color 600ms ease-out';
    };

    if (theme) {
      setThemeClass(theme);
    }

    if (newTheme && newTheme !== theme) {
      setThemeClass(newTheme);
      setTheme(newTheme);
    }
  }, [theme, newTheme]);

  const updateTheme = (newTheme) => {
    if (newTheme === theme) return;
    setTheme(newTheme);
    document.body.classList.remove(...Object.values(THEME_TYPES));
    document.body.classList.add(newTheme);
    document.body.style.transition = 'background-color 600ms ease-out, color 600ms ease-out';
  };

  return { theme, updateTheme };
}
