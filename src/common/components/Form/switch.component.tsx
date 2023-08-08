import React from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { Control, Controller } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";

interface ISwitchProps<T> {
  idInput: string;
  control: Control<any>;
  label?: string;
  className?: string;
  classNameLabel?: string;
  direction?: EDirection;
  errors?: any;
  disabled?: boolean;
  fieldArray?: boolean;
  children?: React.JSX.Element | React.JSX.Element[];
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

export function SwitchComponent({
  idInput,
  control,
  className = "",
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  errors = {},
  disabled,
  fieldArray,
  children,
}: ISwitchProps<any>): React.JSX.Element {
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
        <Controller
          name={idInput}
          control={control}
          render={({ field }) => (
            <InputSwitch
              checked={field.value}
              className={className}
              id={idInput}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              disabled={disabled}
            />
          )}
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

// function SwitchElement({
//   onChange,
//   register,
//   idInput,
//   value,
// }: ISwitchElement<any>): React.JSX.Element {
//   const switchRegister = register ? register : () => {};
//   const switchOnChange = onChange ? onChange : (e) => {};
//   const [checked, setChecked] = useState(false);
//   useEffect(() => {
//     setChecked(value)
//   }, [value]);
//   return (
//     <InputSwitch
//       {...switchRegister}
//       checked={checked}
//       id={idInput}
//       onChange={(e) => {
//         setChecked(e.value);
//         switchOnChange(e);
//       }}
//     />
//   );
// }

// export function SwitchComponent({
//   idInput,
//   onChange = (e) => {},
//   register,
//   value = false,
//   label,
//   classNameLabel = "text-main",
//   direction = EDirection.column,
//   errors = {},
// }: ISwitchProps<any>): React.JSX.Element {
//   return (
//     <div
//       className={
//         errors[idInput]?.message
//           ? `${direction} container-icon_error`
//           : direction
//       }
//     >
//       <LabelElement
//         label={label}
//         idInput={idInput}
//         classNameLabel={classNameLabel}
//       />
//       <div>
//         <SwitchElement register={register} idInput={idInput} value={value} onChange={onChange}/>
//         {errors[idInput]?.message && <span className="icon-error"></span>}
//       </div>
//       {errors[idInput]?.message && (
//         <p className="error-message bold not-margin-padding">
//           {errors[idInput]?.message}
//         </p>
//       )}
//     </div>
//   );
// }
