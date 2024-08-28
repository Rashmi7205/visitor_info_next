"use client"
import { Input } from "@/components/ui/input";
import { Phone, SendHorizonal, TrainTrack } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import OTPInput from "react-otp-input";
import ResendOtpBtn from "./ReSendOtpBtn";
const VisitorBtn = () => {
  const [otpGenerated,setOtpGenerated] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [mobile,setMobile] = useState("");
  const[id,setId]=useState("");
  const router = useRouter();


  const generateOtp = async()=>{
    if(!mobile || mobile.length != 10){
     toast.error("Mobile Number Should be 10 Digit");
     return;
    }
    try {
      toast.loading(`Wait Sending Otp to ${mobile}`);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-otp/${mobile}`);
     toast.dismiss();
      if(res.data.success){
        toast.success(`Otp Sent to ${mobile}`)
        setId(res.data.id);
        setOtpGenerated(true);
      }
    } catch (error) {
        console.log(error);
    toast.error("Failed To Send OTP")
      }
  }
  const verifyOtp = async()=>{
    if(!otpInput || otpInput.length != 4){
      toast.error("OTP should be 4 Digit!");
      return ;
    }
    try {
       toast.loading("Wait Verifying Otp");
       const { data } = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
         {
           id,
           otp: otpInput
         }
       );
       toast.dismiss();
       if(data.success){
         toast.success(data.message);
         router.push(`/appointmentform/${id}`);
       }else{
        toast.error(data.message);
       }
    } catch (error) {
        console.log(error);
        toast.error("Failed To Verify OTP");
    }
  }
  const resendOtp = ()=>{
      generateOtp();
  }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="lg:w-full w-4/5  p-3 cursor-pointer text-white font-bold relative text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700">
            <span className="w-full flex items-center">
              Visitors Tap Here To Check In <SendHorizonal className="mx-10" />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Get OTP for visit</DialogTitle>
            <DialogDescription>Get OTP for further process</DialogDescription>
          </DialogHeader>
          {!otpGenerated ? (
            <div className="flex flex-col gap-4 p-4">
              <Label className="flex items-center gap-.5">
                <Phone size={14}/>
                Enter Your Mobile Number
                </Label>
              <Input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <Label>Enter Your Otp</Label>
              <div className="flex flex-row items-center justify-around text-slate-950">
                <OTPInput
                  value={otpInput}
                  onChange={setOtpInput}
                  numInputs={4}
                  inputStyle={
                    {
                      width:"40px",
                      height:"40px",
                    }
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="border border-slate-800 mx-5 rounded-md text-black font-extrabold text-center"
                    />
                  )}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            {!otpGenerated ? (
              <Button
                className="bg-blue-600 hover:bg-blue-800"
                onClick={generateOtp}
              >
                Get OTP
              </Button>
            ) : (
              <>
              <ResendOtpBtn onResend={resendOtp}/>
              <Button
                className="bg-blue-600 hover:bg-blue-800"
                onClick={verifyOtp}
              >
                Verify OTP
              </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

export default VisitorBtn