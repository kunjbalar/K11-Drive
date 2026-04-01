import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PendingSubmitButton } from "@/components/pending-submit-button";
import { QUERIES, MUTATIONS } from "@/server/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-gray-100">
        <form
          className="w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-900/80 p-6 text-center shadow-xl"
          action={async () => {
            "use server";
            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            const rootFolderId = await MUTATIONS.onboardUser(session.userId);

            return redirect(`/f/${rootFolderId}`);
          }}
        >
          <h1 className="text-xl font-semibold">Create your drive</h1>
          <p className="mt-2 text-sm text-gray-400">
            We only need a moment to set up your folders.
          </p>
          <PendingSubmitButton
            idleText="Create new Drive"
            pendingText="Creating your drive..."
            className="mt-6 w-full"
            type="submit"
          />
        </form>
      </div>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
