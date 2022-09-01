import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSubmission, MainDashboard, Submission } from "./pages";

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <Routes>
          <Route path="/submission/create" element={<CreateSubmission />} />
          <Route path="/submission/:submissionId" element={<Submission />} />
          <Route path="/feedback" element={<MainDashboard />} />
          <Route path="/" element={<MainDashboard />} />
        </Routes>
      </>
    </Router>
  );
};
