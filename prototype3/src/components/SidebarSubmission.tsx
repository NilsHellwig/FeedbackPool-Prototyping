import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Books,
  Check,
  Funnel,
  MagnifyingGlass,
  Plus,
  Student,
  Tag,
  X,
} from "phosphor-react";
import { useState } from "react";
import { IFeedbackSnippet } from "../types";

const feedbackSnippetsBase: IFeedbackSnippet[] = [
  {
    id: 0,
    metaData: [{ text: "Wording", type: "label", filter: false }],
    extractedText:
      "Reconsider your wording to make your point (seems to stand out - woolly wording)",
    checked: false,
  },
  {
    id: 1,
    metaData: [{ text: "Structure", type: "label", filter: false }],
    extractedText:
      "topic sentence? should contain your claim (not describe the campaign)",
    checked: false,
  },
  {
    id: 2,
    metaData: [{ text: "Formal Error", type: "label", filter: false }],
    extractedText: "Remember to indent!",
    checked: false,
  },
  {
    id: 3,
    metaData: [{ text: "Wording", type: "label", filter: false }],
    extractedText: "There are more elegant linking words out there!",
    note: "Linking words like: additionally, further (more), besides, etc.",
    checked: false,
  },
  {
    id: 4,
    metaData: [{ text: "Wording", type: "label", filter: false }],
    extractedText: "replace with consumerism",
    checked: false,
  },
];

const availableMetaDataTotalBase: any = [
  {
    id: 0,
    text: "Composition - Text Analysis",
    type: "course",
    selected: false,
  },
  { id: 1, text: "Essay", type: "type", selected: false },
  { id: 2, text: "Wording", type: "label", selected: false },
  { id: 3, text: "Formal Error", type: "label", selected: false },
  { id: 4, text: "Structure", type: "label", selected: false },
];

