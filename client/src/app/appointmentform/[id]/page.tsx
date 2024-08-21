import VisitorForm from '@/components/VisitorForm';
import Image from 'next/image';
import React from 'react'

const AppointmentPage = () => {
  return (
    <div className='w-full flex items-center h-screen bg-[url("/images/login.svg")]'>
        <div  className='lg:w-2/5 '></div>
        <div className='w-full lg:w-3/5 bg-white  h-full flex items-center justify-center'>
        <VisitorForm/>
        </div>
    </div>
  )
}

export default AppointmentPage;