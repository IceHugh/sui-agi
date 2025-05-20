import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface InsertCopilotPortalProps {
  children: React.ReactNode;
  targetSelector: string;
  portalId: string;
}

export function InsertCopilotPortal({ children, targetSelector, portalId }: InsertCopilotPortalProps) {
  const [parent, setParent] = useState<HTMLElement | null>(null);
  const [inserted, setInserted] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const target = document.querySelector(targetSelector);
      if (target && target.parentElement && !inserted) {
        const parentElem = target.parentElement;
        if (!parentElem.querySelector(`#${portalId}`)) {
          const customDiv = document.createElement("div");
          customDiv.id = portalId;
          parentElem.insertBefore(customDiv, target);
          setParent(customDiv);
          setInserted(true);
        }
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [inserted, targetSelector, portalId]);
  if (!parent) return null;
  return ReactDOM.createPortal(children, parent, portalId);
}