import React from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";

import { Control, Controller, useController } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { IDropdownProps } from "../../interfaces/select.interface";

interface ISelectProps<T> {
  idInput: string;
  control: Control<any>;
  className?: string;
  placeholder?: string;
  data?: Array<IDropdownProps>;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  fieldArray?: boolean;
  filter?: boolean;
  emptyMessage?: string;
  shouldUnregister?: boolean;
  optionsRegister?: {};
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

export function SelectComponent({
  idInput,
  control,
  className = "select-basic",
  placeholder = "Seleccione",
  data = [{} as IDropdownProps],
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors = {},
  disabled,
  fieldArray,
  filter,
  emptyMessage = "Sin resultados.",
  shouldUnregister,
  optionsRegister,
}: ISelectProps<any>): React.JSX.Element {
  if (data) {
    const seleccione: IDropdownProps = { name: placeholder, value: "" };
    const dataSelect = data?.find(
      (item) => item.name === seleccione.name && item.value === seleccione.value
    );
    if (!dataSelect) data.unshift(seleccione);
  }

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

  // const messageError = () => {
  //   const keysError = idInput.split(".");
  //   let errs = errors;
  //   if (fieldArray) {
  //     const errorKey = `${keysError[0]}[${keysError[1]}].${keysError[2]}`;
  //     return errors[errorKey]?.message;
  //   } else {
  //     for (let key of keysError) {
  //       errs = errs?.[key];
  //       if (!errs) {
  //         break;
  //       }
  //     }
  //     return errs?.message ?? null;
  //   }
  // };

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
        {/* <Controller
          name={idInput}
          control={control}
          render={({ field }) => ( */}
        <Dropdown
          id={field.name}
          name={field.name}
          value={data?.find((row) => row.value === field.value)?.value}
          onChange={(e) => field.onChange(e.value)}
          onBlur={(e) => field.onBlur()}
          options={data}
          optionLabel="name"
          placeholder={placeholder}
          className={`${className} ${error?.message ? "p-invalid" : ""}`}
          disabled={disabled}
          filter={filter}
          emptyMessage={emptyMessage}
          emptyFilterMessage={emptyMessage}
        />
        {/* )}
        /> */}
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
