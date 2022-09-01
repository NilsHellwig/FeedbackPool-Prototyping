export interface IAssignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  feedbackStatus: "new" | "pending" | "received";
}
