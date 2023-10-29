"use client";

import { Button, type ButtonProps } from "../ui/button";
import {
  type ModalData,
  type ModalType,
  useModal,
} from "@/hooks/use-modal-store";

interface OpenModalButtonProps extends ButtonProps {
  modalType: ModalType;
  modalData?: ModalData;
}

export const OpenModalButton = ({
  children,
  modalType,
  modalData,
  ...props
}: OpenModalButtonProps) => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen(modalType, modalData)} {...props}>
      {children}
    </Button>
  );
};
