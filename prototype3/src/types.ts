export interface IAssignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  feedbackStatus: "new" | "pending" | "received";
}

export interface IFeedbackSnippet {
  id: number,
  metaData : {text: string, type: string, filter: boolean}[],
  extractedText: string,
  note?: string,
  checked: boolean,
}
