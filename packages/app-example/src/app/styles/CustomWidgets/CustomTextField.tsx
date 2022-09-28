import { FC } from 'react'
import { TextField } from '@concepta/react-material-ui'
import { WidgetProps } from '@rjsf/core'
import { filterProps } from './utils'

const CustomTextField: FC<WidgetProps> = props => (
  <TextField
    {...filterProps(props)}
    variant="outlined"
    margin="normal"
    fullWidth
    color="info"
    sx={{ ...props.sx, marginTop: '4px', mb: 0 }}
    value={props.value}
    onChange={event => props.onChange(event.target.value)}
  />
)

export default CustomTextField
