import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnippetProvider } from "./contexts/SnippetContext";
import { CreateSubmission, MainDashboard, Submission } from "./pages";
import { ExtractFeedback } from "./pages/ExtractFeedback";

export const App = () => {
  return (
    <SnippetProvider>
      <Router>
        <>
          <Routes>
            <Route path="/submission/create" element={<CreateSubmission />} />
            <Route
              path="/submission/:submissionId/feedback"
              element={<ExtractFeedback />}
            />
            <Route path="/submission/:submissionId" element={<Submission />} />
            <Route path="/feedback" element={<MainDashboard />} />
            <Route path="/" element={<MainDashboard />} />
          </Routes>
        </>
      </Router>
    </SnippetProvider>
  );
};
