import Answer from "@/components/chat/Answer";
import Question from "@/components/chat/Question";

export default function ChatPage({
  params,
}: Readonly<{
  params: { chat: string };
}>) {
  let i = 0;
  return (
    <div className="flex flex-col text-sm md:pb-9">
      {Array(10)
        .fill(undefined)
        .map((e) => {
          if (i % 2 === 0) {
            return <Answer index={i} key={i++} />;
          }
          return <Question index={i} key={i++} />;
        })}
    </div>
  );
}
