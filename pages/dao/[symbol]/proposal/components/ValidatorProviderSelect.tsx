import Select from '@components/inputs/Select'
import React, { useEffect } from 'react'
import { ValidatorProvider } from '@utils/uiTypes/assets'

export function getProviderLabelInfo(acc: ValidatorProvider | undefined) {
  let name = ''
  let address = ''
  let description = ''
  let rating = ''
  let numberOfGovernanceServing = ''

  if (acc) {
    name = acc.name
    address = acc.address.toBase58()
    description = acc.description
    rating = acc.rating == 0 ? 'unrated' : acc.rating.toString()
    numberOfGovernanceServing = acc.numberOfGovernanceServing.toString()
  }
  return {
    name,
    address,
    description,
    rating,
    numberOfGovernanceServing,
  }
}

const ValidatorProviderSelect = ({
  onChange,
  value,
  error,
  validatorProviders = [],
  label,
  noMaxWidth,
  autoselectFirst = true,
}: {
  onChange
  value
  error?
  validatorProviders: ValidatorProvider[]
  label?
  noMaxWidth?: boolean
  autoselectFirst?: boolean
}) => {
  function getLabel(value: ValidatorProvider) {
    if (value) {
      return getValidatorLabelComponent(getProviderLabelInfo(value))
    } else {
      return null
    }
  }
  function getValidatorLabelComponent({
    name,
    address,
    description,
    rating,
    numberOfGovernanceServing,
  }) {
    return (
      <div className="break-all text-fgd-1 ">
        {<div className="mb-0.5">{name}</div>}
        <div className="mb-2 text-fgd-3 text-xs">{address}</div>
        <div className="flex space-x-3 text-xs text-fgd-3">
          <div className="flex items-center">
            Description:
            <span className="ml-1 text-fgd-1">{description}</span>
          </div>
        </div>
        <div className="flex space-x-3 text-xs text-fgd-3">
          <div>
            Rating:
            <span className="ml-1 text-fgd-1">{rating}</span>
          </div>

          <div>
            Governance count:
            <span className="ml-1 text-fgd-1">{numberOfGovernanceServing}</span>
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    if (validatorProviders.length == 1 && autoselectFirst) {
      //wait for microtask queue to be empty
      setTimeout(() => {
        onChange(validatorProviders[0])
      })
    }
  }, [JSON.stringify(validatorProviders)])
  return (
    <Select
      label={label}
      onChange={onChange}
      componentLabel={getLabel(value)}
      placeholder="Please select..."
      value={value?.name}
      error={error}
      noMaxWidth={noMaxWidth}
    >
      {validatorProviders.map((acc) => {
        return (
          <Select.Option className="border-red" key={acc.name} value={acc}>
            {getLabel(acc)}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default ValidatorProviderSelect
