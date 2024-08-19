export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-grow py-2 h-full flex flex-col justify-center items-center w-full">
      <div className="flex w-full h-full flex-grow">
        <div className="h-full w-full">{children}</div>
      </div>
    </section>
  );
}
