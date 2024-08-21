"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Camera,
  IdCard,
  Mail,
  NotepadText,
  SendHorizonal,
  Smartphone,
  UploadCloud,
  User,
  UserPlus,
  UserSearch,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const VisitorForm = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { id } = useParams();

  const govtIdProofs = [
    {
      name: "Aadhaar Card",
      issuer: "Unique Identification Authority of India (UIDAI)"
    },
    {
      name: "Passport",
      issuer: "Government of India"
    },
    {
      name: "PAN Card",
      issuer: "Income Tax Department"
    },
    {
      name: "Voter ID Card",
      issuer: "Election Commission of India"
    },
    {
      name: "Driving License",
      issuer: "Regional Transport Office (RTO)"
    },
    {
      name: "Ration Card",
      issuer: "State Government"
    },
    {
      name: "Employee ID Card",
      issuer: "Government or Public Sector Units (PSUs)"
    },
    {
      name: "Pension Card",
      issuer: "Government of India"
    },
    {
      name: "NREGA Job Card",
      issuer: "Ministry of Rural Development"
    },
    {
      name: "Health Insurance Smart Card",
      issuer: "Ministry of Health"
    },
    {
      name: "Bank Passbook with Photograph",
      issuer: "Banks"
    },
    {
      name: "Birth Certificate",
      issuer: "Local Municipal Authorities"
    },
    {
      name: "Arms License",
      issuer: "District Magistrate or State Home Department"
    }
  ]


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    contactPerson: "",
    govId: "",
    visitPurpose: "",
    noOfVisitors: "",
    documents: null as FileList | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    contactPerson: "",
    govId: "",
    visitPurpose: "",
    noOfVisitors: "",
    documents: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files : null,
    }));
  };
  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      mobile: "",
      contactPerson: "",
      govId: "",
      visitPurpose: "",
      noOfVisitors: "",
      documents: "",
    };

    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      newErrors.email = "A valid email is required";
    }
    if (!formData.contactPerson) {
      valid = false;
      newErrors.contactPerson = "Contact person is required";
    }

    if (!formData.govId) {
      valid = false;
      newErrors.govId = "Government ID is required";
    }

    if (!formData.visitPurpose) {
      valid = false;
      newErrors.visitPurpose = "Visit purpose is required";
    }

    if (!formData.noOfVisitors || Number(formData.noOfVisitors) <= 0) {
      valid = false;
      newErrors.noOfVisitors = "Number of visitors must be at least 1";
    }

    if (!formData.documents) {
      valid = false;
      newErrors.documents = "Please upload documents";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(new FormData(e.target));
    if (validate()) {
      // Form is valid, handle the form submission logic

      let imageFile;
      if (capturedImage) {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        imageFile = new File([blob], "captured_image.jpg", {
          type: "image/jpeg",
        });
      }
      try {
        toast.loading("Wait submitting the deatils");
        const userData = new FormData();
        userData.append("name", formData.name);
        userData.append("email", formData.email);
        userData.append("mobile", formData.mobile);
        userData.append("contactPerson", formData.contactPerson);
        userData.append("govId", formData.govId);
        userData.append("visitPurpose", formData.visitPurpose); // Correctly add visitPurpose
        userData.append("noOfVisitors", formData.noOfVisitors);
        if (formData.documents instanceof FileList) {
          Array.from(formData.documents).forEach((file) => {
            userData.append("documents", file);
          });
        } else if (formData.documents instanceof File) {
          userData.append("documents", formData.documents);
        }

        // Handle captured image
        if (imageFile) {
          userData.append("capturedImage", imageFile);
        }

        // Send the request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/visitor/create/${id}`,
          userData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.dismiss();
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }
      // Reset the form after submission (optional)
      setFormData({
        name: "",
        email: "",
        mobile: "",
        contactPerson: "",
        govId: "",
        visitPurpose: "",
        noOfVisitors: "",
        documents: null,
      });
      setErrors({
        name: "",
        email: "",
        mobile: "",
        contactPerson: "",
        govId: "",
        visitPurpose: "",
        noOfVisitors: "",
        documents: "",
      });
      setCapturedImage(null);
    }
  };
  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the webcam: ", err);
      }
    }
  };
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured_image.jpg", {
              type: "image/jpeg",
            });
            setCapturedImage(URL.createObjectURL(file));
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
              setStream(null);
            }
          }
        });
      }
    }
  };
  const retakeImage = () => {
    setCapturedImage(null);
    // Restart the camera stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((newStream) => {
          setStream(newStream);
          if (videoRef.current) {
            videoRef.current.srcObject = newStream;
          }
        })
        .catch((err) => {
          console.error("Error accessing the webcam: ", err);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="max-w-xl mx-auto  p-6 bg-white  shadow-lg border rounded-lg flex  flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-center mt-[150px] lg:mt-0 mb-3">
        Visitor Information
      </h2>
      <p className="text-sm text-purple-400 font-bold ">
        Fill Out All The Fields
      </p>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="md:grid lg:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <Label htmlFor="name" className="flex gap-0.5 my-2 items-center">
            <User size={15} />
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <Label className="flex gap-0.5 my-2 items-center" htmlFor="email">
            <Mail size={15} />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        {/* <div>
          <Label className="flex gap-0.5 my-2 items-center" htmlFor="mobile">
            <Smartphone size={15} />
            Mobile
          </Label>
          <Input
            id="mobile"
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div> */}

        {/* Contact Person */}
        <div>
          <Label
            className="flex gap-0.5 my-2 items-center"
            htmlFor="contactPerson"
          >
            <UserSearch size={15} />
            Contact Person
          </Label>
          <Input
            id="contactPerson"
            type="text"
            placeholder="Enter contact person's name"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm">{errors.contactPerson}</p>
          )}
        </div>

        {/* Government ID */}
        <div>
          <Label className="flex gap-0.5 my-2 items-center" htmlFor="govId">
            <IdCard size={15} />
            Government ID Details
          </Label>
          <Select onValueChange={(val)=>{
            setFormData({
              ...formData,
              govId:val
            })
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select Id Proof" />
            </SelectTrigger>
            <SelectContent>
              {
                govtIdProofs.map((id)=><SelectItem key={id.name} value={id.name} className="py-0.5">
                     <p className="text-bold w-full">{id.name}</p>
                     <p className="text-xs w-full text-gray-400">{id.issuer}</p>
                </SelectItem>)
              }
            </SelectContent>
          </Select>
          {errors.govId && (
            <p className="text-red-500 text-sm">{errors.govId}</p>
          )}
        </div>

        {/* Visit Purpose */}
        <div>
          <Label
            className="flex gap-0.5 my-2 items-center"
            htmlFor="visitPurpose"
          >
            <NotepadText size={15} />
            Purpose of Visit
          </Label>
          <Textarea
            id="visitPurpose"
            placeholder="Enter the purpose of your visit"
            value={formData.visitPurpose}
            name="visitPurpose"
            onChange={handleChange}
          />
          {errors.visitPurpose && (
            <p className="text-red-500 text-sm">{errors.visitPurpose}</p>
          )}
        </div>

        {/* Number of Visitors */}
        <div>
          <Label
            className="flex gap-0.5 my-2 items-center"
            htmlFor="noOfVisitors"
          >
            <UserPlus size={15} />
            Number of Visitors
          </Label>
          <Input
            id="noOfVisitors"
            type="number"
            placeholder="Enter number of visitors"
            value={formData.noOfVisitors}
            name="noOfVisitors"
            onChange={handleChange}
          />
          {errors.noOfVisitors && (
            <p className="text-red-500 text-sm">{errors.noOfVisitors}</p>
          )}
        </div>

        {/* Document Upload */}
        <div>
          <Label className="flex gap-0.5 my-2 items-center" htmlFor="documents">
            <UploadCloud size={15} />
            Upload Documents
          </Label>
          <Input
            id="documents"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          {errors.documents && (
            <p className="text-red-500 text-sm">{errors.documents}</p>
          )}
        </div>
        {/* Image Capture */}
        <Dialog>
          <DialogTrigger>
            <Label className="flex gap-0.5 my-0.5 items-center">
              <Camera size={15} />
              Capture Image
            </Label>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Label className="flex gap-0.5 my-0.5 items-center">
                <Camera size={15} />
                Capture Image
              </Label>

              {capturedImage ? (
                <div className="flex flex-col items-center justify-around">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full max-w-xs border rounded-md mb-2"
                  />
                  <div className="w-full flex items-center justify-around">
                    <Button
                      className="bg-red-500"
                      type="button"
                      onClick={retakeImage}
                    >
                      Retake Image
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" className="bg-blue-600">
                        Ok
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              ) : (
                <div className="flex  flex-col items-center justify-around">
                  <video
                    ref={videoRef}
                    className="w-full max-w-xs border rounded-md mb-2"
                    autoPlay
                    playsInline
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                    width="640"
                    height="480"
                  ></canvas>
                  <div className="flex items-center justify-around gap-2">
                    <Button
                      type="button"
                      onClick={startCamera}
                      className="bg-blue-600 w-full"
                    >
                      Take Picture
                    </Button>
                    <Button
                      type="button"
                      onClick={captureImage}
                      className="bg-blue-600 w-full"
                    >
                      Capture Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Submit Button */}
        <div className="text-center col-span-2">
          <Button type="submit" className="w-full flex gap-0.5 bg-blue-600">
            Submit <SendHorizonal size={14} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
