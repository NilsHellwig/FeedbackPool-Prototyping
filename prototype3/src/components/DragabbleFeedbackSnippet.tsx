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
          <p className="text-justify line-clamp-6">{extractedText}</p>
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
              <span className="bg-orange-200">
                Suspendisse in est ante in nibh mauris cursus mattis. Et odio
                pellentesque diam volutpat commodo sed.
              </span>
              Risus ultricies tristique nulla aliquet enim tortor. In mollis
              nunc sed id semper risus in hendrerit. Et pharetra pharetra massa
              massa ultricies. Aenean euismod elementum nisi quis eleifend quam
              adipiscing vitae. Adipiscing elit ut aliquam purus sit. Nunc
              congue nisi vitae suscipit tellus mauris. Vitae suscipit tellus
              mauris a diam maecenas. Ullamcorper morbi tincidunt ornare massa
              eget. Massa vitae tortor condimentum lacinia quis vel eros donec.
              Viverra tellus in hac habitasse platea. Mauris rhoncus aenean vel
              elit scelerisque mauris pellentesque. Purus semper eget duis at
              tellus. Diam maecenas sed enim ut sem viverra aliquet. Porttitor
              lacus luctus accumsan tortor posuere ac. Convallis aenean et
              tortor at risus viverra adipiscing at.Fusce velit lectus,
              tincidunt in turpis at, vehicula pharetra lorem. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Sed faucibus est
              felis, vitae placerat ex ultricies
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
