import { Article } from "phosphor-react";
import { Dispatch, forwardRef, SetStateAction } from "react";
import { useSnippets } from "../contexts/SnippetContext";
import { IFeedbackExtract } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CreateFeedbackSnippetButtonProps {
  position: { x: number; y: number };
  setIsCreateSnippetButtonVisible: Dispatch<SetStateAction<boolean>>;
  selectedText: string;
}

export const CreateFeedbackSnippetButton = forwardRef<
  HTMLButtonElement,
  CreateFeedbackSnippetButtonProps
>(({ position, setIsCreateSnippetButtonVisible, selectedText }, ref) => {
  const { setSnippets } = useSnippets();

  const handleClick = () => {
    const snippet: IFeedbackExtract = {
      id: uuidv4(),
      text: selectedText,
      author: "John Doe",
      inDashboard: false,
      labels: [],
    };

    setSnippets((prevFeedbackExtracts) => [...prevFeedbackExtracts, snippet]);
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
});
