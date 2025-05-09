import React from "react";
import { ModeToggle } from "./ui/ModeToggle";
import { User } from "lucide-react";
import SearchButton from "./ui/searchButton";
import { DoorOpen, DoorClosed } from "lucide-react";

export default function Header({ isSideBarOpen, setIsSideBarOpen }) {
  return (
    <div className="bg-background flex items-center justify-between px-5 py-2 h-[10vh] border-b sticky top-0 left-0 z-50">
      <div className="flex gap-5 items-center">
        {isSideBarOpen ? (
          <DoorOpen onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="border size-[35px] p-1 hover:bg-primary-foreground cursor-pointer" />
        ) : (
          <DoorClosed onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="border size-[35px] p-1 hover:bg-primary-foreground cursor-pointer" />
        )}
        <h1 className="text-foreground">Anime Warehouse</h1>
        <SearchButton />
      </div>
      <div className="flex gap-4 items-center h-[80%]">
        <ModeToggle className="cursor-pointer" />
        <User className="cursor-pointer border p-2 size-10 hover:bg-primary-foreground rounded-full" />
      </div>
    </div>
  );
}
