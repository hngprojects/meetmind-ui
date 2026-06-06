import { headers } from "next/headers";
import { App } from "@/components/common/call/app/app";
import { getAppConfig } from "@/lib/call/utils";

// Candidate-facing call page. The route id is the interview session id and
// becomes the LiveKit room name, so the agent loads the matching interview.
export default async function InterviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);

  return (
    <App
      appConfig={appConfig}
      sessionId={id}
      token={typeof token === "string" ? token : undefined}
    />
  );
}
