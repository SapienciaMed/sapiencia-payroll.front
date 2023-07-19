import React, { ChangeEvent, useEffect, useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { IoCalendarOutline } from "react-icons/io5";
import { DateTime } from "luxon";
import { calculateDifference } from "../../utils/helpers";

interface IDateProps<T> {
  id?: string;
  idInput: string;
  register?: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  value?: string | Date | Date[];
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  setValueRegister?: UseFormSetValue<T>;
  setValue?: React.Dispatch<any>;
  stateProps?: {
    state: any;
    setState: React.Dispatch<any>;
  };
  disabled?: boolean;
  onchange?: (e: string | Date | Date[]) => void;
  maxDate?: Date;
  minDate?: Date;
  fieldArray?: boolean;
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
  id,
  className,
  placeholder,
  value,
  register,
  setValueRegister,
  setValue,
  stateProps,
  disabled,
  onchange,
  maxDate,
  minDate,
}: IDateProps<any>): React.JSX.Element {
  const [date, setDate] = useState<DateTime>(value);
  const registerProp = register ? register : () => {};

 

  useEffect(() => {
    const setValueRegisterProp = setValueRegister ? setValueRegister : () => {};
    setValueRegisterProp(idInput, date);
    if (setValue) {
      setValue(calculateDifference(date as Date));
    }
  }, [date]);
  return (
    <div {...registerProp(idInput)}>
      <Calendar
        id={id}
        mask="99/99/9999"
        dateFormat="dd/mm/yy"
        name={idInput}
        value={value}
        onChange={(e) => {
          if (onchange) {
            onchange(e.value);
            setDate(e.value);
          } else {
            setDate(e.value);
          }
        }}
        placeholder={placeholder}
        className={className}
        showIcon
        icon={
          <span>
            <IoCalendarOutline />
          </span>
        }
        showButtonBar
        disabled={disabled}
        inputStyle={{ borderRight: "none" }}
        maxDate={maxDate}
        minDate={minDate}
      />
    </div>
  );
}

export function DatePickerComponent({
  id,
  idInput,
  register,
  setValueRegister,
  className = "dataPicker-basic",
  placeholder = "DD/MM/AAAA",
  value,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors = {},
  stateProps,
  setValue,
  disabled,
  onchange,
  maxDate,
  minDate,
  fieldArray,
}: IDateProps<any>): React.JSX.Element {
  const messageError = () => {
    const keysError = idInput.split(".");
    let errs = errors;
    if (fieldArray) {
      const errorKey = `${keysError[0]}[${keysError[1]}].${keysError[2]}`;
      return errors[errorKey]?.message;
    } else {
      for (let key of keysError) {
        errs = errs?.[key];
        if (!errs) {
          break;
        }
      }
      return errs?.message ?? null;
    }
  };
  return (
    <div
      className={
        messageError() ? `${direction} container-icon_error` : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div>
        <CalendarElement
          id={id}
          idInput={idInput}
          className={messageError() ? `${className} error` : className}
          setValue={setValue}
          placeholder={placeholder}
          value={value}
          register={register}
          setValueRegister={setValueRegister}
          stateProps={stateProps}
          disabled={disabled}
          onchange={onchange}
          minDate={minDate}
          maxDate={maxDate}
        />
        {messageError() && <span className="icon-error"></span>}
      </div>
      {messageError() && (
        <p className="error-message bold not-margin-padding">
          {messageError()}
        </p>
      )}
      {children}
    </div>
  );
}
