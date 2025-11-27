import React from 'react';
import Button from '../Button';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }: any) => {
    return (
        <div className="flex items-center justify-center   border border-gray-300 shadow-custom rounded-md md:w-28 px-1 py-1 bg-white  overflow-hidden">
            <Button
                onClick={onDecrease}
                className="md:w-9 md:h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
            >
                <AiOutlineMinus size={18} />
            </Button>

            <div className="md:w-10 md:h-9 p-[2px] flex items-center justify-center md:text-lg text-[14px] font-Gordita-Medium border-x text-gray-800">
                {Math.floor(quantity)}
            </div>

            <Button
                onClick={onIncrease}
                className="md:w-9 md:h-9 flex items-center justify-center md:text-lg text-[14px] font-Gordita-Medium text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
            >
                <AiOutlinePlus size={18} />
            </Button>
        </div>
    );
};

export default QuantitySelector;
