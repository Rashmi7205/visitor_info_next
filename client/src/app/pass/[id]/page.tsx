import VisitorIDCard from "@/components/VisitorIdCard";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const HomePage = async ({params}:{params:{id:string}}) => {
  const {id} = params;
  const visitorData = {
    visitorName: "",
    visitorId: "",
    visitPurpose: "",
    contactPerson: "",
    visitDate: "",
  };
  const getVisitorDetails = async ()=>{
    try {
        if(!id){
          toast.error("Something Went Wrong!");
          return;
        }
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/visitor/${id}`);
        if(data.success){
          visitorData.visitorName = data.data.name;
          visitorData.contactPerson=data.data.contact_person;
          visitorData.visitPurpose = data.data.visit_purpose;
          visitorData.visitDate =
          new Date(data.data.visit_date).toLocaleTimeString()+" "+
            new Date(data.data.visit_date).toDateString()
          visitorData.visitorId = data.data.id;
        }
      } catch (error) {
        console.error(error);
    }
  }
  await getVisitorDetails();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <VisitorIDCard {...visitorData} />
    </div>
  );
};

export default HomePage;
