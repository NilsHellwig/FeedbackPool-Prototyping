import { IFeedbackExtract } from "../types";
import { EditFeedbackExtractForm } from "./EditFeedbackExtractForm";

interface CreateNewFeedbackSnippetProps {
  isOwnSnippet: boolean;
  handleAbort: () => void;
  handleSave: (snippet: IFeedbackExtract) => void;
}

export const CreateNewFeedbackSnippet: React.FC<
  CreateNewFeedbackSnippetProps
> = ({ isOwnSnippet, handleAbort, handleSave }) => {
  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      <EditFeedbackExtractForm
        handleAbort={handleAbort}
        handleSave={handleSave}
        isOwnSnippet={isOwnSnippet}
      />
    </div>
  );
};
