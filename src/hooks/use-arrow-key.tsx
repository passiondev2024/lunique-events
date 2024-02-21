import { useEffect, useState } from "react";

interface UseArrowKeyProps {
  onArrowRight: () => void;
  onArrowLeft: () => void;
}

export const useArrowKey = ({
  onArrowLeft,
  onArrowRight,
}: UseArrowKeyProps) => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    if (!onArrowLeft || !onArrowRight) return;

    const handleArrowKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "ArrowLeft") onArrowLeft();
      if (key === "ArrowRight") onArrowRight();
    };

    setState(true);

    window.addEventListener("keydown", handleArrowKeyDown);

    return () => window.removeEventListener("keydown", handleArrowKeyDown);
  }, [onArrowLeft, onArrowRight]);

  return state;
};
