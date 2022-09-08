import {
  ArrowFatLeft,
  CaretLeft,
  CaretRight,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextBolder,
  TextItalic,
  TextUnderline,
} from "phosphor-react";

export const NewSubmissionTopBar = () => {
  return (
    <div className="flex flex-row justify-between w-full items-center">
      <div className="flex flex-row items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md">
          <CaretLeft fill="#fff" width={18} height={18} weight="bold" />
          Back
        </button>
        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <span>Composition - Text Analysis Exercise 2</span>
          <CaretRight
            className="text-gray-500"
            width={14}
            height={14}
            weight="bold"
          />
          <span className="text-violet-600">Submission</span>
        </p>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex flex-row gap-2">
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextBolder size={20} />
          </div>
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextItalic size={20} />
          </div>
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextUnderline size={20} />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextAlignCenter size={20} />
          </div>
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextAlignJustify size={20} />
          </div>
          <div className="bg-offWhite  hover:bg-white p-2 rounded-md cursor-pointer">
            <TextAlignLeft size={20} />
          </div>
          <div className="bg-offWhite hover:bg-white p-2 rounded-md cursor-pointer">
            <TextAlignRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
