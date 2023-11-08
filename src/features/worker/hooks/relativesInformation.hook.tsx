import { useContext, useEffect, useState } from "react";

import { CalendarChangeEvent } from "primereact/calendar";
import { Control, UseFormSetValue, useFieldArray } from "react-hook-form";

import { AppContext } from "../../../common/contexts/app.context";

import { IVinculation } from "../../../common/interfaces/payroll.interfaces";

import { calculateDifferenceYear } from "../../../common/utils/helpers";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { boolean } from "yargs";

interface IPropsUseRelativesInformation {
  action: string;
  control: Control<IVinculation>;
  setValueRegister: UseFormSetValue<IVinculation>;
  list: any[][];
}

const useRelativesInformation = ({
  action,
  list,
  control,
  setValueRegister,
}: IPropsUseRelativesInformation) => {
  // Context
  const { setMessage } = useContext(AppContext);

  // useStates
  const [dependentList, setDependentList] = useState<IDropdownProps[]>([
    {
      name: "Si",
      value: true,
    },
    {
      name: "No",
      value: false,
    },
  ]);

  // react-hook-form
  const { fields, remove, append } = useFieldArray({
    control,
    name: "relatives",
  });

  //functions

  const handleDisabledFields = (): boolean => {
    return !(action === "new" || action === "edit");
  };

  const handleChangeAge = (e: CalendarChangeEvent): void => {
    const valueCalendar = e.target.value as string;

    const [, index] = e.target.name.split(".") as [string, number];

    if (valueCalendar) {
      const age = calculateDifferenceYear(valueCalendar);

      setValueRegister(`relatives.${index}.age`, age);
    } else {
      setValueRegister(`relatives.${index}.age`, 0);
    }
  };

  const handleModalDelete = (index: number): void => {
    setMessage({
      title: "Eliminar familiar",
      description: `¿Estás segur@ que desea eliminar
      el familiar?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        remove(index);
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  };

  return {
    dependentList,
    fields,
    append,
    handleChangeAge,
    handleDisabledFields,
    handleModalDelete,
  };
};

export default useRelativesInformation;
