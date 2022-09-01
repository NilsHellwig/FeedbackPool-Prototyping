import { DashboardNav } from "../components/DashboardNav";
import { Header } from "../components/Header";
import cx from "classnames";

const assignments = [
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
          <div className="grid grid-cols-4 justify-items-stretch gap-2 space-y-4 overflow-y-auto w-full">
            {assignments.map((assignment) => {
              return (
                <div
                  key={assignment.id}
                  className="flex flex-col justify-between p-4 bg-white border border-slate-200 rounded-lg space-y-12">
                  <div className="flex flex-col items-start space-y-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-violet-100 text-violet-600">
                      {assignment.course}
                    </span>
                    <h3 className="text-xl font-normal">{assignment.title}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">Feedback:</span>
                      <span
                        className={cx(
                          "text-xs font-semibold rounded-full px-2 py-[2px]",
                          {
                            "bg-green-200 text-green-600":
                              assignment.feedbackStatus === "new",
                            "bg-yellow-200 text-yellow-600":
                              assignment.feedbackStatus === "pending",
                            "bg-blue-200 text-blue-600":
                              assignment.feedbackStatus === "received",
                          }
                        )}>
                        {assignment.feedbackStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
