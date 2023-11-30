import { RadioButton } from "primereact/radiobutton";
import { Control, useController } from "react-hook-form";

import { LabelComponent } from "./label.component";

import { EDirection } from "../../constants/input.enum";

interface IRadioProps {
  readonly idInput: string;
  readonly control: Control<any>;
  readonly value: string | number;
  readonly className?: string;
  readonly label?: string | React.JSX.Element;
  readonly classNameLabel?: string;
  readonly direction?: EDirection;
  readonly children?: React.JSX.Element | React.JSX.Element[];
  readonly optionsRegister?: {};
  readonly shouldUnregister?: boolean;
  readonly onChange?: (e: any) => void;
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

export function InputRadioComponent({
  idInput,
  control,
  value,
  className,
  label,
  classNameLabel,
  direction = EDirection.column,
  children,
  optionsRegister,
  shouldUnregister,
  onChange,
}: IRadioProps): React.JSX.Element {
  const {
    field,
    fieldState: { error, invalid },
    formState,
  } = useController({
    name: idInput,
    control,
    shouldUnregister,
    rules: optionsRegister,
  });

  return (
    <div className={direction}>
      <RadioButton
        inputId={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        value={value}
        checked={field.value === value}
      />
      <LabelElement
        label={label}
        idInput={field.name}
        classNameLabel={classNameLabel}
      />
      {children}
    </div>
  );
}
