import cx from "classnames";
import { IAssignment } from "../types";

interface AssignmentItemProps {
  assignment: IAssignment;
}

export const AssignmentItem: React.FC<AssignmentItemProps> = ({
  assignment,
}) => {
  return (
    <div className="flex flex-col justify-between p-4 bg-white border border-slate-200 rounded-lg space-y-12 cursor-pointer">
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
            className={cx("text-xs font-semibold rounded-full px-2 py-[2px]", {
              "bg-green-200 text-green-600":
                assignment.feedbackStatus === "new",
              "bg-yellow-200 text-yellow-600":
                assignment.feedbackStatus === "pending",
              "bg-blue-200 text-blue-600":
                assignment.feedbackStatus === "received",
            })}>
            {assignment.feedbackStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
