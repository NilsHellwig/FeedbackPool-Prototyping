import { Funnel, MagnifyingGlass, Plus } from "phosphor-react";
import { Link } from "react-router-dom";

export const SidebarSubmission = () => {
  return (
    <div className="w-[400px] p-4 bg-white border-l-2 border-slate-200">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-bold">Feedback Snippets</p>
        <div className="flex flex-row gap-1">
          <div className="flex items-center p-1 hover:bg-lightGrey  rounded-md cursor-pointer">
            <MagnifyingGlass className="text-mediumGrey" size={20} />
          </div>
          <div className="flex items-center p-1 hover:bg-lightGrey  rounded-md cursor-pointer">
            <Funnel weight="fill" className="text-mediumGrey" size={20} />
          </div>
          <div className="flex items-center p-1 hover:bg-lightGrey rounded-md cursor-pointer">
            <Plus className="text-mediumGrey" size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-end mt-4 mb-2">
        <p className="text-purple-800 font-light text-sm">
          1/4 Snippets berücksichtigt
        </p>
      </div>
      {/* List of comments */}
      <div className="flex flex-col border border-lightGrey rounded-md">
        <div className="flex flex-col p-2">
          <div className="flex flex-row items-center w-full gap-2 justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="px-2 bg-purple-100 rounded-full">
                <span className="text-xs text-darkPurple">ARGUMENTATION</span>
              </div>
              <div className="px-2 bg-purple-100 rounded-full">
                <span className="text-xs text-darkPurple">GRAMMAR</span>
              </div>
              <div className="px-2 bg-purple-100 rounded-full">
                <span className="text-xs text-darkPurple">LANGUAGE</span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="bg-offWhite border border-darkGrey p-2 rounded-sm"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t p-2">
          <p className="text-sm">
            Diam maecenas sed enim ut sem viverra aliquet. Porttitor lacus
            luctus accumsan tortor posuere ac. Convallis aenean et tortor at
            risus viverra adipiscing at.
          </p>
          <div className="bg-offWhite rounded-md p-2 mt-2">
            <p className="text-black text-sm">
              This is an example note. Depending on the quality of the feedback
              you’ll have to edit quite a lot I suppose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
