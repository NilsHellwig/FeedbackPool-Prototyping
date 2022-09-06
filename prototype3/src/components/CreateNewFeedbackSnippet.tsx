import { Check, X } from "phosphor-react";
import { useState } from "react";
import { IFeedbackExtract } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CreateNewFeedbackSnippetProps {
  handleAbort: () => void;
  handleSave: (snippet: IFeedbackExtract) => void;
}

export const CreateNewFeedbackSnippet: React.FC<
  CreateNewFeedbackSnippetProps
> = ({ handleAbort, handleSave }) => {
  const [snippetText, setSnippetText] = useState("");

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      <div className="p-4 space-y-2">
        <h3>What is your snippet about?</h3>
        <textarea
          placeholder="Write your snippet text here"
          className="p-4 text-sm text-slate-700 w-full min-h-[150px] flex items-start border border-slate-200 rounded"
          defaultValue={snippetText}
          onChange={(e) => setSnippetText(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-slate-200">
        <button
          onClick={handleAbort}
          className="flex items-center gap-2 px-3 py-2 border border-red-600 text-red-600 bg-red-100 rounded-md text-sm">
          <X width={14} height={14} weight="bold" />
          Discard
        </button>
        <button
          onClick={() => {
            const snippet: IFeedbackExtract = {
              id: uuidv4(),
              text: snippetText,
              author: "John Doe",
              inDashboard: false,
              labels: [],
            };
            handleSave(snippet);
          }}
          className="flex items-center gap-2 px-3 py-2 border border-green-600 text-green-600 bg-green-100 rounded-md text-sm">
          <Check width={14} height={14} weight="bold" />
          Save Snippet
        </button>
      </div>
    </div>
  );
};
