import React, { useEffect } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  useController,
} from "react-hook-form";

import { MdOutlineError } from "react-icons/md";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";

interface IInputEditorProps<T> {
  idInput: string;
  control: Control<any>;
  className?: string;
  placeholder?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  optionsRegister?: {};
  shouldUnregister?: boolean;
  readOnly?: boolean;
  showHeader?: boolean;
  value?: string;
  onChange?: (event: EditorTextChangeEvent) => void;
  onBlur?: (event: EditorTextChangeEvent) => void;
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

export function InputEditorComponent({
  idInput,
  placeholder,
  value,
  label,
  classNameLabel = "text-main",
  className = "",
  direction = EDirection.column,
  children,
  control,
  optionsRegister = {},
  shouldUnregister,
  readOnly,
  showHeader = true,
  onChange,
  onBlur,
}: IInputEditorProps<any>): React.JSX.Element {
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
        <Editor
          readOnly={readOnly}
          placeholder={placeholder}
          className={`${className} ${error?.message ? "p-invalid" : ""}`}
          showHeader={showHeader}
          id={field.name}
          name={field.name}
          value={field.value}
          onTextChange={(e) => {
            field.onChange(e.textValue);
            if (onChange) onChange(e);
          }}
          onBlur={(e) => field.onBlur()}
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
