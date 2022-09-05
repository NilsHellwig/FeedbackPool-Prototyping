import { DotsSixVertical, Tag } from "phosphor-react";
import { Link } from "react-router-dom";

interface DraggableFeedbackSnippetProps {
  extractedText: string;
  meta: string[];
  labels: string[];
}

export const DraggableFeedbackSnippet: React.FC<
  DraggableFeedbackSnippetProps
> = ({ extractedText, meta, labels }) => {
  return (
    <div className="flex flex-col p-4 gap-4 border bg-white rounded-md w-[300px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          <span className="p-1 px-2 bg-offWhite text-darkGrey rounded-full text-xs">
            Geography
          </span>
          <span className="p-1 px-2 bg-offWhite text-darkGrey rounded-full text-xs">
            Essay
          </span>
        </div>
        <div>
          <DotsSixVertical size={20} />
        </div>
      </div>
      <p className="text-justify">
        Suspendisse in est ante in nibh mauris cursus mattis. Et odio
        pellentesque diam volutpat commodo sed. Risus ultricies tristique nulla
        aliquet enim tortor.
      </p>
      <div>
        <div className="flex flex-row">
          <span className="flex flex-row items-center gap-2 p-1 px-2 bg-darkGrey text-white rounded-full text-xs">
            argumentation
            <Tag/>
          </span>
        </div>
      </div>
    </div>
  );
};
