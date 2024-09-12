import { ReactNode } from "react";

type CardData = Readonly<{
  image: ReactNode;
  title: string;
  options: string[];
}>;

export const cardsData: CardData[] = [
  {
    image: (
      <svg
        width="50"
        height="50"
        viewBox="0 -8 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_1_493)">
          <path
            d="M20.5 18.5C24.6421 18.5 28 15.1421 28 11C28 6.85786 24.6421 3.5 20.5 3.5C16.3579 3.5 13 6.85786 13 11V18.5H20.5Z"
            stroke="#B6F09C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    title: "JavaScript",
    options: [
      "Execution Context",
      "Runtime Environment",
      "Closures",
      "Event Loop",
    ],
  },
  {
    image: (
      <svg
        width="50"
        height="50"
        viewBox="0 -8 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_1_511)">
          <path
            d="M16.3333 6.66667L13.5893 9.41074C13.2638 9.73618 13.2638 10.2638 13.5893 10.5893L16.3333 13.3333M24.6667 6.66667L27.4107 9.41074C27.7362 9.73618 27.7362 10.2638 27.4107 10.5893L24.6667 13.3333M22.1667 5L18.8333 15"
            stroke="#82DBF7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    title: "Asynchronous Programming",
    options: ["Promises", "Async/Await", "Event Loop", "Callbacks"],
  },
  {
    image: (
      <svg
        className="w-max text-center"
        width="50"
        height="50"
        viewBox="-1 -8 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_1_529)">
          <path
            d="M20.3333 5.83334L13.4191 12.7475C13.0441 13.1226 12.8333 13.6313 12.8333 14.1618V14.6667C12.8333 15.7712 13.7288 16.6667 14.8333 16.6667H15.3383C15.8687 16.6667 16.3774 16.456 16.7525 16.0809L23.6667 9.16667M20.3333 5.83334L21.4191 4.74755C22.2002 3.9665 23.4665 3.9665 24.2476 4.74755L24.7525 5.25246C25.5335 6.0335 25.5335 7.29984 24.7525 8.08088L23.6667 9.16667M20.3333 5.83334L23.6667 9.16667"
            stroke="#BD9AF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    title: "Design Patterns",
    options: [
      "Singleton Pattern",
      "Observer Pattern",
      "Factory Pattern",
      "Module Pattern",
    ],
  },
];
