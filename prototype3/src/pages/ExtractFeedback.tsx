import { Article, CaretLeft } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FeedbackExtract } from "../components/FeedbackExtract";
import { Header } from "../components/Header";
import { IFeedbackExtract } from "../types";

const dummyFeedbackExtracts = [
  {
    id: "1",
    text: "Diam maecenas sed enim ut sem viverra aliquet. Porttitor lacus luctus accumsan tortor posuere ac. Convallis aenean et tortor at risus viverra adipiscing at.",
    author: "Peter Parker",
    inDashboard: false,
  },
  {
    id: "2",
    text: "Diam maecenas sed enim ut sem viverra aliquet. Porttitor lacus luctus accumsan tortor posuere ac. Convallis aenean et tortor at risus viverra adipiscing at.",
    author: "Peter Parker",
    inDashboard: true,
  },
  {
    id: "3",
    text: "Diam maecenas sed enim ut sem viverra aliquet. Porttitor lacus luctus accumsan tortor posuere ac. Convallis aenean et tortor at risus viverra adipiscing at.",
    author: "Peter Parker",
    comment:
      "Accumsan tortor posuere ac. Convallis aenean et tortor at risus viverra adipiscing at.",
    inDashboard: true,
  },
  {
    id: "4",
    text: "Diam maecenas sed enim ut sem viverra aliquet. Porttitor lacus luctus accumsan tortor posuere ac. Convallis aenean et tortor at risus viverra adipiscing at.",
    author: "Peter Parker",
    inDashboard: false,
  },
];

