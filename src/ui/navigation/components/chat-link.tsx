"use client";
import Link from "next/link";

import { ReactNode, useCallback, useState } from "react";
import useClickOutside from "@/src/hooks/useClickOutside";
import useActive from "@/src/hooks/useActive";

import { truncateText } from "@/src/utils/truncateText";

import {
  IconDelete,
  IconOptions,
  IconRename,
  IconRestart,
} from "@/src/components/icons/svg-components";

import ChatDialogActions from "./chat-dialog-actions";

export default function ChatListItem({
  chatId,
  styles,
  title,
  chatName,
  icon,
  href,
  extendable = true,
}: {
  chatId: string;
  title: string;
  chatName: string;
  href: string;
  icon: ReactNode;
  extendable?: boolean;
  styles?: React.CSSProperties;
}) {
  const activeStyle = useActive({ href });
  const [isOptionsOpen, setOptionsOpen] = useState(false);

  const [ref, optionsRef] = useClickOutside<HTMLDivElement>(
    useCallback(() => setOptionsOpen(false), [])
  );

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isRestartModalOpen, setRestartModalOpen] = useState(false);
  const [isRenameInputOpen, setRenameInputOpen] = useState(false);

  const handleRenameChat = () => {
    setRenameInputOpen(true);
  };

  const handleDeleteChat = () => {
    setDeleteModalOpen(true);
  };

  const handleRestartChat = () => {
    setRestartModalOpen(true);
  };

  return (
    <li
      className={`${activeStyle} from-gray-600 hover:bg-darker-gray shadow shadow-dark-gray-1 rounded-lg flex items-center text-white p-2 relative text-sm sm:text-base`}
      style={styles}
    >
      <Link
        className="flex items-center gap-2 sm:gap-4 cursor-pointer text-inherit"
        href={href}
      >
        <div>{icon}</div>
        <span className="overflow-hidden">
          {extendable ? truncateText(chatName) : chatName}
        </span>
      </Link>

      {extendable && (
        <>
          <div
            ref={optionsRef}
            onClick={() => setOptionsOpen((state) => !state)}
            className="ml-auto pr-1 cursor-pointer"
          >
            <IconOptions isOptionsOpen={isOptionsOpen} />
          </div>

          {isOptionsOpen && (
            <div
              ref={ref}
              className="absolute right-0 top-full mt-2 w-32 sm:w-40 bg-dark-gray-3 shadow-lg rounded-lg py-2 z-10"
            >
              <button
                onClick={handleRestartChat}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-100 hover:bg-gray-4 transition-colors duration-200"
              >
                Restart Chat <IconRestart />
              </button>
              <button
                onClick={handleRenameChat}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-100 hover:bg-gray-4 transition-colors duration-200"
              >
                Rename <IconRename />
              </button>
              <button
                onClick={handleDeleteChat}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-xs sm:text-sm text-red-500  hover:bg-gray-4 transition-colors duration-200"
              >
                Delete Chat <IconDelete color="#ef4444" />
              </button>
            </div>
          )}

          <ChatDialogActions
            {...{
              chatId,
              chatName,
              isRenameInputOpen,
              setRenameInputOpen,
              isDeleteModalOpen,
              isRestartModalOpen,
              setDeleteModalOpen,
              setRestartModalOpen,
            }}
          />
        </>
      )}
    </li>
  );
}
