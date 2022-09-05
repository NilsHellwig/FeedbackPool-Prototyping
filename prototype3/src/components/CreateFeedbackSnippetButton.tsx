import { Article } from "phosphor-react";
import { Dispatch, forwardRef, SetStateAction } from "react";
import { IFeedbackExtract } from "../types";

interface CreateFeedbackSnippetButtonProps {
  position: { x: number; y: number };
  setIsCreateSnippetButtonVisible: Dispatch<SetStateAction<boolean>>;
  selectedText: string;
  setFeedbackExtracts: Dispatch<SetStateAction<IFeedbackExtract[]>>;
}

export const CreateFeedbackSnippetButton = forwardRef<
  HTMLButtonElement,
  CreateFeedbackSnippetButtonProps
>(
  (
    {
      position,
      setIsCreateSnippetButtonVisible,
      selectedText,
      setFeedbackExtracts,
    },
    ref
  ) => {
    const handleClick = () => {
      const feedbackExtract: IFeedbackExtract = {
        id: "aeoifjaef",
        author: "John Doe",
        inDashboard: false,
        text: selectedText,
      };

      setFeedbackExtracts((prevFeedbackExtracts) => [
        ...prevFeedbackExtracts,
        feedbackExtract,
      ]);
      setIsCreateSnippetButtonVisible(false);
      // Deselect text
      window.getSelection()?.removeAllRanges();
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={{ top: position.y, left: position.x }}
        className="absolute flex items-center gap-2 p-2 bg-slate-800 text-white text-sm border border-slate-600 rounded shadow-lg">
        <Article width={14} height={14} />
        Create Feedback Snippet
      </button>
    );
  }
);
