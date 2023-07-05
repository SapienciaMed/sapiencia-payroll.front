import React, { useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

interface IDropdownProps {
  name: string;
  value: string;
}

interface ISelectProps<T> {
  idInput: string;
  register?: UseFormRegister<T>;
  className?: string;
  placeholder?: string;
  data?: Array<IDropdownProps>;
  value?: string;
  label?: string;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: FieldErrors<any>;
  setValue?: React.Dispatch<any>;
  stateProps?: {
    state: any;
    setState: React.Dispatch<any>;
  };
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

function SelectElement({
  idInput,
  className,
  placeholder,
  data,
  value,
  register,
  setValue,
  stateProps,
  disabled,
  onChange
}): React.JSX.Element {
  const registerProp = register ? register : () => {};
  return (
    <Dropdown
      {...registerProp(idInput)}
      value={stateProps ? stateProps.state:''} 
      onChange={(e) => {
        setValue(e.value);
        stateProps.setState(e.value);
        if (onChange) {
          onChange(e); // Llama a la función onChange si está definida
        }
      }}
      options={data}
      optionLabel="name"
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
}

export function SelectComponent({
  idInput,
  register,
  className = "select-basic",
  placeholder = "Seleccione",
  data = [{} as IDropdownProps],
  value = null,
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors = {},
  stateProps,
  setValue,
  disabled,
  onChange
}: ISelectProps<any>): React.JSX.Element {
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
        <SelectElement
          idInput={idInput}
          className={className}
          setValue={setValue}
          placeholder={placeholder}
          data={data}
          value={value}
          register={register}
          stateProps={stateProps}
          disabled={disabled}
          onChange={onChange} 
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
