import { DotsSixVertical, Tag } from "phosphor-react";
import { Link } from "react-router-dom";

interface DraggableFeedbackSnippetProps {
  extractedText: string;
  metaDataList: string[];
  labels: string[];
}

export const DraggableFeedbackSnippet: React.FC<
  DraggableFeedbackSnippetProps
> = ({ extractedText, metaDataList, labels }) => {
  return (
    <div className="flex flex-col p-4 gap-4 border bg-white rounded-md w-[300px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center">
          {metaDataList.map((meta, idx) => {
            return (
              <span
                id={idx.toString()}
                className="flex flex-row items-center gap-2 p-1 px-2 bg-offWhite text-darkGrey rounded-full text-xs">
                {meta}
              </span>
            );
          })}
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
        <div className="flex flex-row gap-2">
          {labels.map((label, idx) => {
            return (
              <span
                id={idx.toString()}
                className="flex flex-row items-center gap-2 p-1 px-2 bg-darkGrey text-white rounded-full text-xs">
                {label}
                <Tag />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
