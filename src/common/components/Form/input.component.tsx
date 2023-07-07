import React from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { MdOutlineError } from "react-icons/md";

interface IInputProps<T> {
  idInput: string;
  typeInput: string;
  register: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: FieldErrors<any>;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
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

function InputElement({
  typeInput,
  idInput,
  className,
  placeholder,
  register,
  value,
  disabled,
  onChange,
  id
}): React.JSX.Element {
  return (
    <input
      {...register(idInput)}
      id={id}
      name={idInput}
      type={typeInput}
      className={className}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export function InputComponent({
  idInput,
  typeInput,
  register,
  className = "input-basic",
  placeholder,
  value,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors,
  disabled,
  onChange,
  id
}: IInputProps<any>): React.JSX.Element {
const [firstPart, secondPart, thirdPart] = idInput.split('.');
const errorKey = `${firstPart}[${secondPart}].${thirdPart}`;
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
      <div className="flex-container-input">
        <InputElement
          typeInput={typeInput}
          idInput={idInput}
          className={errors[errorKey?errorKey:idInput] ? `${className} error` : className}
          placeholder={placeholder}
          register={register}
          value={value}
          disabled={disabled}
          onChange={onChange}
          id={id}
        />
        {errors[errorKey?errorKey:idInput]?.message && (
          <MdOutlineError
            className="icon-error"
            fontSize={"22px"}
            color="#ff0000"
          />
        )}
      </div>
      {errors[errorKey?errorKey:idInput]?.message && (
        <p className="error-message bold not-margin-padding">
          {errors[errorKey?errorKey:idInput]?.message}
        </p>
      )}
      {children}
    </div>
  );
}
