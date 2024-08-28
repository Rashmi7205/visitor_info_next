"use client";
import Lottie from "lottie-react";
import succssAnimation from "../../../../public/animations/success.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Button } from "@/components/ui/button";
import { json } from "stream/consumers";
import Image from "next/image";
import { User } from "lucide-react";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VisitApproved = () => {
  const [approved, setApproved] = useState(false);
  const [date ,onChange] = useState<Date | null>(new Date());
  const { id } = useParams();
  const [visitor,setVisitor] = useState({
    id:"",
    name: "",
    email: "",
    mobile: "",
    contact_person:"",
    gov_id:"",
    documents:[],
    visit_purpose:"",
    no_of_visitors:"",
    captured_image_path:"",
  });

  const router = useRouter()

  //approve visit
  const approveVisit = async () => {
    try {
      if (!id || !date) {
        toast("Something Went Wrong!");
        return;
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visitor/approve-visit/${id}`
      ,{
        date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      });
      if (data.success) {
        setApproved(true);
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  //get visitor details
  const getVisitorDetails = async () => {
    try {
       const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/visitor/${id}`);
        if(data.success){
          const res = data.data;
          setVisitor({
            id: res.id,
            name: res.name,
            email: res.email,
            mobile: res.mobile,
            contact_person: res.contact_person,
            gov_id: res.gov_id,
            documents: JSON.parse(res.documents),
            visit_purpose: res.visit_purpose,
            no_of_visitors: res.no_of_visitors,
            captured_image_path: res.captured_image_path,
          });
          if(data.data.approved){
            toast.success("This Visit Already Approved");
            setApproved(true);
          }
        }
        else{
            router.push("/error")
        }
    } catch (error) {
            router.push("/error");
      console.log(error);
    }
  }
  useEffect(()=>{
    getVisitorDetails();
  },[]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      {!approved ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[900px] mx-auto">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Visitor Information
          </h2>
          <div className="flex flex-wrap gap-4">
            {visitor.captured_image_path ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${visitor.captured_image_path}`}
                alt="Captured Image"
                className="max-w-full h-auto block mb-6 rounded-md shadow-sm"
                width={200}
                height={200}
              />
            ) : (
              <User
              className="h-[150px] w-[150px] p-5 border rounded-md"
              />
            )}
            <div className="border-2 flex flex-col p-3 rounded-md">
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">ID:</span>
                {visitor.id}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Name:</span> {visitor.name}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Email:</span> {visitor.email}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Mobile:</span> {visitor.mobile}
              </p>
            </div>
            <div className="border-2 flex flex-col p-3 rounded-md">
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Contact Person:</span>{" "}
                {visitor.contact_person}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Government ID:</span>{" "}
                {visitor.gov_id}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Visit Purpose:</span>{" "}
                {visitor.visit_purpose}
              </p>
              <p className="mb-2 w-full border p-1 rounded-md">
                <span className="font-semibold">Number of Visitors:</span>{" "}
                {visitor.no_of_visitors}
              </p>
            </div>
            {/* Visitor Information */}
            <div className="border flex flex-col p-3 rounded-md">

            <p className="font-semibold mb-2 w-full border p-1 rounded-md">Documents:</p>
            {visitor.documents.length ? (
              visitor.documents?.map((doc, index) => (
                <div key={index} className="mb-3">
                  <a
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${doc}`}
                    download={doc}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                    Download Attachment {index + 1}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-600">None</p>
            )}
            </div>
          </div>

          <p className="text-gray-600 mb-6 text-center">
            Please select a date and time to approve the visitor's appointment.
          </p>

          <DateTimePicker
            onChange={onChange}
            value={date}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <Button
            className="bg-green-600 w-full py-2 mt-6 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            onClick={approveVisit}
          >
            Approve Visit
          </Button>
        </div>
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
            This visit has been successfully approved. Thank you for completing
            the approval process.
          </p>
          <div className="mt-6 text-center">
            <Link href={`/pass/${id}`} className="text-blue-500 hover:underline">
              Download Visitor Pass
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitApproved;
