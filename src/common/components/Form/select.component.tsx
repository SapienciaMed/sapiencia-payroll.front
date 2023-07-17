import React, { useEffect, useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { IDropdownProps } from "../../interfaces/select.interface";

interface ISelectProps<T> {
  id?: string;
  idInput: string;
  register?: UseFormRegister<T>;
  setValueRegister?: UseFormSetValue<T>;
  className?: string;
  placeholder?: string;
  data?: Array<IDropdownProps>;
  value?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  setValue?: React.Dispatch<any>;
  stateProps?: {
    state: any;
    setState: React.Dispatch<any>;
  };
  disabled?: boolean;
  onchange?: (e: string) => void;
  fieldArray?: boolean;
}

interface ISelectElementProps<T> {
  id?: string;
  idInput: string;
  className?: string;
  placeholder?: string;
  data?: Array<IDropdownProps>;
  value?: string;
  register?: UseFormRegister<T>;
  setValueRegister?: UseFormSetValue<T>;
  setValue?: React.Dispatch<any>;
  stateProps?: {
    state: any;
    setState: React.Dispatch<any>;
  };
  disabled?: boolean;
  onchange?: (e: string) => void;
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
  id,
  idInput,
  className,
  placeholder,
  data,
  value,
  register,
  setValueRegister,
  setValue,
  stateProps,
  disabled,
  onchange,
}: ISelectElementProps<any>): React.JSX.Element {
  const [selected, setSelected] = useState(value);
  const registerProp = register ? register : () => {};

  useEffect(() => {
    const setValueRegisterProp = setValueRegister ? setValueRegister : () => {};
    setValueRegisterProp(idInput, stateProps ? stateProps.state : selected);
  }, [selected, stateProps]);

  return (
    <div {...registerProp(idInput)}>
      <Dropdown
        id={id}
         value={stateProps ? stateProps.state : selected}
        //value={data.find((c)=>{c.value === value })}
        onChange={(e) => {
          if (onchange) {
            onchange(e.value);
          }
          if (setValue) {
            setValue(e.value);
            setSelected(e.value);
          }
          stateProps ? stateProps.setState(e.value) : setSelected(e.value);
        }}
        options={data}
        optionLabel="name"
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
    </div>
  );
}

export function SelectComponent({
  id,
  idInput,
  register,
  setValueRegister,
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
  onchange,
  fieldArray,
}: ISelectProps<any>): React.JSX.Element {
  if (data) {
    const seleccione: IDropdownProps = { name: "Seleccione", value: null };
    const dataSelect = data.find(
      (item) => item.name === seleccione.name && item.value === seleccione.value
    );
    if (!dataSelect) data.unshift(seleccione);
  }
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
        <SelectElement
          id={id}
          idInput={idInput}
          className={messageError() ? `${className} error` : className}
          setValue={setValue}
          placeholder={placeholder}
          data={data}
          value={value}
          register={register}
          setValueRegister={setValueRegister}
          stateProps={stateProps}
          disabled={disabled}
          onchange={onchange}
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
