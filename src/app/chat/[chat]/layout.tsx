import { Suspense } from "react";

import LoadingFallback from "./LoadingSkeleton";
import MainLayout from "../../main-layout";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <section className="flex-grow pt-2 h-full flex flex-col justify-center items-center w-full">
        <div className="flex w-full h-full flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <div className="h-full w-full">{children}</div>
          </Suspense>
        </div>
      </section>
    </MainLayout>
  );
}
