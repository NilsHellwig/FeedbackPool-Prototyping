import { Check, Pencil, Plus, X } from "phosphor-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useHover } from "../hooks/use-hover";
import { IFeedbackExtract, ILabel } from "../types";
import cx from "classnames";
import { useSnippets } from "../contexts/SnippetContext";
import { useOutsideClick } from "../hooks/use-outside-click";
import { EditFeedbackExtractForm } from "./EditFeedbackExtractForm";

interface FeedbackExtractProps {
  feedbackExtract: IFeedbackExtract;
  scrollToEndOfList: () => void;
}

export const FeedbackExtract: React.FC<FeedbackExtractProps> = ({
  feedbackExtract,
  scrollToEndOfList,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLabelsSelectorOpen, setIsLabelsSelectorOpen] = useState(false);
  const [snippet, setSnippet] = useState(feedbackExtract.text || "");
  const [comment, setComment] = useState(feedbackExtract.comment || "");

  const labelSelectorRef = useRef<HTMLUListElement>(null);
  useOutsideClick(labelSelectorRef, () => setIsLabelsSelectorOpen(false));

  const isOwnSnippet = feedbackExtract.author === "John Doe";

  const { snippets, setSnippets } = useSnippets();

  const handleSave = () => {
    const updatedSnippet: IFeedbackExtract = {
      ...feedbackExtract,
      text: snippet,
      comment,
    };

    setSnippets((prev) => {
      const index = prev.findIndex((s) => s.id === feedbackExtract.id);
      const updatedSnippets = [...prev];
      updatedSnippets[index] = updatedSnippet;
      return updatedSnippets;
    });

    setIsEditing(false);
  };

  const handleAbort = () => {
    setIsEditing(false);
    setComment(feedbackExtract.comment || "");
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      {isEditing ? (
        <EditFeedbackExtractForm
          feedbackExtract={feedbackExtract}
          handleAbort={handleAbort}
          handleSave={handleSave}
          isOwnSnippet={isOwnSnippet}
        />
      ) : (
        <>
          <p className="p-4 text-sm text-slate-700">{snippet}</p>
          {feedbackExtract.comment && (
            <div className="px-4 pb-4">
              <p className="p-4 text-sm text-slate-700 bg-slate-100 border border-slate-200 rounded">
                {feedbackExtract.comment}
              </p>
            </div>
          )}
          <div>
            {feedbackExtract.labels.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 px-4 pb-2 border-slate-200">
                {feedbackExtract.labels.map((label) => (
                  <span
                    key={label.id}
                    className="px-2 py-1 text-xs text-white bg-slate-600 rounded">
                    {label.text}
                  </span>
                ))}
              </div>
            )}
          </div>
          <FeedbackExtractFooter
            feedbackExtract={feedbackExtract}
            setIsEditing={setIsEditing}
            scrollToEndOfList={scrollToEndOfList}
          />
        </>
      )}
    </div>
  );
};

interface FeedbackExtractFooterProps {
  feedbackExtract: IFeedbackExtract;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  scrollToEndOfList: () => void;
}

const FeedbackExtractFooter: React.FC<FeedbackExtractFooterProps> = ({
  feedbackExtract,
  setIsEditing,
  scrollToEndOfList,
}) => {
  const [addButtonRef, isAddHovering] = useHover<HTMLButtonElement>();
  const { snippets, setSnippets } = useSnippets();

  const toggleFromDashboard = (snippetId: string) => {
    setSnippets((prevSnippets) => {
      return prevSnippets.map((prevSnippet) => {
        if (prevSnippet.id === snippetId) {
          return {
            ...prevSnippet,
            inDashboard: !prevSnippet.inDashboard,
          };
        }
        return prevSnippet;
      });
    });
  };

  const renderAddRemoveButtons = () => {
    const isSnippetInDashboard = feedbackExtract.inDashboard;

    if (!isSnippetInDashboard) {
      return (
        <>
          <Plus
            className="text-slate-900"
            width={14}
            height={14}
            weight="bold"
          />
          <span>Add</span>
        </>
      );
    } else {
      if (isAddHovering) {
        return (
          <>
            <X width={18} height={18} weight="bold" />
            <span>Remove</span>
          </>
        );
      } else {
        return (
          <>
            <Check width={18} height={18} weight="bold" />
            <span>Added</span>
          </>
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-s2ate-300">
      <span className="text-sm text-violet-600">{feedbackExtract.author}</span>
      <div className="flex gap-2">
        <button
          onClick={() => toggleFromDashboard(feedbackExtract.id)}
          ref={addButtonRef}
          className={cx(
            "flex items-center gap-2 px-3 py-2 border rounded-md text-sm",
            {
              "bg-green-500 border-green-500 text-white":
                !isAddHovering && feedbackExtract.inDashboard,
              "bg-red-100 border-red-100 text-red-500":
                isAddHovering && feedbackExtract.inDashboard,
              "bg-white border-slate-300": !feedbackExtract.inDashboard,
            }
          )}>
          {renderAddRemoveButtons()}
        </button>
        <button
          onClick={() => {
            setIsEditing(true);
            if (snippets[snippets.length - 1].id === feedbackExtract.id) {
              scrollToEndOfList();
            }
          }}
          className="bg-slate-200 hover:bg-slate-300 p-2 rounded-md">
          <Pencil
            className="text-slate-500"
            width={18}
            height={18}
            weight="bold"
          />
        </button>
      </div>
    </div>
  );
};