export const ExtractFeedback = () => {
  const [selectedText, setSelectedText] = useState("");
  const [feedbackExtracts, setFeedbackExtracts] = useState<IFeedbackExtract[]>(
    dummyFeedbackExtracts
  );
  const [isCreateSnippetButtonVisible, setIsCreateSnippetButtonVisible] =
    useState(false);
  const [createSnippetButtonPosition, setCreateSnippetButtonPosition] =
    useState({ x: 0, y: 0 });
  const summaryRef = useRef<HTMLDivElement>(null);
  const essayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSelection = () => {
      setIsCreateSnippetButtonVisible(false);

      const selectedText = window.getSelection()?.toString();
      if (!selectedText) {
        return;
      }

      setSelectedText(selectedText);

      // Get the range to be able to correctly position the create snippet button
      const range = window?.getSelection()?.getRangeAt(0);

      if (!range) return;
      // range.collapse(false);

      // Get the bounding rect of the range to be able to position the create snippet button
      const dummy = document.createElement("span");
      range.insertNode(dummy);

      const rect = dummy.getBoundingClientRect();
      console.log(rect);

      const coordinates = {
        x: rect.right,
        y: rect.top - 50,
      };

      if (dummy.parentNode) {
        dummy.parentNode.removeChild(dummy);
      }

      setCreateSnippetButtonPosition(coordinates);
      setIsCreateSnippetButtonVisible(true);
    };

    if (summaryRef.current) {
      summaryRef.current.addEventListener("mouseup", getSelection);
    }
    if (essayRef.current) {
      essayRef.current.addEventListener("mouseup", getSelection);
    }

    return () => {
      document.removeEventListener("mouseup", getSelection);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <main className="flex-grow bg-gray-100 p-8 overflow-y-scroll">
        <section className="grid gap-8 grid-cols-12 max-w-7xl m-auto">
          <div className="col-span-8 space-y-8">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md">
                <CaretLeft fill="#fff" width={18} height={18} weight="bold" />
                Back
              </button>
              <div className="flex flex-row items-center gap-2 text-sm">
                <span className="text-gray-500">Essay Greek Mythology</span>
                <span className="text-violet-600">Feedback</span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Feedback Summary</h2>
              <div
                ref={summaryRef}
                className="bg-white p-8 rounded-lg space-y-4 text-sm leading-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Egestas pretium aenean pharetra magna ac placerat vestibulum
                  lectus. Enim diam vulputate ut pharetra sit. Nunc faucibus a
                  pellentesque sit amet. Ultrices neque ornare aenean euismod
                  elementum. Ac tortor dignissim convallis aenean et tortor.
                  Augue neque gravida in fermentum. Sit amet mauris commodo quis
                  imperdiet massa tincidunt nunc. Id porta nibh venenatis cras
                  sed felis. Facilisi nullam vehicula ipsum a arcu cursus. Mus
                  mauris vitae ultricies leo. Tortor posuere ac ut consequat
                  semper viverra nam. Donec et odio pellentesque diam. Penatibus
                  et magnis dis parturient montes nascetur ridiculus mus.
                  Ultricies leo integer malesuada nunc vel risus commodo. Felis
                  eget velit aliquet sagittis id consectetur. Id donec ultrices
                  tincidunt arcu non sodales neque. In fermentum et sollicitudin
                  ac orci phasellus. Duis at consectetur lorem donec massa
                  sapien.
                </p>
                <p>
                  Suspendisse in est ante in nibh mauris cursus mattis. Et odio
                  pellentesque diam volutpat commodo sed. Risus ultricies
                  tristique nulla aliquet enim tortor. In mollis nunc sed id
                  semper risus in hendrerit. Et pharetra pharetra massa massa
                  ultricies. Aenean euismod elementum nisi quis eleifend quam
                  adipiscing vitae. Adipiscing elit ut aliquam purus sit. Nunc
                  congue nisi vitae suscipit tellus mauris. Vitae suscipit
                  tellus mauris a diam maecenas. Ullamcorper morbi tincidunt
                  ornare massa eget. Massa vitae tortor condimentum lacinia
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Greek Mythology</h2>
                <span className="text-gray-600 text-sm">
                  Submitted on 04.07.22
                </span>
              </div>
              <div
                ref={essayRef}
                className="bg-white p-8 rounded-lg space-y-4 text-sm leading-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Egestas pretium aenean pharetra magna ac placerat vestibulum
                  lectus. Enim diam vulputate ut pharetra sit. Nunc faucibus a
                  pellentesque sit amet. Ultrices neque ornare aenean euismod
                  elementum. Ac tortor dignissim convallis aenean et tortor.
                  Augue neque gravida in fermentum. Sit amet mauris commodo quis
                  imperdiet massa tincidunt nunc. Id porta nibh venenatis cras
                  sed felis. Facilisi nullam vehicula ipsum a arcu cursus. Mus
                  mauris vitae ultricies leo. Tortor posuere ac ut consequat
                  semper viverra nam. Donec et odio pellentesque diam. Penatibus
                  et magnis dis parturient montes nascetur ridiculus mus.
                  Ultricies leo integer malesuada nunc vel risus commodo. Felis
                  eget velit aliquet sagittis id consectetur. Id donec ultrices
                  tincidunt arcu non sodales neque. In fermentum et sollicitudin
                  ac orci phasellus. Duis at consectetur lorem donec massa
                  sapien.
                </p>
                <p>
                  Suspendisse in est ante in nibh mauris cursus mattis. Et odio
                  pellentesque diam volutpat commodo sed. Risus ultricies
                  tristique nulla aliquet enim tortor. In mollis nunc sed id
                  semper risus in hendrerit. Et pharetra pharetra massa massa
                  ultricies. Aenean euismod elementum nisi quis eleifend quam
                  adipiscing vitae. Adipiscing elit ut aliquam purus sit. Nunc
                  congue nisi vitae suscipit tellus mauris. Vitae suscipit
                  tellus mauris a diam maecenas. Ullamcorper morbi tincidunt
                  ornare massa eget. Massa vitae tortor condimentum lacinia
                </p>
              </div>
            </div>
          </div>
          <aside className="col-span-4 space-y-3">
            {feedbackExtracts.map((extract) => (
              <FeedbackExtract key={extract.id} feedbackExtract={extract} />
            ))}
          </aside>
        </section>
      </main>
      {isCreateSnippetButtonVisible && (
        <CreateFeedbackSnippetButton
          position={createSnippetButtonPosition}
          setIsCreateSnippetButtonVisible={setIsCreateSnippetButtonVisible}
          selectedText={selectedText}
          setFeedbackExtracts={setFeedbackExtracts}
        />
      )}
    </div>
  );
};

interface CreateFeedbackSnippetButtonProps {
  position: { x: number; y: number };
  setIsCreateSnippetButtonVisible: Dispatch<SetStateAction<boolean>>;
  selectedText: string;
  setFeedbackExtracts: Dispatch<SetStateAction<IFeedbackExtract[]>>;
}

const CreateFeedbackSnippetButton: React.FC<
  CreateFeedbackSnippetButtonProps
> = ({
  position,
  setIsCreateSnippetButtonVisible,
  selectedText,
  setFeedbackExtracts,
}) => {
  const handleClick = () => {
    const feedbackExtract: IFeedbackExtract = {
      id: "aeoifjaef",
      author: "John Doe",
      inDashboard: false,
      text: selectedText,
    };

    setFeedbackExtracts((prevFeedbackExtracts) => [
      ...prevFeedbackExtracts,
      feedbackExtract,
    ]);
    setIsCreateSnippetButtonVisible(false);
    // Deselect text
    window.getSelection()?.removeAllRanges();
  };

  return (
    <button
      onClick={handleClick}
      style={{ top: position.y, left: position.x }}
      className="absolute flex items-center gap-2 p-2 bg-slate-800 text-white text-sm border border-slate-600 rounded shadow-lg">
      <Article width={14} height={14} />
      Create Feedback Snippet
    </button>
  );
};
