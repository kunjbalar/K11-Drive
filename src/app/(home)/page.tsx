import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-12 text-center md:py-20">
      <span className="mb-6 inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/70 px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-300">
        Secure cloud storage for your files
      </span>
      <h1 className="mb-5 bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
        K11 Drive
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
        Store, organize, and access your documents from anywhere with a fast and
        reliable drive built for modern workflows.
      </p>
      <form
        action={async () => {
          "use server";

          const session = await auth();

          if (!session.userId) {
            return redirect("/sign-in");
          }

          return redirect("/drive");
        }}
      >
        <Button
          size="lg"
          type="submit"
          className="h-12 rounded-xl border border-neutral-700 bg-neutral-100 px-8 text-base font-semibold text-neutral-900 shadow-lg shadow-neutral-950/20 transition-all duration-200 hover:scale-[1.01] hover:bg-white"
        >
          Open K11 Drive
        </Button>
      </form>
      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 text-left text-sm text-neutral-300 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          Fast uploads
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          Organized folders
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          Access anywhere
        </div>
      </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} K11 Drive. All rights reserved.
      </footer>
    </div>
  );
}