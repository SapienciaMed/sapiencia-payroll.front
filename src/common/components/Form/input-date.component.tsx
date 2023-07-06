import React, { useEffect, useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { HiOutlineCalendar } from "react-icons/hi";
import { DateTime } from "luxon";

interface IDateProps<T> {
  idInput: string;
  register?: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  value?: string | Date | Date[];
  label?: string;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: FieldErrors<any>;
  setValueRegister?: UseFormSetValue<T>;
  setValue?: React.Dispatch<any>;
  stateProps?: {
    state: any;
    setState: React.Dispatch<any>;
  };
  disabled?: boolean;
}

function LabelElement({ label, idInput, classNameLabel }): React.JSX.Element {
  if (!label) return <></>;
  return (
    <LabelComponent
      htmlFor={idInput}
      className={classNameLabel}
      value={label}
    />
  );
}

function CalendarElement({
  idInput,
  className,
  placeholder,
  value,
  register,
  setValueRegister,
  setValue,
  stateProps,
  disabled,
}:IDateProps<any>): React.JSX.Element {
  const [date, setDate] = useState<DateTime>(value);
  const registerProp = register ? register : () => {};

  useEffect(() => {
    const setValueRegisterProp = setValueRegister ? setValueRegister : () => {};
    setValueRegisterProp(idInput, date);
  }, [date]);
  return (
    <div {...registerProp(idInput)}>
      <Calendar
      dateFormat="dd/mm/yy"
      name={idInput}
      value={date}
      onChange={(e) => {
        if(setValueRegister){
          setDate(new Date(e.value as string).toLocaleDateString())
        }else{
          setDate(e.value);
        }
         
      }}
        placeholder={placeholder}
        className={className}
        showIcon
        icon={
          <span>
            <HiOutlineCalendar />
          </span>
        }
        showButtonBar
        disabled={disabled}
      />
    </div>
  );
}

export function DatePickerComponent({
  idInput,
  register,
  setValueRegister,
  className = "select-basic",
  placeholder = "DD/MM/AAAA",
  value = null,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors = {},
  stateProps,
  setValue,
  disabled,
}: IDateProps<any>): React.JSX.Element {
  return (
    <div
      className={
        errors[idInput]?.message
          ? `${direction} container-icon_error`
          : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div>
        <CalendarElement
          idInput={idInput}
          className={className}
          setValue={setValue}
          placeholder={placeholder}
          value={value}
          register={register}
          setValueRegister={setValueRegister}
          stateProps={stateProps}
          disabled={disabled}
        />
        {errors[idInput]?.message && <span className="icon-error"></span>}
      </div>
      {errors[idInput]?.message && (
        <p className="error-message bold not-margin-padding">
          {errors[idInput]?.message}
        </p>
      )}
      {children}
    </div>
  );
}
