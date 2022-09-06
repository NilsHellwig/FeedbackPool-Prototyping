import { Check, Plus, X } from "phosphor-react";
import { useRef, useState } from "react";
import { useSnippets } from "../contexts/SnippetContext";
import { IFeedbackExtract, ILabel } from "../types";

interface EditFeedbackExtractFormProps {
  isOwnSnippet: boolean;
  feedbackExtract: IFeedbackExtract;
  handleAbort: () => void;
  handleSave: () => void;
}

export const EditFeedbackExtractForm: React.FC<
  EditFeedbackExtractFormProps
> = ({ isOwnSnippet, feedbackExtract, handleAbort, handleSave }) => {
  const [snippet, setSnippet] = useState(feedbackExtract.text || "");
  const [comment, setComment] = useState(feedbackExtract.comment || "");
  const [isLabelsSelectorOpen, setIsLabelsSelectorOpen] = useState(false);

  const { setSnippets, availableLabels } = useSnippets();

  const labelSelectorRef = useRef<HTMLUListElement>(null);

  const areLabelsAvailable =
    availableLabels.filter(
      (label) => !feedbackExtract.labels.some((l) => l.id === label.id)
    ).length > 0;

  const addLabelForFeedback = (label: ILabel) => {
    setSnippets((prev) => {
      const index = prev.findIndex((s) => s.id === feedbackExtract.id);
      const updatedSnippets = [...prev];
      updatedSnippets[index] = {
        ...updatedSnippets[index],
        labels: [...updatedSnippets[index].labels, label],
      };
      return updatedSnippets;
    });
  };

  const removeLabelForFeedback = (label: ILabel) => {
    setSnippets((prev) => {
      const index = prev.findIndex((s) => s.id === feedbackExtract.id);
      const updatedSnippets = [...prev];
      updatedSnippets[index] = {
        ...updatedSnippets[index],
        labels: updatedSnippets[index].labels.filter((l) => l.id !== label.id),
      };
      return updatedSnippets;
    });
  };

  return (
    <>
      <div className="p-4 space-y-2">
        <h3>Extracted Snippet</h3>
        <textarea
          placeholder="Add a comment"
          className="p-4 text-sm text-slate-700 w-full min-h-[150px] flex items-start border border-slate-200 rounded"
          defaultValue={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        />
      </div>
      {!isOwnSnippet && (
        <div className="px-4 pb-4 space-y-1">
          <h3 className="text-sm text-slate-500">Comment:</h3>
          <textarea
            placeholder="Add a comment"
            className="p-4 text-sm bg-slate-100 text-slate-700 w-full min-h-[100px] flex items-start border border-slate-200 rounded"
            defaultValue={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      )}
      <div className="px-4 pb-4 space-y-1">
        <h3 className="text-sm text-slate-500">Labels:</h3>
        <ul ref={labelSelectorRef} className="relative flex flex-wrap gap-2">
          {feedbackExtract?.labels.map((label) => (
            <li
              key={label.id}
              className="flex items-center gap-2 bg-violet-100 border border-violet-700 text-violet-700 text-sm px-2 py-1 rounded-full">
              <span
                onClick={() => removeLabelForFeedback(label)}
                className="hover:bg-violet-700/10 rounded-full p-1 cursor-pointer">
                <X width={14} height={14} />
              </span>
              <span>{label.text}</span>
            </li>
          ))}
          <div>
            {areLabelsAvailable && (
              <button
                onClick={() => setIsLabelsSelectorOpen(!isLabelsSelectorOpen)}
                className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-2">
                Add Label <Plus width={14} height={14} weight="bold" />
              </button>
            )}
            {isLabelsSelectorOpen && areLabelsAvailable && (
              <ul className="absolute w-[350px] left-0 mt-2 flex flex-wrap gap-2 bg-white p-4 border border-gray-100 shadow-xl rounded">
                {availableLabels
                  .filter(
                    (label) =>
                      !feedbackExtract.labels.some((l) => l.id === label.id)
                  )
                  .map((label) => (
                    <li
                      onClick={() => addLabelForFeedback(label)}
                      className="flex items-center gap-2 px-2 py-1 border hover:bg-gray-100 border-gray-200 rounded cursor-pointer"
                      key={label.id}>
                      <Plus width={14} height={14} weight="bold" />
                      <span>{label.text}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </ul>
      </div>
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-slate-200">
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
          Save Changes
        </button>
      </div>
    </>
  );
};
