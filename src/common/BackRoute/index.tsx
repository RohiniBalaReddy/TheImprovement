import { useRouter } from 'next/navigation';
import React from 'react'
import { MdArrowBack } from 'react-icons/md';

const BackRoute = () => {
    const router = useRouter();
    return (
        <div className='relative flex flex-row gap-2 justify-start items-center'>
            <div>
                <MdArrowBack />
            </div>
            <div
                onClick={() => router.back()}
                className="flex flex-row gap-2 items-center cursor-pointer"
            >
                <span className="font-Gordita-Medium text-[12px] md:text-[16px]">Back</span>
            </div>
        </div>
    )
}

export default BackRoute