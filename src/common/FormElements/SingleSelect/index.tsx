import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { IoIosArrowDown } from "react-icons/io";

export interface ISingleSelectProps {
  type: 'single-select';
  name: string;
  label?: string;
  labelCls?: string;
  errorMsg?: string;
  errorCls?: string;
  note?: string;
  noteCls?: string;
  buttonCls?: string;
  optionCls?: string;
  rootCls?: string;
  selectedOptionCls?: string;
  openButtonCls?: string;
  id?: string;
  optionsInterface: { isObj: boolean; displayKey?: string };
  options: Array<any>;
  selectedOption: any;
  required?: boolean;
  handleChange?: (name: string, value: any) => void;

  // NEW:
  placeholder?: string;
  placeholderCls?: string;
}

export default function SingleSelect(props: ISingleSelectProps) {
  const {
    name,
    optionsInterface,
    options,
    selectedOption,
    handleChange,
    label,
    labelCls,
    id,
    rootCls,
    openButtonCls,
    buttonCls,
    errorCls,
    errorMsg,
    note,
    noteCls,
    optionCls,
    selectedOptionCls,
    required,
    placeholder,
    placeholderCls,
  } = props;

  const hasValue = optionsInterface.isObj
    ? !!(selectedOption && optionsInterface.displayKey && selectedOption[optionsInterface.displayKey!]?.toString().trim())
    : selectedOption !== undefined && selectedOption !== null && selectedOption?.toString().trim().length > 0;

  const displayText = optionsInterface.isObj
    ? (hasValue
      ? selectedOption[optionsInterface.displayKey!]
      : (placeholder ?? 'Select an option'))
    : (hasValue
      ? selectedOption
      : (placeholder ?? 'Select an option'));

  return (
    <>
      {label && label.trim().length > 0 && (
        <label
          htmlFor={id}
          className={twMerge(
            clsx({
              'mb-1 inline-block label-text  font-Gordita-Medium text-black ': true,
              'cursor-pointer': id,
            }),
            labelCls
          )}
        >
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </label>
      )}

      <Listbox
        value={selectedOption}
        onChange={(value) => {
          handleChange && handleChange(name, value);
        }}
      >
        {({ open }) => (
          <div
            className={twMerge(
              clsx({ 'relative': true }),
              rootCls
            )}
          >
            <div className="relative flex-1">
              <Listbox.Button
                as="div"
                id={id} // ensure label htmlFor works
                aria-invalid={!!errorMsg}
                className={twMerge(
                  clsx({
                    'relative w-full font-500 flex truncate border rounded-[6px] border-[#C7C2C2] py-1 px-3 text-left focus:outline-none text-[13px] cursor-pointer justify-between items-center': true,
                    'border-[#1d547]': open,
                  }),
                  buttonCls,
                  clsx({
                    [String(openButtonCls)]: open && !!openButtonCls && openButtonCls.trim().length > 0,
                  })
                )}
              >
                <span
                  className={twMerge(
                    clsx({
                      'inline-block font-Gordita-Medium': true,
                      'text-[#333333]': hasValue,
                      'text-gray-400': !hasValue,
                    }),
                    !hasValue ? placeholderCls : undefined
                  )}
                >
                  {displayText}
                </span>
                <IoIosArrowDown className={clsx({ "rotate-180": open })} />
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute mt-1 z-40 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none text-[12px]"
                >
                  {options?.map((optn, optnIdx) => (
                    <Listbox.Option
                      as="div"
                      key={`singleSelect-${optnIdx}`}
                      className={twMerge(clsx({ 'w-full text-[12px]': true }))}
                      value={optn}
                    >
                      {({ selected }) => (
                        <div
                          className={twMerge(
                            clsx({
                              'px-3 py-1 mb-1 hover:bg-[#2872a1] hover:text-slate-100 cursor-pointer': true,
                              'text-gray-800 bg-white': !selected,
                              'text-white bg-[#2872a1]': selected,
                            }),
                            optionCls,
                            clsx({
                              [String(selectedOptionCls)]: selected && !!selectedOptionCls && selectedOptionCls.trim().length > 0,
                            })
                          )}
                        >
                          {optionsInterface.isObj
                            ? (optionsInterface.displayKey ? optn[optionsInterface.displayKey] ?? '' : '')
                            : optn}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>

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
                  clsx({ 'text-red-400 text-xs mt-1 font-Gordita-Regular': true }),
                  errorCls
                )}
              >
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </Listbox>
    </>
  );
}
