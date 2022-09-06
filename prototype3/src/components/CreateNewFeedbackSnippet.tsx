import { Check, X } from "phosphor-react";
import { useState } from "react";
import { IFeedbackExtract } from "../types";
import { v4 as uuidv4 } from "uuid";
import { EditFeedbackExtractForm } from "./EditFeedbackExtractForm";
import { useSnippets } from "../contexts/SnippetContext";

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
