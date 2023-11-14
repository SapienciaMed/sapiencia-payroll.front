import React from "react";
import { DateTime } from "luxon";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { Controller, Control, useController } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { IoCalendarOutline } from "react-icons/io5";

interface IDateProps<T> {
  idInput: string;
  control: Control<any>;
  dateFormat: string;
  className?: string;
  placeholder?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  disabledDays?: number[];
  disabledDates?: Date[];
  maxDate?: Date;
  minDate?: Date;
  fieldArray?: boolean;
  optionsRegister?: {};
  shouldUnregister?: boolean;
  view?: "date" | "month" | "year";
  onChange?: (e: any) => void;
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

export function DatePickerComponent({
  idInput,
  className = "dataPicker-basic",
  placeholder = "DD/MM/AAAA",
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  // errors = {},
  maxDate,
  minDate,
  fieldArray,
  control,
  dateFormat,
  disabled,
  disabledDates,
  disabledDays,
  optionsRegister,
  shouldUnregister,
  view = "date",
  onChange,
}: IDateProps<any>): React.JSX.Element {
  const {
    field,
    fieldState: { error, invalid },
    formState: {},
  } = useController({
    name: idInput,
    control,
    shouldUnregister,
    rules: optionsRegister,
  });

  return (
    <div
      className={
        error?.message ? `${direction} container-icon_error` : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div>
        <Calendar
          id={field.name}
          name={field.name}
          inputId={field.name}
          mask="99/99/9999"
          dateFormat={dateFormat}
          placeholder={placeholder}
          className={`${className} ${error?.message ? "p-invalid" : ""}`}
          showIcon
          icon={
            <span>
              <IoCalendarOutline />
            </span>
          }
          showButtonBar
          value={field.value && new Date(field.value)}
          onChange={(e) => {
            const formattedDate = DateTime.fromJSDate(e.value).toFormat(
              "yyyy/MM/dd"
            );

            field.onChange(formattedDate);
            if (onChange) onChange(e);
          }}
          onBlur={(e) => field.onBlur()}
          inputStyle={{ borderRight: "none" }}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          disabledDays={disabledDays}
          disabled={disabled}
          view={view}
        />
        {error?.message && <span className="icon-error"></span>}
      </div>
      {error?.message && (
        <p className="error-message bold not-margin-padding">
          {error?.message}
        </p>
      )}
      {children}
    </div>
  );
}
