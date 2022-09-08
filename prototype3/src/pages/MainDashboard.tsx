import { DashboardNav } from "../components/DashboardNav";
import { Header } from "../components/Header";

import { AssignmentItem } from "../components/AssignmentItem";
import { IAssignment } from "../types";
import { Link } from "react-router-dom";

const assignments: IAssignment[] = [
  {
    id: 1,
    course: "Composition - Text Analysis",
    title: "Visual Analysis - Critical Advertisement",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 2,
    course: "US History",
    title: "Heritage and Values of the U.S. Air Force",
    dueDate: "2021-05-01",
    feedbackStatus: "pending",
  },
  {
    id: 3,
    course: "Sociolinguistics",
    title: "Word Choices in Hatespeech",
    dueDate: "2021-05-01",
    feedbackStatus: "pending",
  },
  {
    id: 4,
    course: "Greek",
    title: "The Elements of Greek Grammar",
    dueDate: "2021-05-01",
    feedbackStatus: "received",
  },
  {
    id: 5,
    course: "Biology",
    title: "Basic Concepts of Genetic Analysis",
    dueDate: "2021-05-01",
    feedbackStatus: "received",
  },
  {
    id: 6,
    course: "German",
    title: "Classics of German Cinema: From Haunted Screen to Hyperreality",
    dueDate: "2021-05-01",
    feedbackStatus: "received",
  },
];

export const MainDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-8">
        <section className="flex flex-col items-start max-w-7xl m-auto space-y-8">
          <DashboardNav />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto w-full">
            {assignments.map((assignment) => {
              return (
                <Link
                  key={assignment.id}
                  to={`/submission/${assignment.id}/feedback`}>
                  <AssignmentItem assignment={assignment} />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
