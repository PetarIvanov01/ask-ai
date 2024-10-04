"use client";
import { useState, ReactNode } from "react";

export default function SideNavigation({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(true);
  return (
    <aside className="relative flex py-2 bg-dark-gray-1 rounded-md px-2 h-full">
      <button
        type="button"
        className={`bg-dark-gray-1 group items-center w-fit flex ${
          isOpen ? "opacity-0 w-0 absolute top-1/2" : "opacity-100 w-full"
        }`}
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 scale-x scale-x-[-1] group-hover:ring-1 group-hover:ring-white rounded-lg p-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>

      <div
        className={`flex flex-col transition-width duration-300 ease-in ${
          isOpen
            ? "translate-x-0 min-[240px]:w-[150px] sm:w-[200px]"
            : "-translate-x-full w-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col pt-1 px-1 text-nowrap overflow-hidden mb-10">
          <li className="flex items-center justify-between py-1">
            <p className="uppercase text-sm">General</p>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="block hover:ring-1 hover:ring-white rounded-lg p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </button>
          </li>
        </ul>

        {children}
      </div>
    </aside>
  );
}
