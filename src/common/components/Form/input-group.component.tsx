import React from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IInputProps<T> {
  idInput: string;
  typeInput: string;
  register: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  value?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  iconLegend?: React.JSX.Element | string;
  containerClassname?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
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

function InputElement({
  typeInput,
  idInput,
  className,
  placeholder,
  register,
  value,
  iconLegend,
  containerClassname,
  disabled,
  onChange,
  id,
}): React.JSX.Element {
  return (
    <div
      className={
        containerClassname
          ? `container-input-group ${containerClassname}`
          : "container-input-group"
      }
    >
      <span className="input-group-addon text-black bold">{iconLegend}</span>
      <input
        {...register(idInput)}
        name={idInput}
        type={typeInput}
        className={className}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        onChange={onChange}
        id={id}
      />
    </div>
  );
}

export function InputGroupComponent({
  idInput,
  typeInput,
  register,
  className = "input-group-basic",
  placeholder,
  value,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors,
  iconLegend,
  containerClassname,
  disabled,
  onChange,
  id,
  fieldArray,
}: IInputProps<any>): React.JSX.Element {
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
        <InputElement
          typeInput={typeInput}
          idInput={idInput}
          className={messageError() ? `${className} error` : className}
          placeholder={placeholder}
          register={register}
          value={value}
          iconLegend={iconLegend}
          containerClassname={containerClassname}
          disabled={disabled}
          onChange={onChange}
          id={id}
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
