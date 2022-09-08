import { Plus } from "phosphor-react";
import { useRef, useState } from "react";
import { useSnippets } from "../contexts/SnippetContext";
import { IFeedbackExtract } from "../types";
import { CreateNewFeedbackSnippet } from "./CreateNewFeedbackSnippet";
import { FeedbackExtract } from "./FeedbackExtract";

export const ExtractFeedbackSidebar = () => {
  const { snippets, setSnippets } = useSnippets();
  const [isCreatingNewSnippet, setIsCreatingNewSnippet] =
    useState<boolean>(false);
  const [showOriginals, setShowOriginals] = useState<boolean>(false);

  const snippetContainerRef = useRef<HTMLDivElement>(null);

  const showNewSnippetForm = () => {
    setIsCreatingNewSnippet(true);
    scrollToEndOfList();
  };

  // Filter snippets by author "Peter Parker" if showOriginals is true, otherwise return snippets
  const filteredSnippets = showOriginals
    ? snippets.filter((s) => s.author === "James Michael")
    : snippets;

  const scrollToEndOfList = () => {
    setTimeout(() => {
      if (snippetContainerRef.current) {
        snippetContainerRef.current.scrollTop =
          snippetContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <aside className="flex flex-col max-w-[400px] min-w-[400px] space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <label className="space-x-2 cursor-pointer flex items-center">
          <input
            checked={showOriginals}
            onChange={() => setShowOriginals(!showOriginals)}
            type="checkbox"
            className="w-4 h-4"
          />
          <span>Show Originals</span>
        </label>
        <button
          onClick={showNewSnippetForm}
          className="flex gap-2 items-center px-4 py-2 rounded bg-violet-800 hover:bg-violet-600 text-white">
          Create Snippet <Plus width={14} height={14} weight="bold" />
        </button>
      </div>
      <div
        ref={snippetContainerRef}
        className="flex flex-grow flex-col space-y-3 overflow-y-auto scroll-smooth">
        {filteredSnippets.map((extract) => (
          <FeedbackExtract
            key={extract.id}
            feedbackExtract={extract}
            scrollToEndOfList={scrollToEndOfList}
          />
        ))}
        {isCreatingNewSnippet && (
          <CreateNewFeedbackSnippet
            isOwnSnippet={true}
            handleAbort={() => setIsCreatingNewSnippet(false)}
            handleSave={(snippet: IFeedbackExtract) => {
              setSnippets((prev) => [...prev, snippet]);
              setIsCreatingNewSnippet(false);
            }}
          />
        )}
      </div>
    </aside>
  );
};
