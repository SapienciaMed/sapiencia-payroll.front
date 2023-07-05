import React from 'react'
import { InputComponent } from '../../common/components/Form/input.component'
import { SelectComponent } from '../../common/components/Form/select.component'

const AffiliationsForm = ({register,errors}:any) => {
  return (
    <div>
    
    <div className='grid-form-3-container container-sections-forms '>
    <span className="text-black large bold grid-span-3-columns" > Parafiscales</span>
      <SelectComponent idInput='eps' label='EPS' errors={errors} register={register} classNameLabel="text-black big bold" className="select-basic medium"/>
      <SelectComponent idInput='pension' label='Pension' errors={errors} register={register} classNameLabel="text-black big bold" className="select-basic medium"/>
      <SelectComponent idInput='arl' label='ARL' errors={errors} register={register} classNameLabel="text-black big bold" className="select-basic medium"/>
      <SelectComponent idInput='levelRisk' label='Riesgo' errors={errors} register={register} classNameLabel="text-black big bold" className="select-basic medium"/>
      <SelectComponent idInput='retirementFund' label='Fondo de cesantías' errors={errors} register={register} classNameLabel="text-black big bold" className="select-basic medium"/>
      </div>
    </div>
  )
}

export default AffiliationsForm