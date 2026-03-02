import { SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12 text-center md:py-20">
      <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-2xl shadow-neutral-950/30">
        <h1 className="mb-3 bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent">
          Welcome to K11 Drive
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-400">
          Sign in to securely access your files and folders.
        </p>
        <SignInButton forceRedirectUrl={"/drive"} mode="modal">
          <Button
            type="button"
            className="h-11 w-full rounded-xl border border-neutral-700 bg-neutral-100 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white"
          >
            Continue with Clerk
          </Button>
        </SignInButton>
      </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} K11 Drive. All rights reserved.
      </footer>
    </div>
  );
}