'use client';

import * as React from 'react';
import { ModalContext } from '@root/system/providers/ModalContextProvider';
import { ThemeContext, useTheme } from '@root/components/ThemeContext';

interface ModalContent {
  data?: any;
  name?: string;
  message?: string;
  parentId?: string;
}

interface ModalContextType {
  modalContent: ModalContent | null;
  showModal: (nextContent: ModalContent | null) => void;
}

export default function Providers({ children }) {
  const [modalContent, setContent] = React.useState<ModalContent | null>(null);
  const { theme, updateTheme } = useTheme();

  const showModal = (nextContent) => {
    if (nextContent && modalContent && nextContent.name === modalContent.name) {
      setContent(null);
      return;
    }

    setContent(nextContent);
  };

  const modalContextValue: ModalContextType = {
    modalContent,
    showModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>
    </ModalContext.Provider>
  );
}
