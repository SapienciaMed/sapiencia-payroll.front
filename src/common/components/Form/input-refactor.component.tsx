import React, { useEffect } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import {
  Control,
  Controller,
  UseFormRegister,
  useController,
} from "react-hook-form";

import { MdOutlineError } from "react-icons/md";

interface IInputProps<T> {
  idInput: string;
  typeInput: string;
  control: Control<any>;
  // register?: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  // value?: string | boolean | number;
  // defaultValue?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  fieldArray?: boolean;
  optionsRegister?: {};
  max?: number;
  min?: number;
  checked?: boolean;
  shouldUnregister?: boolean;
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

export function InputComponent({
  idInput,
  typeInput,
  // register,
  className = "input-basic",
  placeholder,
  // value,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  // errors,
  disabled,
  onChange,
  onBlur,
  // defaultValue,
  id,
  // fieldArray,
  control,
  optionsRegister = {},
  shouldUnregister,
  max,
  min,
  checked,
}: IInputProps<any>): React.JSX.Element {
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
      <div className="flex-container-input">
        <input
          // {...(register ? register(idInput, optionsRegister) : {})}
          // defaultValue={defaultValue}
          // value={value}
          id={id}
          type={typeInput}
          className={error?.message ? `${className} error` : className}
          placeholder={placeholder}
          disabled={disabled}
          max={max}
          min={min}
          checked={checked}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        {error?.message && (
          <MdOutlineError
            className="icon-error"
            fontSize={"22px"}
            color="#ff0000"
          />
        )}
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
