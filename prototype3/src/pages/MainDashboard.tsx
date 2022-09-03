import { DashboardNav } from "../components/DashboardNav";
import { Header } from "../components/Header";

import { AssignmentItem } from "../components/AssignmentItem";
import { IAssignment } from "../types";
import { Link } from "react-router-dom";

const assignments: IAssignment[] = [
  {
    id: 1,
    course: "Greek History 101",
    title: "The Peloponnesian War",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 2,
    course: "Roman History 101",
    title: "The Punic Wars",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 3,
    course: "Latin: The Language of the Romans",
    title: "The Declension of Nouns",
    dueDate: "2021-05-01",
    feedbackStatus: "pending",
  },
  {
    id: 4,
    course: "Greek History 101",
    title: "The Peloponnesian War",
    dueDate: "2021-05-01",
    feedbackStatus: "received",
  },
  {
    id: 5,
    course: "Greek History 101",
    title: "The Peloponnesian War",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 6,
    course: "Roman History 101",
    title: "The Punic Wars",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 7,
    course: "Latin: The Language of the Romans",
    title: "The Declension of Nouns",
    dueDate: "2021-05-01",
    feedbackStatus: "pending",
  },
  {
    id: 8,
    course: "Greek History 101",
    title: "The Peloponnesian War",
    dueDate: "2021-05-01",
    feedbackStatus: "received",
  },
  {
    id: 9,
    course: "Greek History 101",
    title: "The Peloponnesian War",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 10,
    course: "Roman History 101",
    title: "The Punic Wars",
    dueDate: "2021-05-01",
    feedbackStatus: "new",
  },
  {
    id: 11,
    course: "Latin: The Language of the Romans",
    title: "The Declension of Nouns",
    dueDate: "2021-05-01",
    feedbackStatus: "pending",
  },
  {
    id: 12,
    course: "Greek History 101",
    title: "The Peloponnesian War",
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
