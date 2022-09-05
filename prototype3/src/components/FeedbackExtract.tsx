import { Check, Pencil, Plus, X } from "phosphor-react";
import { useRef, useState } from "react";
import { useHover } from "../hooks/use-hover";
import { IFeedbackExtract } from "../types";
import cx from "classnames";

interface FeedbackExtractProps {
  feedbackExtract: IFeedbackExtract;
}

export const FeedbackExtract: React.FC<FeedbackExtractProps> = ({
  feedbackExtract,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(feedbackExtract.comment || "");
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [isAddHovering] = useHover(addButtonRef);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAbort = () => {
    setIsEditing(false);
    setComment(feedbackExtract.comment || "");
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      <p className="p-4 text-sm text-slate-700">{feedbackExtract.text}</p>
      {feedbackExtract.comment && !isEditing && (
        <div className="px-4 pb-4">
          <p className="p-4 text-sm text-slate-700 bg-slate-100 border border-slate-200 rounded">
            {feedbackExtract.comment}
          </p>
        </div>
      )}
      {isEditing && (
        <>
          <div className="px-4 pb-4">
            <textarea
              placeholder="Add a comment"
              className="p-4 text-sm text-slate-700 w-full min-h-[150px] flex items-start border border-slate-200 rounded"
              defaultValue={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-slate-300">
            <button
              onClick={handleAbort}
              className="flex items-center gap-2 px-3 py-2 border border-red-600 text-red-600 bg-red-100 rounded-md text-sm">
              <X width={14} height={14} weight="bold" />
              Discard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 border border-green-600 text-green-600 bg-green-100 rounded-md text-sm">
              <Check width={14} height={14} weight="bold" />
              Save Comment
            </button>
          </div>
        </>
      )}
      {!isEditing && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-s2ate-300">
          <span className="text-sm text-violet-600">
            {feedbackExtract.author}
          </span>
          <div className="flex gap-2">
            {feedbackExtract.inDashboard && (
              <button
                ref={addButtonRef}
                className={cx(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                  {
                    "bg-green-500 text-white": !isAddHovering,
                    "bg-red-100 text-red-500": isAddHovering,
                  }
                )}>
                {isAddHovering ? (
                  <>
                    <X width={18} height={18} weight="bold" />
                    <span>Remove</span>
                  </>
                ) : (
                  <>
                    <Check width={18} height={18} weight="bold" />
                    <span>Added</span>
                  </>
                )}
              </button>
            )}
            {!feedbackExtract.inDashboard && (
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-md text-sm">
                <Plus
                  className="text-slate-900"
                  width={14}
                  height={14}
                  weight="bold"
                />
                Add
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-200 p-2 rounded-md">
              <Pencil
                className="text-slate-500"
                width={18}
                height={18}
                weight="bold"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
