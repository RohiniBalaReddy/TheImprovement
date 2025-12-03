import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectBtnGrpProps {
    options: any[];
    label?: string;
    labelCls?: string;
    className?: string;
    btnClass?: string;
    onSelectChange?: (selectedOption: string | object) => void;
    defaultValue?: string | object;
    slant?: boolean;
    error?: string;
    errorCls?: string;
    required?: boolean
}

const SelectBtnGrp: React.FC<SelectBtnGrpProps> = ({
    error,
    errorCls,
    options,
    label,
    labelCls,
    className,
    btnClass,
    onSelectChange,
    defaultValue,
    slant,
    required
}) => {
    const [selectedOption, setSelectedOption] = useState<string | object | null>(defaultValue || null);

    useEffect(() => {
        setSelectedOption(defaultValue ?? null);
    }, [defaultValue]);


    const handleSelect = (option: string | object) => {
        setSelectedOption(option);

        if (onSelectChange) {
            onSelectChange(option);
        }
    };

    const getOptionLabel = (option: string | { name: string; icon?: React.ReactNode }) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.name) {
            return (
                <div className='flex flex-col max-w-[80px] md:min-w-[50px] gap-2'>
                    <div>
                        {option.icon && <span className="mr-2">{option.icon}</span>}
                    </div>
                    <p className={`md:text-[12px] text-[10px] font-Gordita-Medium  ${isSelected(option)
                        ? 'text-white'
                        : 'text-black'}`}>{option.name}</p>
                </div>
            );
        }
        return null;
    };

    const isSelected = (option: string | object) => {
        if (typeof option === 'string') {
            return selectedOption === option;
        }
        if (typeof selectedOption === 'object') {
            return typeof selectedOption === 'object' && selectedOption && (selectedOption as any).name === (option as any).name;
        }
        return typeof option === 'object' && selectedOption && (selectedOption === (option as any).name);
    };

    return (
        <>
            <p className={twMerge('label-text font-Gordita-Medium relative text-gray-600 md:mb-2 mb-1', labelCls)}>
                {label} {required && <span className="text-red-500 text-[10px] absolute top-0">*</span>}
            </p>
            <div className={twMerge('flex ', className)}>
                {options?.length > 0 && options.map((option, index) => (
                    <button
                        key={index}
                        className={twMerge(
                            `relative md:text-[16px] text-[10px] px-4 py-[6px] border  mb-2 transition duration-300 ease-in-out hover:bg-gray-200`,
                            isSelected(option)
                                ? 'bg-[#2872a1]  text-white hover:bg-[#2872a1]'
                                : 'bg-white text-black border-gray-300',
                            btnClass
                        )}
                        style={{
                            transform: slant ? 'skewX(-20deg)' : 'skewX(0deg)',
                        }}
                        onClick={() => handleSelect(option)}
                    >
                        <span
                            style={{
                                display: 'block',
                                transform: slant ? 'skewX(20deg)' : 'skewX(0deg)',
                            }}
                        >
                            {getOptionLabel(option)}
                        </span>
                    </button>
                ))}
            </div>
            {error && (
                <p className={twMerge('text-red-500 md:text-[12px] text-[10px] font-Gordita-Medium  ', errorCls)}>
                    {error}
                </p>
            )}
        </>
    );
};

export default SelectBtnGrp;
