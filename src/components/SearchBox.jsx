import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

//
const SearchBox = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(q.length > 0 ? `/search?query=${q}` : `/search?query=all`);
  };
  return (
    <div className="searchBox mb-4">
      <form className="flex items-center ">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          className="bg-img px-1 py-2 grow focus:outline-none text-black "
        />
        <button onClick={handleSearch} className="bg-secondary px-2 py-2">
          <BiSearchAlt className="text-2xl text-white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
