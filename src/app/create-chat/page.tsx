import MainLayout from "../main-layout";
import CreateChatForm from "./form";

import { getSession } from "@/core/interface-adapters/controllers/authentication/session.controller";
export default async function CreatePage() {
  const session = await getSession();

  return (
    <MainLayout username={session.username}>
      <CreateChatForm />
    </MainLayout>
  );
}
