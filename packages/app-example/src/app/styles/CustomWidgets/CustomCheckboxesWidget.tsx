import { FC } from 'react'
import { Checkbox } from '@concepta/react-material-ui'
import { WidgetProps } from '@rjsf/core'

const CustomCheckboxesWidget: FC<WidgetProps> = props => {
  const {
    label,
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    required,
    onChange,
  } = props
  const { enumOptions, enumDisabled } = options

  const selectValue = (value: any, selected: any, all: any) => {
    const at = all.indexOf(value)
    const updated = selected.slice(0, at).concat(value, selected.slice(at))

    return updated.sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b))
  }

  const deselectValue = (value: any, selected: any) => {
    return selected.filter((v: any) => v !== value)
  }

  const _onChange =
    (option: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      const all = (enumOptions as any).map(({ value }: any) => value)

      if (checked) {
        onChange(selectValue(option.value, value, all))
      } else {
        onChange(deselectValue(option.value, value))
      }
    }

  return (
    <>
      {label}
      {required && ' *'}

      {(enumOptions as any).map((option: any, index: number) => {
        const checked = value.indexOf(option.value) !== -1

        const itemDisabled =
          enumDisabled && (enumDisabled as any).indexOf(option.value) != -1

        return (
          <Checkbox
            id={`${id}_${index}`}
            checked={checked}
            disabled={disabled || itemDisabled || readonly}
            autoFocus={autofocus && index === 0}
            onChange={_onChange(option)}
            key={index}
            label={option.label}
            required={required}
          />
        )
      })}
    </>
  )
}

export default CustomCheckboxesWidget
