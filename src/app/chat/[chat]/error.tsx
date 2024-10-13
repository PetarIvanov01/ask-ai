"use client";
import { useRouter } from "next/navigation";

const ErrorPage = ({ errorMessage }: { errorMessage?: string }) => {
  const router = useRouter();
  console.log("HERE");

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-dark-gray-2 text-gray-100">
      <div className="bg-darker-gray shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Chat Not Found</h1>
        <p className="text-gray-300 mb-6">
          {errorMessage ||
            "Oops! The chat you're trying to access doesn't exist or is invalid."}
        </p>
        <button
          onClick={handleGoBack}
          className="bg-gray-3 hover:bg-gray-4 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Go Back to Safety
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