export const SidebarSubmission = () => {
  const [feedbackSnippets, setFeedbackSnippets] =
    useState(feedbackSnippetsBase);

  const [availableMetaDataTotal, setAvailableMetaDataTotal] = useState(
    availableMetaDataTotalBase
  );

  const getAmountOfCheckedSnippets: () => number = () => {
    let count = 0;
    for (let index = 0; index < feedbackSnippets.length; index++) {
      if (feedbackSnippets[index].checked) {
        count += 1;
      }
    }
    return count;
  };

  const toggleFilterItem = (item: any) => {
    let availableMetaDataTotalCopy = [...availableMetaDataTotal];
    let availableMetaDataCopy = availableMetaDataTotalCopy[item.id];
    availableMetaDataCopy.selected = !availableMetaDataCopy.selected;
    availableMetaDataTotalCopy[item.id] = availableMetaDataCopy;
    setAvailableMetaDataTotal(availableMetaDataTotalCopy);
  };

  const getNumberOfSelectedFilters = () => {
    let counter = 0;
    for (let index = 0; index < availableMetaDataTotal.length; index++) {
      if (availableMetaDataTotal[index].selected === true) {
        counter += 1;
      }
    }
    return counter;
  };

  const snippetHasFilter = (snippet: IFeedbackSnippet) => {
    if (getNumberOfSelectedFilters() === 0) {
      return true;
    }
    for (let index = 0; index < snippet.metaData.length; index++) {
      for (
        let indexMeta = 0;
        indexMeta < availableMetaDataTotal.length;
        indexMeta++
      ) {
        if (
          availableMetaDataTotal[indexMeta].text ===
            snippet.metaData[index].text &&
          availableMetaDataTotal[indexMeta].type ===
            snippet.metaData[index].type &&
          availableMetaDataTotal[indexMeta].selected
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="w-[400px] p-4 bg-white border-l-2 border-slate-200">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-bold text-xl">Feedback Snippets</p>
        <div className="flex flex-row gap-2">
          <div className="flex items-center p-2 bg-offWhite hover:bg-lightGrey  rounded-md cursor-pointer">
            <MagnifyingGlass className="text-mediumGrey" size={14} />
          </div>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger className="bg-gray-100 flex items-center p-2  hover:bg-lightGrey  rounded-md cursor-pointer gap-2">
              <Funnel weight="fill" className="text-mediumGrey" size={14} />
              {getNumberOfSelectedFilters() > 0 ? (
                <div className="flex items-center">
                  <span className="text-xs font-bold">
                    {getNumberOfSelectedFilters()}
                  </span>
                </div>
              ) : null}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="end"
                className="flex flex-col bg-darkGrey shadow-md mt-4 rounded-lg p-4 w-[500px] h-auto">
                <div className="flex flex-row gap-2 overflow-scroll">
                  {availableMetaDataTotal.map((item: any) => {
                    if (item.selected) {
                      return (
                        <div
                          className="flex flex-row bg-mediumGrey gap-2 rounded-md items-center p-1"
                          key={item.id}>
                          <div
                            className="p-1 hover:bg-darkGrey rounded-md cursor-pointer"
                            onClick={() => {
                              toggleFilterItem(item);
                            }}>
                            <X className="text-white" size={16} />
                          </div>
                          <span className="text-xs text-white whitespace-nowrap">
                            {item.text}
                          </span>
                          {item.type === "label" ? (
                            <Tag className="text-white" size={16} />
                          ) : item.type === "course" ? (
                            <Student className="text-white" size={16} />
                          ) : (
                            <Books className="text-white" size={16} />
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {getNumberOfSelectedFilters() === 0 ? (
                    <p className="text-white/50 text-xs">
                      (Click on a property you want to filter by)
                    </p>
                  ) : null}
                </div>
                <div className="h-[1px] bg-mediumGrey mt-2 mb-2 rounded-full"></div>
                <div className="flex flex-col gap2 overflow-scroll">
                  {availableMetaDataTotal.map((item: any) => {
                    return (
                      <div
                        className="flex flex-row gap-2 rounded-md items-center p-2 w-full cursor-pointer"
                        key={item.id}
                        onClick={() => {
                          toggleFilterItem(item);
                        }}>
                        <span
                          className={`text-xs ${
                            item.selected
                              ? "text-white"
                              : "text-white/50 hover:text-white/70"
                          }`}>
                          {item.text}
                        </span>
                        {item.type === "label" ? (
                          <Tag
                            className={`${
                              item.selected
                                ? "text-white"
                                : "text-white/50 hover:text-white/70"
                            }`}
                            size={16}
                          />
                        ) : item.type === "course" ? (
                          <Student
                            className={`${
                              item.selected
                                ? "text-white"
                                : "text-white/50 hover:text-white/70"
                            }`}
                            size={16}
                          />
                        ) : (
                          <Books
                            className={`${
                              item.selected
                                ? "text-white"
                                : "text-white/50 hover:text-white/70"
                            }`}
                            size={16}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <div className="flex items-center p-2 bg-offWhite hover:bg-lightGrey rounded-md cursor-pointer">
            <Plus className="text-mediumGrey" size={14} />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full mt-6">
        <p className="text-purple-800 font-bold text-sm">
          {getAmountOfCheckedSnippets()}/{feedbackSnippets.length} Snippets
          berücksichtigt
        </p>
      </div>
      {/* List of comments */}
      <div className="flex flex-col gap-4 mt-6">
        {feedbackSnippets.map((snippet, idx_snippet) => {
          if (snippetHasFilter(snippet)) {
            return (
              <div
                className="flex flex-col border border-lightGrey rounded-md"
                key={snippet.id}>
                <div className="flex flex-col p-2">
                  <div className="flex flex-row items-center w-full gap-2 justify-between">
                    <div className="flex flex-row items-center gap-2">
                      {snippet.metaData
                        .filter((el) => {
                          return el.type === "label";
                        })
                        .map((label, key) => {
                          return (
                            <div
                              className="flex flex-row items-center gap-1 py-1 px-2 bg-gray-700 rounded-md"
                              key={key}>
                              <span className="text-xs text-white">
                                {label.text}
                              </span>
                              <Tag className="text-white"/>
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex flex-row items-center">
                      <div
                        className="flex items-center justify-center bg-offWhite border border-darkGrey rounded-sm w-4 h-4 cursor-pointer"
                        onClick={() => {
                          let snippetsCopy = [...feedbackSnippets];
                          let snippetCopy = snippetsCopy[idx_snippet];
                          snippetCopy.checked = !snippetCopy.checked;
                          snippetsCopy[idx_snippet] = snippetCopy;
                          setFeedbackSnippets(snippetsCopy);
                        }}>
                        {snippet.checked ? (
                          <Check weight="bold" size={12} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t p-2">
                  <p className="text-sm">{snippet.extractedText}</p>
                  {snippet.note !== undefined ? (
                    <div className="bg-offWhite rounded-md p-2 mt-2">
                      <p className="text-black text-sm">{snippet.note}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};
