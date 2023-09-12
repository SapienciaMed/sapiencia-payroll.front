import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { DateTime } from "luxon";

//import { filterIncrementSalarySchema } from "../../../common/schemas";

import { formaterNumberToCurrency } from "../../../common/utils/helpers";

import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
//import {ISalaryHistory,ISalaryIncrementFilter,} from "../../../common/interfaces/payroll.interfaces";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";

import { TextAreaComponent } from "../../../common/components/Form";
import {
  DataItem,
  ResponsiveTable,
} from "../../../common/components/Form/table-detail.component";

import { AppContext } from "../../../common/contexts/app.context";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import usePayrollService from "../../../common/hooks/payroll-service.hook";
import { IDeductionsFilter } from "../../../common/interfaces/payroll.interfaces";


export default function useSearchDeductionsHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getCharges } = usePayrollService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [charges, setCharges] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  //variables
  const typeDeductionList = [
    {
      name: "Eventuales",
      Value: "Eventual",
    },
    {
      name: "Cíclicas",
      value: "Cíclica"
    },
  ]

  const { register, handleSubmit, control, formState, reset, watch } =
  useForm<IDeductionsFilter>({
    //resolver,
    mode: "all",
    defaultValues: {
      //numberActApproval: "", 
      codCharge: null,
    },
  });

  const formValues = watch();

  // carga combos
  useEffect(() => {
      loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    
  //charges
  const { data, operation } = await getCharges();
    if (operation.code === EResponseCodes.OK) {
      const chargesList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });
  
      setCharges(chargesList);
    } else {
      setCharges([]);
    }
  };

  const redirectCreate = () => {
    navigate("../crear");
  };

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
  };

  const onSubmit = handleSubmit(async (data: IDeductionsFilter) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  return {
    register,
    typeDeductionList,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    charges,
    tableComponentRef,
    
  }
}