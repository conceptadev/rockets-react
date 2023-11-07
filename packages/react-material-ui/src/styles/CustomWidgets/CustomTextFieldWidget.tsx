import React, { FC } from 'react';
import TextField from '../../components/TextField';
import { WidgetProps } from '@rjsf/utils';
import { filterProps } from './utils';

const CustomTextFieldWidget: FC<WidgetProps> = (props) => (
  <TextField
    {...filterProps(props)}
    variant="outlined"
    margin="normal"
    fullWidth
    color="info"
    error={props?.rawErrors?.length > 0}
    sx={props.sx}
    value={props.value}
    onChange={(event) => props.onChange(event.target.value)}
  />
);

export default CustomTextFieldWidget;
