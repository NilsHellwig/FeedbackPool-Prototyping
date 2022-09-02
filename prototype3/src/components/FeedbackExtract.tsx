import { Check, Pencil, Plus } from "phosphor-react";
import { IFeedbackExtract } from "../types";

interface FeedbackExtractProps {
  feedbackExtract: IFeedbackExtract;
}

export const FeedbackExtract: React.FC<FeedbackExtractProps> = ({
  feedbackExtract,
}) => {
  return (
    <div className="bg-white border border-slate-200 hover:border-slate-400 transition-all rounded-lg">
      <p className="p-4 text-sm text-slate-700">{feedbackExtract.text}</p>
      <div className="flex items-center justify-between px-4 py-2 border-t border-s2ate-300">
        <span className="text-sm text-violet-600">
          {feedbackExtract.author}
        </span>
        <div className="flex gap-2">
          {feedbackExtract.inDashboard && (
            <button className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md text-sm">
              <Check
                className="text-white"
                width={18}
                height={18}
                weight="bold"
              />
              Hinzugefügt
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
              Hinzufügen
            </button>
          )}
          <button className="bg-slate-200 p-2 rounded-md">
            <Pencil
              className="text-slate-500"
              width={18}
              height={18}
              weight="bold"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
