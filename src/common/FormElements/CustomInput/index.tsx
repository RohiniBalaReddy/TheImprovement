import clsx from 'clsx';
import React, { DetailedHTMLProps, ReactNode, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface ICustomInputOtherProps {
  label?: string;
  sublabel?: string;
  labelCls?: string;
  sublabelcls?: string;
  note?: string;
  rootCls?: string;
  value?: string | number | any;
  errorMsg?: string;
  name?: string;
  errorCls?: string;
  maxLength?: number;
  noteCls?: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'email' | 'password';
  outerInptCls?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  unitsDropdown?: {
    options: string[];
    value: string | any;
    onChange: (value: string) => void;
  };
}

export type CustomInputRef = HTMLInputElement | HTMLTextAreaElement | any;

export type CustomInputAttributes =
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type ICustomInputProps = DetailedHTMLProps<
  CustomInputAttributes,
  CustomInputRef
> &
  ICustomInputOtherProps;

const RenderInput = ({ type, ...props }: any) => {
  if (type === 'textarea') {
    return <textarea {...props} />;
  }
  return <input {...props} />;
};

const CustomInput = forwardRef<CustomInputRef, ICustomInputProps>(
  function CustomInput(props, ref) {
    const {
      label,
      sublabel,
      sublabelcls,
      type,
      leftIcon,
      rightIcon,
      name,
      rootCls,
      labelCls,
      errorMsg,
      note,
      noteCls,
      outerInptCls,
      className,
      errorCls,
      id,
      required,
      maxLength,
      unitsDropdown,
      ...extraInputProps
    } = props;


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = () => {
      setIsPasswordVisible((prev) => !prev);
    };
    return (
      <div className={twMerge('w-full', rootCls)}>
        <div className='flex flex-col'>
          {label && label.trim().length > 0 && (
            <label
              htmlFor={id}
              className={twMerge(
                clsx({
                  'mb-2 inline-block md:text-sm  text-[12px] font-Gordita-Medium text-[#333333]':
                    true,
                  'cursor-pointer': id,
                }),
                labelCls
              )}
            >
              {label}
              {required && <sup className={'text-red-500'}>*</sup>}
            </label>
          )}

          {sublabel && sublabel.trim().length > 0 && (
            <label
              htmlFor={id}
              className={twMerge(
                clsx({
                  'mb-2 inline-block  text-[#333333]':
                    true,
                  'cursor-pointer': id,
                }),
                sublabelcls
              )}
            >
              {sublabel}
              {required && <sup className={''}>*</sup>}
            </label>
          )}
        </div>
        {type === 'textarea' ? (
          <RenderInput
            ref={ref}
            id={id}
            required={required}
            name={name}
            type={type}
            maxLength={maxLength}
            className={twMerge(
              clsx({
                'w-full border border-solid rounded-[6px] border-[#C7C2C2] focus:border-[#1d547] max-h-28 focus:ring-0 active:outline-none focus:outline-none':
                  true,
                'placeholder:text-[12px] placeholder:font-Gordita-Light placeholder:normal-case placeholder:text-gray-500 ':
                  true,
                'cursor-default': extraInputProps.readOnly,
                'bg-gray-100 cursor-not-allowed': props.disabled,
                [String(className)]: !!className,
              }),
              clsx({
                'border-red-400 focus:border-red-400':
                  !!errorMsg && errorMsg.trim().length > 0,
              })
            )}
            {...extraInputProps}
          />
        ) : (
          <div
            className={twMerge(
              clsx({
                'w-full flex gap-1 bg-white mb-1 bg-none text-[13px] items-center border min-h-[20px] md:min-h-[32px] border-solid rounded-[6px] border-[#C7C2C2] focus-within:border-[#1d547] px-[6px] md:px-2 py-1':
                  true,
              }),
              outerInptCls,
              clsx({
                'border-red-400 focus-within:border-red-400':
                  !!errorMsg && errorMsg.trim().length > 0,
              })
            )}
          >
            {leftIcon ? leftIcon : null}
            <RenderInput
              ref={ref}
              id={id}
              required={required}
              name={name}
              type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
              maxLength={maxLength}
              onKeyPress={(e: any) => {
                if (type === "number" && !/^\d*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (
                  type === 'text' &&
                  e.target.value.length === 1 &&
                  /^[0-9]/.test(e.target.value)
                ) {
                  e.preventDefault?.();
                  return;
                }
                if (typeof extraInputProps.onChange === 'function') {
                  extraInputProps.onChange(e);
                }
              }}
              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                const pastedValue = e.clipboardData.getData('Text');
                if (type === 'text' && /^[0-9]/.test(pastedValue)) {
                  e.preventDefault();
                }
              }}
              className={twMerge(
                clsx({
                  'min-h-full h-fit w-full  border-none bg-transparent text-[13px] focus:border-none focus:ring-0 active:outline-none focus:outline-none rounded-[inherit] ':
                    true,
                  'placeholder:text-[12px]  placeholder:font-Gordita-Light placeholder:normal-case placeholder:text-gray-500 ':
                    true,
                  'pl-2': leftIcon,
                  'pl-1': !leftIcon,
                  'pr-1': !rightIcon,
                  'pr-2': rightIcon,
                  'cursor-default': extraInputProps.readOnly,
                  [String(className)]: !!className,
                  ' cursor-not-allowed': props.disabled,
                })
              )}
              {...extraInputProps}
            />
            {unitsDropdown && (
              <select
                value={unitsDropdown.value}
                onChange={(e) => unitsDropdown.onChange(e.target.value)}
                className="md:text-[13px] text-[12px] bg-blue-300  text-black px-2  pr-4 py-[2px]  -my-4 -mr-2 rounded-[3px] font-Gordita-Medium  border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1d547]"
              >
                <option className=' text-[12px] text-center  font-Gordita-Medium'>Units </option>
                {unitsDropdown.options.map((option) => (
                  <option key={option} value={option} className=' text-[12px] text-center font-Gordita-Medium rounded-[4px]'>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {type === "password" && (
              <div
                className="cursor-pointer"
                onClick={handlePasswordToggle}
                title={isPasswordVisible ? "Hide Password" : "Show Password"}
              >
                {isPasswordVisible ? (
                  <span><Visibility /></span>
                ) : (
                  <span><VisibilityOff /></span>
                )}
              </div>
            )}
            {rightIcon ? rightIcon : null}
          </div>

        )}

        {note && note.trim().length > 0 && (
          <p
            className={twMerge(
              clsx({ 'text-right text-[9px] mb-1 text-gray-700': true }),
              noteCls
            )}
          >
            {note}
          </p>
        )}
        {errorMsg && errorMsg.trim().length > 0 && (
          <p
            className={twMerge(
              clsx({ 'text-red-400 text-xs mt-1 font-Gordita-Regular ': true }),
              errorCls
            )}
          >
            {errorMsg}
          </p>
        )}
      </div>
    );
  }
);

export default CustomInput;