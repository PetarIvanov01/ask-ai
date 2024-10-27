import React, { useState } from "react";

import {
  deleteChatAction,
  renameChatAction,
  restartChatAction,
} from "../actions";

import Modal from "@/src/components/modal";

type Props = {
  chatId: string;
  chatName: string;
  isRestartModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isRenameInputOpen: boolean;
  setRenameInputOpen: (bol: boolean) => void;
  setDeleteModalOpen: (bol: boolean) => void;
  setRestartModalOpen: (bol: boolean) => void;
};

export default function ChatDialogActions({
  chatId,
  chatName,
  isDeleteModalOpen,
  isRestartModalOpen,
  isRenameInputOpen,
  setRenameInputOpen,
  setDeleteModalOpen,
  setRestartModalOpen,
}: Props) {
  const [inputName, setInputName] = useState(chatName);

  const confirmDeleteChat = async () => {
    await deleteChatAction(chatId);
    setDeleteModalOpen(false);
  };

  const confirmRestartChat = async () => {
    await restartChatAction(chatId);
    setRestartModalOpen(false);
  };

  const confirmRenameChat = async () => {
    if (inputName === "") {
      return;
    }

    await renameChatAction(chatId, inputName);
    setRenameInputOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Chat"
        description={
          <p>
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </p>
        }
        confirmBtn={{ text: "Delete" }}
        cancelBtn={{ text: "Cancel" }}
        onConfirm={confirmDeleteChat}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <Modal
        isOpen={isRestartModalOpen}
        title="Restart Chat"
        description={
          <p>
            Are you sure you want to restart this chat? All current progress
            will be lost.
          </p>
        }
        confirmBtn={{ text: "Restart" }}
        cancelBtn={{ text: "Cancel" }}
        onConfirm={confirmRestartChat}
        onCancel={() => setRestartModalOpen(false)}
      />

      <Modal
        isOpen={isRenameInputOpen}
        title="Rename Chat"
        confirmBtn={{
          text: "Rename",
          bgColor: "bg-blue-600",
          hoverColor: "bg-blue-700",
        }}
        cancelBtn={{ text: "Cancel" }}
        onConfirm={confirmRenameChat}
        onCancel={() => setRenameInputOpen(false)}
      >
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
          placeholder="Enter new chat name"
        />
        <div className="mt-4">
          <p className="text-gray-300">Choose a new icon:</p>
          {/* Render icon options here */}
        </div>
      </Modal>
    </>
  );
}
