"use client";
import { useState } from "react";
import Modal from "@/src/components/modal";

export default function HeaderControllers({
  createdAt,
  topic,
}: {
  createdAt: Date;
  topic: string;
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-4 pr-2">
        <button
          className="hover:bg-dark-gray-3 rounded-md text-gray-500"
          onClick={() => setShowInfo(true)}
        >
          <IconChatInfo />
        </button>
        <button className="hover:bg-dark-gray-3  rounded-md text-gray-500">
          <IconChatUsers />
        </button>
      </div>
      <Modal
        isOpen={showInfo}
        title="Chat Information"
        description={
          <p>
            <span className="text-gray-400">You are chatting about: </span>
            <span className="font-bold">{topic}</span>
          </p>
        }
        confirmBtn={{
          text: "Close",
          bgColor: "bg-green-dark",
          color: "text-white",
          hoverColor: "bg-green-primary",
        }}
        cancelBtn={{ text: "" }}
        onConfirm={() => setShowInfo(false)}
        onCancel={() => setShowInfo(false)}
      >
        {createdAt && (
          <p className="text-sm text-gray-400 mb-2">
            <strong>Created On:</strong> {createdAt.toLocaleDateString()} at{" "}
            {createdAt.toLocaleTimeString()}
          </p>
        )}
        <p className="text-sm text-gray-400 mb-2">
          <strong>Number of Messages:</strong> {0}
        </p>
      </Modal>
    </>
  );
}
function IconChatInfo() {
  return (
    <svg
      className="svg-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.75C11.8019 16.7474 11.6126 16.6676 11.4725 16.5275C11.3324 16.3874 11.2526 16.1981 11.25 16V11C11.25 10.8011 11.329 10.6103 11.4697 10.4697C11.6103 10.329 11.8011 10.25 12 10.25C12.1989 10.25 12.3897 10.329 12.5303 10.4697C12.671 10.6103 12.75 10.8011 12.75 11V16C12.7474 16.1981 12.6676 16.3874 12.5275 16.5275C12.3874 16.6676 12.1981 16.7474 12 16.75Z"
        fill="#fff"
      />
      <path
        d="M12 9.25C11.8019 9.24741 11.6126 9.16756 11.4725 9.02747C11.3324 8.88737 11.2526 8.69811 11.25 8.5V8C11.25 7.80109 11.329 7.61032 11.4697 7.46967C11.6103 7.32902 11.8011 7.25 12 7.25C12.1989 7.25 12.3897 7.32902 12.5303 7.46967C12.671 7.61032 12.75 7.80109 12.75 8V8.5C12.7474 8.69811 12.6676 8.88737 12.5275 9.02747C12.3874 9.16756 12.1981 9.24741 12 9.25Z"
        fill="#fff"
      />
      <path
        d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
        fill="#fff"
      />
    </svg>
  );
}
function IconChatUsers() {
  return (
    <svg
      className="svg-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 15C21.2091 15 23 16.7909 23 19V21H21M16 10.874C17.7252 10.4299 19 8.86384 19 7C19 5.13617 17.7252 3.57007 16 3.12602M5 15C2.79086 15 1 16.7909 1 19V21H17V19C17 16.7909 15.2091 15 13 15H9M9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11C11.2091 11 13 9.20914 13 7C13 6.27143 12.8052 5.58835 12.4649 5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
