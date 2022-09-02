export interface IAssignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  feedbackStatus: "new" | "pending" | "received";
}

export interface IFeedbackExtract {
  id: string;
  text: string;
  comment?: string;
  author: string;
  inDashboard: boolean;
}
