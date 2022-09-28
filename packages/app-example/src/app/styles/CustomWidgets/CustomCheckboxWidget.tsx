import { FC } from 'react'
import { Checkbox } from '@concepta/react-material-ui'
import { WidgetProps } from '@rjsf/core'
import { filterProps } from './utils'

const CustomCheckboxWidget: FC<WidgetProps> = props => (
  <Checkbox
    {...filterProps(props)}
    value={props.value}
    label={props.label}
    onChange={evt => props.onChange(evt.target.checked)}
  />
)

export default CustomCheckboxWidget
