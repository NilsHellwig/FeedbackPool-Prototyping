import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSubmission, MainDashboard, Submission } from "./pages";
import { FeedbackDashboard } from "./pages/FeedbackDashboard";

export const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/submission/create" element={<CreateSubmission />} />
          <Route path="/submission/:submissionId" element={<Submission />} />
          <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
          <Route path="/" element={<MainDashboard />} />
        </Routes>
      </>
    </Router>
  );
};
