import { useLocation, Link } from "react-router-dom";
import cx from "classnames";

const navItems = [
  {
    name: "Submissions",
    link: "/",
  },
  {
    name: "Feedback-Dashboard",
    link: "/feedback-dashboard",
  },
];

export const DashboardNav = () => {
  const location = useLocation();
  const locationName = location.pathname.split("/")[1] || "submissions";

  return (
    <ul className="bg-white inline-flex p-1 rounded-lg">
      {navItems.map((item) => {
        const isActive = locationName === item.name.toLowerCase();

        return (
          <Link key={item.name} to={item.link}>
            <li
              className={cx("py-2 px-4 rounded", {
                "bg-slate-200": isActive,
              })}>
              {item.name}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
