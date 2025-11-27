import React from 'react'
import { TbError404 } from "react-icons/tb";
import withGeneralLayout from '@/components/Layouts/GeneralLayout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/common/Button';

function Fournotfour() {
  const router = useRouter();
  return (
    <div className='min-h-[calc(100vh-56px-436.5px)] md:min-h-[calc(100vh-52px-278.5px)] flex flex-col gap-y-2 items-center justify-center'>
      <TbError404 className='text-slate-700 text-[80px] md:text-[140px] leading-tight' />
      <span className='mb-5'>{"Oops! page not found"}</span>
      <div className='flex gap-10 items-center justify-center'>
        <Button onClick={() => {
          router.back()
        }} className='bg-transparent px-4 py-2 rounded-md border border-gray-600 text-gray-700'>
          Back
        </Button>
        <Link href={`/`}>
          <Button className='bg-gray-600 px-4 py-2 rounded-md border border-transparent text-slate-200'>
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withGeneralLayout(Fournotfour)