"use client";
import Lottie from "lottie-react";
import succssAnimation from "../../../../public/animations/success.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const VisitApproved = () => {
  const [approved, setApproved] = useState(false);
  const { id } = useParams();
  const approveVisit = async () => {
    try {
      if (!id) {
        toast("Something Went Wrong!");
        return;
      }
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visitor/approve-visit/${id}`
      );
      if (data.success) {
        setApproved(true);
      }
    } catch (err) {
      toast.error("Something Went Wrong");
      console.log(err);
    }
  };

  useEffect(()=>{
    approveVisit();
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!approved ? (
        <p>Wait In process...</p>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-green-600">
            Visit Approved!
          </h1>
          <Lottie
            animationData={succssAnimation}
            loop={true}
            className="w-full h-60"
          />
          <p className="text-center text-gray-700 mt-4">
            This visit has been successfully approved.
          </p>
        </div>
      )}
    </div>
  );
};

export default VisitApproved;
