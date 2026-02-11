import { createContext, useContext, useState, ReactNode } from "react";

interface PartnershipModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: (open: boolean) => void;
}

const PartnershipModalContext = createContext<PartnershipModalContextType | undefined>(undefined);

export const PartnershipModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PartnershipModalContext.Provider value={{ isOpen, openModal, closeModal, setIsOpen }}>
      {children}
    </PartnershipModalContext.Provider>
  );
};

export const usePartnershipModal = () => {
  const context = useContext(PartnershipModalContext);
  if (context === undefined) {
    throw new Error("usePartnershipModal must be used within a PartnershipModalProvider");
  }
  return context;
};
