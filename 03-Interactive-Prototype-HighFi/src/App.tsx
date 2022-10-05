import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { SnippetProvider } from "./contexts/SnippetContext";
import { CreateSubmission, MainDashboard, Submission } from "./pages";
import { ExtractFeedback } from "./pages/ExtractFeedback";
import { FeedbackDashboard } from "./pages/FeedbackDashboard";

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
            <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
            <Route path="/" element={<MainDashboard />} />
          </Routes>
        </>
      </Router>
    </SnippetProvider>
  );
};
