import { Search, X } from "lucide-react";
import React, { useState } from "react";

export default function searchButton() {
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let searchBarWidth = isFocus ? "w-55" : "w-40";

  const handleSearchClear = () => {
    setSearchValue("");
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`border border-accent rounded-xl relative ${searchBarWidth}`}
      style={{ transition: ".3s width" }}
      onFocus={() => setIsFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocus(false);
        }
      }}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="outline-none pl-2 py-1 w-[85%]"
      />
      {!searchValue ? (
        <Search className="absolute top-[50%] translate-y-[-50%] right-[4px] w-[12%] h-[60%] p-[.1rem] rounded-full cursor-pointer hover:bg-white/40" />
      ) : (
        <X
          className="absolute top-[50%] translate-y-[-50%] right-[4px] w-[12%] h-[60%] p-[.1rem] rounded-full cursor-pointer hover:bg-white/40 z-10"
          onMouseDown={handleMouseDown}
          onClick={handleSearchClear}
        />
      )}
    </div>
  );
}
