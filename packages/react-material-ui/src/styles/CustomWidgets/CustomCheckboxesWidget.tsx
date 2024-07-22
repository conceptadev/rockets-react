import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '../../components/Checkbox';

const CustomCheckboxesWidget = (props: WidgetProps) => {
  const {
    label,
    uiSchema,
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    required,
    onChange,
  } = props;
  const { enumOptions, enumDisabled } = options;

  const selectValue = (value: any, selected: any, all: any) => {
    const at = all.indexOf(value);
    const updated = selected.slice(0, at).concat(value, selected.slice(at));

    return updated
      .sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b))
      .filter((item) => item !== '');
  };

  const deselectValue = (value: any, selected: any) => {
    return selected.filter((v: any) => v !== value);
  };

  const _onChange =
    (option: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      const all = (enumOptions as any).map(({ value }: any) => value);

      if (checked) {
        onChange(selectValue(option.value, value, all));
      } else {
        onChange(deselectValue(option.value, value));
      }
    };

  return (
    <FormControl>
      <Box id={id} my={1}>
        <Typography variant="h5">{label}</Typography>
        <Divider />
      </Box>

      <Grid
        display="flex"
        flexDirection={uiSchema?.['ui:inline'] ? 'row' : 'column'}
        flexWrap="wrap"
        py={2}
      >
        {(enumOptions as any).map((option: any, index: number) => {
          const checked = value.indexOf(option.value) !== -1;

          const itemDisabled =
            enumDisabled && (enumDisabled as any).indexOf(option.value) != -1;

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
          );
        })}
      </Grid>
    </FormControl>
  );
};

export default CustomCheckboxesWidget;
