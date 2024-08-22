import successAnimation from "../../public/animations/success.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Lottie from "lottie-react";
import Link from "next/link";

const Success = ({ success,handleClick }: { success: boolean | undefined ,handleClick:()=>void}) => {
  return (
    <AlertDialog open={success}>
      <AlertDialogContent className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <AlertDialogHeader className="flex justify-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Submission Success
          </h2>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-0">
          <p className="text-lg font-medium text-gray-700">Thank You</p>
          <Lottie
            animationData={successAnimation}
            loop={true}
            className="w-full h-60"
          />
          <p className="text-center text-gray-600">
            Your Information Submitted Successfully.
          </p>
          <p className="text-center text-gray-600">We Will Reach You Soon.</p>
        </div>
        <AlertDialogFooter className="mt-6 flex flex-col gap-3">
          <AlertDialogCancel
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-center"
            onClick={handleClick}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-center">
            <Link
            href="/"
            >
              Back To Home
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Success;
