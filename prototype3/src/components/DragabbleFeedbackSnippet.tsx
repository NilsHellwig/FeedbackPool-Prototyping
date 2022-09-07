import { DotsSixVertical, Tag, X } from "phosphor-react";
import { useState } from "react";

interface DraggableFeedbackSnippetProps {
  extractedText: string;
  metaDataList: string[];
  labels: string[];
}

export const DraggableFeedbackSnippet: React.FC<
  DraggableFeedbackSnippetProps
> = ({ extractedText, metaDataList, labels }) => {
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  return (
    <div>
      <div
        className="flex flex-col justify-between p-4 gap-4 border bg-white rounded-md w-[350px] h-[300px] cursor-pointer"
        onClick={() => {
          setPopupIsOpened(true);
        }}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              {metaDataList.map((meta, idx) => {
                return (
                  <span
                    key={idx.toString()}
                    className="flex flex-row items-center gap-2 p-1 px-2 bg-offWhite text-darkGrey rounded-full text-xs">
                    {meta}
                  </span>
                );
              })}
            </div>
            <div className="cursor-grabbing">
              <DotsSixVertical size={20} />
            </div>
          </div>
          <p className="line-clamp-6">{extractedText}</p>
        </div>

        <div>
          <div className="flex flex-row gap-2">
            {labels.map((label, idx) => {
              return (
                <span
                  key={idx.toString()}
                  className="flex flex-row items-center gap-2 p-1 px-2 bg-darkGrey text-white rounded-md text-xs leading-6">
                  {label}
                  <Tag />
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {popupIsOpened ? (
        <div className="fixed top:0 bottom-0 right-0 left-0 w-full bg-slate-400 bg-opacity-40 h-full z-40 overscroll-hidden flex justify-center items-center cursor-default">
          <div className="flex flex-col gap-8 max-w-[800px] w-full bg-offWhite rounded-md p-6">
            <div className="flex flex-row justify-between items-center">
              <span className="text-mediumGrey">
                Essay Greek Mythology {">"}{" "}
                <span className="text-purple-800 font-bold">Feedback</span>
              </span>
              <div
                className="flex items-center justify-center h-8 w-8 rounded-md cursor-pointer bg-lightGrey/50 hover:bg-lightGrey"
                onClick={() => {
                  setPopupIsOpened(false);
                }}>
                <X size={20} />
              </div>
            </div>
            <p>
              Also, the advert represents the omnipresent Western materialism
              and mass consumption. Even though that it is actually positive for
              an online payment service that buying is not decreasing, the
              arrangement of that many items not only in the background but
              everywhere in the picture makes the buying behaviour seem rather
              excessive. On the other hand, the advert also shows the working
              economy and the good living conditions the Western society has.
              Being able to buy such a number of items and having various
              opportunities to shop from really increases the quality of living.
              Consequently, the advertisement shows Western buying behaviours
              and its surroundings in both lights.
              <span className="bg-orange-200">It seems to be</span> questionable
              whether it is positive or negative to depict such generalizations
              and aspects for marketing.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
