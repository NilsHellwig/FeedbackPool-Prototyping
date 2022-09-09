import cx from "classnames";
import {
  Check,
  DotsThree,
  Pencil,
  Plus,
  Tag,
  Trash,
  TrashSimple,
  X,
} from "phosphor-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSnippets } from "../contexts/SnippetContext";
import { useHover } from "../hooks/use-hover";
import { useOutsideClick } from "../hooks/use-outside-click";
import { IFeedbackExtract } from "../types";
import { EditFeedbackExtractForm } from "./EditFeedbackExtractForm";
import { Tooltip } from "./Tooltip";

interface FeedbackExtractProps {
  feedbackExtract: IFeedbackExtract;
  scrollToEndOfList: () => void;
}

export const FeedbackExtract: React.FC<FeedbackExtractProps> = ({
  feedbackExtract,
  scrollToEndOfList,
}) => {
  const { setSnippets } = useSnippets();
  const [isEditing, setIsEditing] = useState(false);
  const isOwnSnippet = feedbackExtract.author === "John Doe";

  const handleSave = (snippet: IFeedbackExtract) => {
    setSnippets((prev) => {
      const index = prev.findIndex((s) => s.id === feedbackExtract.id);
      const updatedSnippets = [...prev];
      updatedSnippets[index] = snippet;
      return updatedSnippets;
    });

    setIsEditing(false);
  };

  const handleAbort = () => {
    setIsEditing(false);
  };

  const handleMouseOver = () => {
    let highlightedText = document.querySelector(
      `span[data-id="${feedbackExtract.id}"]`
    );
    if (highlightedText) {
      highlightedText.classList.add("bg-yellow-300");
    }
  };

  const handleMouseOut = () => {
    let highlightedText = document.querySelector(
      `span[data-id="${feedbackExtract.id}"]`
    );
    if (highlightedText) {
      highlightedText.classList.remove("bg-yellow-300");
    }
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      {isEditing ? (
        <EditFeedbackExtractForm
          feedbackExtract={feedbackExtract}
          handleAbort={handleAbort}
          handleSave={handleSave}
          isOwnSnippet={isOwnSnippet}
        />
      ) : (
        <>
          <p className="p-4 text-sm text-slate-700 text-justify">
            {feedbackExtract.text}
          </p>
          {feedbackExtract.comment && (
            <div className="px-4 pb-4">
              <p className="p-4 text-justify text-sm text-slate-700 bg-slate-100 border border-slate-200 rounded">
                {feedbackExtract.comment}
              </p>
            </div>
          )}
          <div>
            {feedbackExtract.labels.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 px-4 pb-2">
                {feedbackExtract.labels.map((label) => (
                  <div className="flex flex-row gap-1 items-center text-white bg-gray-700 rounded py-1 px-2">
                    <span key={label.id} className="px-2 py-1 text-xs">
                      {label.text}
                    </span>
                    <Tag width={14} height={14} weight="bold" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <FeedbackExtractFooter
            feedbackExtract={feedbackExtract}
            setIsEditing={setIsEditing}
            scrollToEndOfList={scrollToEndOfList}
            isOwnSnippet={isOwnSnippet}
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
  isOwnSnippet?: boolean;
}

const FeedbackExtractFooter: React.FC<FeedbackExtractFooterProps> = ({
  feedbackExtract,
  setIsEditing,
  scrollToEndOfList,
  isOwnSnippet,
}) => {
  const { snippets, setSnippets } = useSnippets();
  const [addButtonRef, isAddHovering] = useHover<HTMLButtonElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  useOutsideClick(menuRef, () => setIsMenuVisible(false));

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

  const deleteExtract = (snippetId: string) => {
    setSnippets((prevSnippets) => {
      return prevSnippets.filter((prevSnippet) => prevSnippet.id !== snippetId);
    });
  };

  const renderAddRemoveButtons = () => {
    const isSnippetInDashboard = feedbackExtract.inDashboard;

    if (!isSnippetInDashboard) {
      return (
        <Tooltip text="Add snippet to dashboard">
          <div className="flex flex-row items-center gap-1">
            <Plus
              className="text-slate-900"
              width={14}
              height={14}
              weight="bold"
            />
            <span>Add</span>
          </div>
        </Tooltip>
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
        {isOwnSnippet && (
          <div className="relative">
            <button
              onClick={() => setIsMenuVisible(!isMenuVisible)}
              className="border border-slate-200 hover:bg-slate-300 p-2 rounded-md">
              <DotsThree
                className="text-slate-500"
                width={18}
                height={18}
                weight="bold"
              />
            </button>
            {isMenuVisible && (
              <ul
                ref={menuRef}
                className="w-[200px] bg-white absolute p-2 rounded shadow bottom-0 right-0">
                <li
                  className="flex items-center gap-2 cursor-pointer bg-red-100 text-red-500 rounded p-2"
                  onClick={() => deleteExtract(feedbackExtract.id)}>
                  <Trash width={18} height={18} weight="bold" />
                  <span>Löschen</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
