import {
  ArrowFatLeft,
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
        <div className="flex flex-row items-center gap-2 bg-darkGrey hover:bg-mediumGrey p-2 rounded-md cursor-pointer">
          <ArrowFatLeft className="text-white" weight="fill" size={20} />
          <section className="text-white">Back</section>
        </div>
        <p>Untitled New Submission</p>
      </div>
      <div className="flex flex-row gap-2">
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextBolder size={20} />
        </div>
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextItalic size={20} />
        </div>
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextUnderline size={20} />
        </div>
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextAlignCenter size={20} />
        </div>
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextAlignJustify size={20} />
        </div>
        <div className="bg-offWhite  hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextAlignLeft size={20} />
        </div>
        <div className="bg-offWhite hover:bg-lightGrey p-2 rounded-md cursor-pointer">
          <TextAlignRight size={20} />
        </div>
      </div>
    </div>
  );
};
