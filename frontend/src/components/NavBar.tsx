import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NavBar() {
  const { toggleDarkMode } = useContext(EntryContext) as EntryContextType;
  return (
    <nav className="flex justify-center gap-5">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={"/"}>
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <button
        onClick={toggleDarkMode}
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500  rounded-md font-medium text-white"
      >
        Toggle Dark Mode
      </button>
    </nav>
  );
}
