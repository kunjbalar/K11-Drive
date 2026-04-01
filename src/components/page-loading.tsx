import { LoadingSpinner } from "@/components/loading-spinner";

export function PageLoading(props: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-gray-100">
      <div className="flex max-w-sm flex-col items-center text-center">
        <LoadingSpinner className="mb-4 size-8 text-gray-200" />
        <h1 className="text-xl font-semibold">{props.title}</h1>
        <p className="mt-2 text-sm text-gray-400">{props.description}</p>
      </div>
    </div>
  );
}
