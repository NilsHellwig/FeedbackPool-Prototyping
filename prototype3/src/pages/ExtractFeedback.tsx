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
                  className="bg-white p-8 rounded-lg space-y-4 text-sm leading-6 text-justify">
                  <p>
                    Good choice of topic, you made a good effort with room for
                    improvement. Please see my comments in the margin. There is
                    a lot to say about this topic, good that you stuck to the
                    word count. Your topic sentences should be at the start of a
                    paragraph (as in paragraph 2), not at the end (as in
                    paragraph 1). Your paragraphs are connected smoothly, they
                    are separate but still related in topic. In paragraph 1 the
                    description of the visual and campaign is a bit too long,
                    concentrate on the other parts as well, examples and
                    analysis are part of it as well. Paragraph 2 reads better,
                    less description and as well good examples and analysis.
                    Remember that there are more linking words you could use,
                    e.g. additionally, further (more), besides, etc. In the
                    essay, all requirements regarding length, subject visual and
                    word total were met. Paragraph 1 was interesting to read,
                    paragraph 2 not so much, as mass consumerism is pretty
                    obvious. Try to dig into the topic more next time.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Visual Analysis - Critical Advertisement
                  </h2>
                  <span className="text-gray-600 text-sm">
                    Submitted on 04.07.22
                  </span>
                </div>
                <div
                  ref={essayRef}
                  className="bg-white p-8 rounded-lg space-y-4 text-sm leading-6 text-justify">
                  <p>
                    Online payment service PayPal advertises their service and
                    conditions on new billboard posters. Viewing this advert, it
                    makes kind of sense at first, a payment service
                    advertisement for women who like to shop online. By putting
                    yourself in the position of the depicted, some may relate to
                    the situation of sitting in a spread of all the new things
                    you really needed. But when the attention is drawn to the
                    statement “Verrückt?” [‘Crazy?’], it is not immediately
                    clear what is meant. Reading the subtitle make the situation
                    clearer, but, subliminally, the obviously very happy looking
                    woman between a mass of shoes relates to the cliché that
                    every female in the Western civilisation has an alleged shoe
                    obsession. The controversial usage of this cliché in
                    combination with the statement creates the right tension to
                    keep the advert in mind.
                  </p>
                  <p>
                    Also, the advert represents the omnipresent Western
                    materialism and mass consumption. Even though that it is
                    actually positive for an online payment service that buying
                    is not decreasing, the arrangement of that many items not
                    only in the background but everywhere in the picture makes
                    the buying behaviour seem rather excessive. On the other
                    hand, the advert also shows the working economy and the good
                    living conditions the Western society has. Being able to buy
                    such a number of items and having various opportunities to
                    shop from really increases the quality of living.
                    Consequently, the advertisement shows Western buying
                    behaviours and its surroundings in both lights. It seems to
                    be questionable whether it is positive or negative to depict
                    such generalizations and aspects for marketing.
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
