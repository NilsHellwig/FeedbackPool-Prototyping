import { Check, Plus, Tag, X } from "phosphor-react";
import { useRef, useState } from "react";
import { useSnippets } from "../contexts/SnippetContext";
import { useOutsideClick } from "../hooks/use-outside-click";
import { IFeedbackExtract, ILabel } from "../types";
import { v4 as uuidv4 } from "uuid";

interface EditFeedbackExtractFormProps {
  isOwnSnippet: boolean;
  feedbackExtract?: IFeedbackExtract;
  handleAbort: () => void;
  handleSave: (snippet: IFeedbackExtract) => void;
}

export const EditFeedbackExtractForm: React.FC<
  EditFeedbackExtractFormProps
> = ({ isOwnSnippet, feedbackExtract, handleAbort, handleSave }) => {
  const [text, setText] = useState(feedbackExtract?.text || "");
  const [comment, setComment] = useState(feedbackExtract?.comment || "");
  const [labels, setLabels] = useState<ILabel[]>(feedbackExtract?.labels || []);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [isLabelsSelectorOpen, setIsLabelsSelectorOpen] = useState(false);

  const { availableLabels } = useSnippets();

  const labelSelectorRef = useRef<HTMLUListElement>(null);
  useOutsideClick(labelSelectorRef, () => setIsLabelsSelectorOpen(false));

  const areLabelsAvailable =
    availableLabels.filter((label) => !labels.some((l) => l.id === label.id))
      .length > 0;

  const addLabelForFeedback = (label: ILabel) => {
    setLabels((prev) => [...prev, label]);
  };

  const removeLabelForFeedback = (label: ILabel) => {
    setLabels((prev) => prev.filter((l) => l.id !== label.id));
  };

  const onClickedSave = () => {
    if (text.trim().length === 0) {
      setError("Please enter a text for the feedback extract.");
      setShowError(true);
      return;
    }

    const snippet: IFeedbackExtract = {
      id: feedbackExtract?.id || uuidv4(),
      text,
      author: feedbackExtract?.author || "John Doe",
      inDashboard: feedbackExtract?.inDashboard || false,
      labels,
      comment: comment,
    };

    handleSave(snippet);
    setError("");
    setShowError(false);
  };

  return (
    <>
      <div className="p-4 space-y-2">
        <h3>Extracted Snippet</h3>
        <textarea
          placeholder="Add a comment"
          className="p-4 text-sm text-slate-700 w-full min-h-[150px] flex items-start border border-slate-200 rounded"
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
        {showError && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="px-4 pb-4 space-y-1">
        <h3 className="text-sm text-slate-500">Comment:</h3>
        <textarea
          placeholder="Add a comment"
          className="p-4 text-sm bg-slate-100 text-slate-700 w-full min-h-[100px] flex items-start border border-slate-200 rounded"
          defaultValue={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="px-4 pb-4 space-y-1">
        <h3 className="text-sm text-slate-500">Labels:</h3>
        <ul
          ref={labelSelectorRef}
          className="relative flex flex-wrap gap-2 items-center">
          {labels.map((label) => (
            <li
              key={label.id}
              className="flex items-center gap-1 bg-gray-700 border text-white text-sm px-1 py-1 rounded-md">
              <span
                onClick={() => removeLabelForFeedback(label)}
                className="hover:bg-gray-500 rounded-full p-1 cursor-pointer">
                <X width={12} height={14} />
              </span>
              <span>{label.text}</span>
              <Tag width={14} height={14} weight="bold" />
            </li>
          ))}
          <div>
            {areLabelsAvailable && (
              <button
                onClick={() => setIsLabelsSelectorOpen(!isLabelsSelectorOpen)}
                className="flex flex-row items-center hover:bg-gray-500 bg-gray-400 rounded-full cursor-pointer text-white text-sm px-3 py-1 flex items-center gap-2">
                Add Label <Plus width={14} height={14} weight="bold" />
              </button>
            )}
            {isLabelsSelectorOpen && areLabelsAvailable && (
              <ul className="absolute w-[350px] left-0 mt-2 flex flex-wrap gap-2 bg-white p-4 border border-gray-100 shadow-xl rounded">
                {availableLabels
                  .filter((label) => !labels.some((l) => l.id === label.id))
                  .map((label) => (
                    <li
                      onClick={() => addLabelForFeedback(label)}
                      className="flex items-center gap-2 px-2 py-1 border hover:bg-gray-500 bg-gray-700 rounded-md cursor-pointer text-white"
                      key={label.id}>
                      <Plus width={14} height={14} weight="bold" />
                      <span>{label.text}</span>
                      <Tag width={14} height={14} weight="bold" />
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
          onClick={onClickedSave}
          className="flex items-center gap-2 px-3 py-2 border border-green-600 text-green-600 bg-green-100 rounded-md text-sm">
          <Check width={14} height={14} weight="bold" />
          Save Changes
        </button>
      </div>
    </>
  );
};
