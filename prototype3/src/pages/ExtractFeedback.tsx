import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFeedbackSnippetButton } from "../components/CreateFeedbackSnippetButton";
import { ExtractFeedbackSidebar } from "../components/ExtractFeedbackSidebar";
import { Header } from "../components/Header";
import { useOutsideClick } from "../hooks/use-outside-click";

export const ExtractFeedback = () => {
  const [selectedText, setSelectedText] = useState("");

  const [isCreateSnippetButtonVisible, setIsCreateSnippetButtonVisible] =
    useState(false);
  const [createSnippetButtonPosition, setCreateSnippetButtonPosition] =
    useState({ x: 0, y: 0 });

  const summaryRef = useRef<HTMLDivElement>(null);
  const essayRef = useRef<HTMLDivElement>(null);
  const createSnippetButtonRef = useRef<HTMLButtonElement>(null);
  const createSnippetButtonWidth =
    createSnippetButtonRef.current?.offsetWidth || 0;

  useOutsideClick(createSnippetButtonRef, () => {
    setIsCreateSnippetButtonVisible(false);
    // Deselect text
    window.getSelection()?.removeAllRanges();
  });

  const navigate = useNavigate();

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
      dummy.innerHTML = selectedText;
      range.insertNode(dummy);

      const rect = dummy.getBoundingClientRect();

      const coordinates = {
        x: rect.left + rect.width / 2 - createSnippetButtonWidth / 2,
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
  }, [createSnippetButtonWidth]);

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <main className="flex-grow bg-gray-100 p-8 overflow-y-auto">
        <section className="flex flex-grow gap-8 h-full max-w-7xl m-auto">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md">
                <CaretLeft fill="#fff" width={18} height={18} weight="bold" />
                Back
              </button>
              <div className="flex flex-row items-center gap-2 text-sm">
                <span className="text-gray-500">Essay Greek Mythology</span>
                <CaretRight
                  className="text-gray-500"
                  width={14}
                  height={14}
                  weight="bold"
                />
                <span className="text-violet-600">Feedback</span>
              </div>
            </div>
            <div className="space-y-8 !overflow-y-auto">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Feedback Summary</h2>
                <div
                  ref={summaryRef}
                  className="bg-white p-8 rounded-lg space-y-4 text-sm leading-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Egestas pretium aenean pharetra magna ac placerat
                    vestibulum lectus. Enim diam vulputate ut pharetra sit. Nunc
                    faucibus a pellentesque sit amet. Ultrices neque ornare
                    aenean euismod elementum. Ac tortor dignissim convallis
                    aenean et tortor. Augue neque gravida in fermentum. Sit amet
                    mauris commodo quis imperdiet massa tincidunt nunc. Id porta
                    nibh venenatis cras sed felis. Facilisi nullam vehicula
                    ipsum a arcu cursus. Mus mauris vitae ultricies leo. Tortor
                    posuere ac ut consequat semper viverra nam. Donec et odio
                    pellentesque diam. Penatibus et magnis dis parturient montes
                    nascetur ridiculus mus. Ultricies leo integer malesuada nunc
                    vel risus commodo. Felis eget velit aliquet sagittis id
                    consectetur. Id donec ultrices tincidunt arcu non sodales
                    neque. In fermentum et sollicitudin ac orci phasellus. Duis
                    at consectetur lorem donec massa sapien.
                  </p>
                  <p>
                    Suspendisse in est ante in nibh mauris cursus mattis. Et
                    odio pellentesque diam volutpat commodo sed. Risus ultricies
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
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Egestas pretium aenean pharetra magna ac placerat
                    vestibulum lectus. Enim diam vulputate ut pharetra sit. Nunc
                    faucibus a pellentesque sit amet. Ultrices neque ornare
                    aenean euismod elementum. Ac tortor dignissim convallis
                    aenean et tortor. Augue neque gravida in fermentum. Sit amet
                    mauris commodo quis imperdiet massa tincidunt nunc. Id porta
                    nibh venenatis cras sed felis. Facilisi nullam vehicula
                    ipsum a arcu cursus. Mus mauris vitae ultricies leo. Tortor
                    posuere ac ut consequat semper viverra nam. Donec et odio
                    pellentesque diam. Penatibus et magnis dis parturient montes
                    nascetur ridiculus mus. Ultricies leo integer malesuada nunc
                    vel risus commodo. Felis eget velit aliquet sagittis id
                    consectetur. Id donec ultrices tincidunt arcu non sodales
                    neque. In fermentum et sollicitudin ac orci phasellus. Duis
                    at consectetur lorem donec massa sapien.
                  </p>
                  <p>
                    Suspendisse in est ante in nibh mauris cursus mattis. Et
                    odio pellentesque diam volutpat commodo sed. Risus ultricies
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
          </div>
          <ExtractFeedbackSidebar />
        </section>
      </main>
      {isCreateSnippetButtonVisible && (
        <CreateFeedbackSnippetButton
          ref={createSnippetButtonRef}
          position={createSnippetButtonPosition}
          setIsCreateSnippetButtonVisible={setIsCreateSnippetButtonVisible}
          selectedText={selectedText}
        />
      )}
    </div>
  );
};