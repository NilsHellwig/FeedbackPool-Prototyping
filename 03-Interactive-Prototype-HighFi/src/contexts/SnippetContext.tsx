import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IFeedbackExtract, ILabel } from "../types";

const dummyFeedbackExtracts: IFeedbackExtract[] = [
  {
    id: "1",
    text: "Topic sentence? Should contain your claim (not describe the campaign)",
    author: "James Michael",
    inDashboard: false,
    labels: [],
  },
  {
    id: "2",
    text: "Remember to indent!",
    author: "James Michael",
    inDashboard: false,
    labels: [],
  },
  {
    id: "3",
    text: "Your claim is down here!",
    author: "James Michael",
    inDashboard: false,
    labels: [],
  },
  {
    id: "4",
    text: "There are more elegant linking words out there!",
    author: "James Michael",
    inDashboard: false,
    labels: [],
  },
];

const availableLabels: ILabel[] = [
  {
    id: "77208e73-76a5-41cc-8a8f-fc71e594c0b5",
    text: "Structure",
    type: "label",
  },
  {
    id: "1f13583c-9051-4d6e-843f-68d53b781aaa",
    text: "Formal Error",
    type: "label",
  },
  {
    id: "487abf39-2869-4f26-89e9-6d257abe0e3b",
    text: "Wording",
    type: "label",
  },
  {
    id: "87238dfa-a5fb-43d0-bdc0-69be459899f1",
    text: "Grammar",
    type: "label",
  },
];

interface IFeedbackExtractContext {
  snippets: IFeedbackExtract[];
  setSnippets: Dispatch<SetStateAction<IFeedbackExtract[]>>;
  availableLabels: ILabel[];
}

const SnippetContext = createContext<IFeedbackExtractContext | null>(null);

interface SnippetProviderProps {
  children: React.ReactNode;
}

export const SnippetProvider: React.FC<SnippetProviderProps> = ({
  children,
}) => {
  const [snippets, setSnippets] = useState<IFeedbackExtract[]>(
    dummyFeedbackExtracts
  );

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        setSnippets,
        availableLabels,
      }}>
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (context === null) {
    throw new Error("useSnippets must be used within an SnippetProvider");
  }
  return context;
};
