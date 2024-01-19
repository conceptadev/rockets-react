import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import {
  Box,
  BoxProps,
  FormControl,
  Grid,
  TypographyProps,
} from '@mui/material';
import Checkbox from '../../components/Checkbox';
import FormLabel from '../../components/FormLabel';

interface Props {
  containerProps?: BoxProps;
  labelProps?: TypographyProps;
}

const CustomCheckboxesWidget = (props: WidgetProps & Props) => {
  const {
    label,
    name,
    labelProps,
    containerProps,
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
    <Box {...containerProps}>
      <FormControl>
        {label && typeof label === 'string' ? (
          <FormLabel
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
        ) : (
          label
        )}

        <Grid
          display="flex"
          flexDirection={uiSchema?.['ui:inline'] ? 'row' : 'column'}
          flexWrap="wrap"
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
    </Box>
  );
};

export default CustomCheckboxesWidget;
