import React from "react";

import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { DateTime } from "luxon";

import { EDirection } from "../../../common/constants/input.enum";
import { IContractSuspension } from "../../../common/interfaces/payroll.interfaces";

import {
  FormComponent,
  ButtonComponent,
  InputComponent,
  DatePickerComponent,
  TextAreaComponent,
  LabelComponent,
} from "../../../common/components/Form";

interface IPropsCreateSuspensionContractForm {
  register: UseFormRegister<IContractSuspension>;
  control: Control<IContractSuspension, any>;
  formState: FormState<IContractSuspension>;
  adjustEndDate: boolean;
  dateStart: DateTime;
  dateStartSuspension: DateTime;
  onSubmitCreateSuspensionContract: (
    e?: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
  redirectCancel: () => void;
  maxDateSuspension: () => Date;
}

export const CreateSuspensionContractForm = ({
  register,
  control,
  formState,
  onSubmitCreateSuspensionContract,
  redirectCancel,
  maxDateSuspension,
  adjustEndDate,
  dateStart,
  dateStartSuspension,
}: IPropsCreateSuspensionContractForm): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <FormComponent
      id="searchRecordForm"
      className="form-signIn"
      action={onSubmitCreateSuspensionContract}
    >
      <div className="container-sections-forms">
        <div className="grid-form-3-container gap-25">
          <InputComponent
            idInput={"document"}
            register={register}
            label={<>Documento</>}
            typeInput={"text"}
            errors={errors}
            disabled={true}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <InputComponent
            idInput={"names"}
            register={register}
            label={<>Nombres</>}
            typeInput={"text"}
            errors={errors}
            disabled={true}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <InputComponent
            idInput={"surnames"}
            register={register}
            label={<>Apellidos</>}
            typeInput={"text"}
            errors={errors}
            disabled={true}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <InputComponent
            idInput={"typeContract"}
            register={register}
            label={<>Tipo de contrato</>}
            typeInput={"text"}
            errors={errors}
            disabled={true}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <InputComponent
            idInput={"nroContract"}
            register={register}
            label={<>No. de contrato</>}
            typeInput={"text"}
            errors={errors}
            disabled={true}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <DatePickerComponent
            idInput={"dateStart"}
            control={control}
            label={<>Fecha inicio</>}
            errors={errors}
            classNameLabel="text-black big bold"
            className="dataPicker-basic  medium "
            disabled={true}
            placeholder="DD/MM/YYYY"
            dateFormat="dd/mm/yy"
            shouldUnregister={true}
          />

          <DatePickerComponent
            idInput={"dateEnd"}
            control={control}
            label={<>Fecha fin</>}
            errors={errors}
            classNameLabel="text-black big bold"
            className="dataPicker-basic  medium "
            disabled={true}
            placeholder="DD/MM/YYYY"
            dateFormat="dd/mm/yy"
            shouldUnregister={true}
          />

          <DatePickerComponent
            idInput={"dateStartSuspension"}
            control={control}
            label={
              <>
                Fecha inicio suspension<span>*</span>
              </>
            }
            errors={errors}
            classNameLabel="text-black big bold"
            className="dataPicker-basic  medium "
            placeholder="DD/MM/YYYY"
            dateFormat="dd/mm/yy"
            minDate={new Date(dateStart)}
            maxDate={maxDateSuspension()}
            shouldUnregister={true}
          />

          <DatePickerComponent
            idInput={"dateEndSuspension"}
            control={control}
            label={
              <>
                Fecha fin suspension <span>*</span>
              </>
            }
            errors={errors}
            classNameLabel="text-black big bold"
            className="dataPicker-basic  medium "
            placeholder="DD/MM/YYYY"
            dateFormat="dd/mm/yy"
            minDate={new Date(dateStartSuspension)}
            maxDate={maxDateSuspension()}
            shouldUnregister={true}
          />

          <div className="grid-span-3-columns">
            <div className="grid-form-3-container gap-25">
              <Controller
                control={control}
                name={"adjustEndDate"}
                shouldUnregister={true}
                render={({ field }) => {
                  return (
                    <div className="check-label mt-25 mb-25">
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput={"checkbox"}
                        direction={EDirection.row}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        checked={field.value}
                        className="checkbox-basic"
                        classNameLabel="text-black big bold"
                      >
                        <LabelComponent
                          value="Calcular nueva fecha fin de contrato"
                          className="text-black big bold"
                          htmlFor="porcentaje"
                        />
                      </InputComponent>
                    </div>
                  );
                }}
              />

              {adjustEndDate && (
                <DatePickerComponent
                  idInput={"newDateEnd"}
                  control={control}
                  label={
                    <>
                      Nueva fecha fin de contrato <span>*</span>
                    </>
                  }
                  errors={errors}
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic  medium "
                  disabled={true}
                  placeholder="DD/MM/YYYY"
                  dateFormat="dd/mm/yy"
                  shouldUnregister={true}
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid-span-3-columns">
          <Controller
            control={control}
            name={"observation"}
            render={({ field }) => {
              return (
                <TextAreaComponent
                  idInput={field.name}
                  className="text-area-basic"
                  classNameLabel="text-black big bold"
                  label={
                    <>
                      Observaciones <span>*</span>
                    </>
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={false}
                  errors={errors}
                  rows={5}
                />
              );
            }}
          />
          <div className="text-right">
            <span className="text-span ">Max. {500} caracteres</span>
          </div>
        </div>
      </div>

      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={redirectCancel}
        />
        <ButtonComponent
          value={"Ejecutar suspensión"}
          className="button-save extra_extra_large disabled-black"
          disabled={!isValid}
        />
      </div>
    </FormComponent>
  );
};
