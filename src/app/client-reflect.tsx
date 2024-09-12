"use client";

import "reflect-metadata";
import { ReactNode } from "react";

export default function ClientExportReflect({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
