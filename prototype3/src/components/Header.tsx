import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
      <Link to="/">
        <img
          className="h-8 w-auto"
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="logo"
        />
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li className="text-slate-800 cursor-pointer">My Account</li>
        </ul>
      </nav>
    </header>
  );
};
