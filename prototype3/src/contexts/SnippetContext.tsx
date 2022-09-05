import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
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

interface IFeedbackExtractContext {
  snippets: IFeedbackExtract[];
  setSnippets: Dispatch<SetStateAction<IFeedbackExtract[]>>;
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
