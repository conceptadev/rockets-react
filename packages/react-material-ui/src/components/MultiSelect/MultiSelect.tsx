import React from 'react';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import { FormFieldSkeleton } from '../FormFieldSkeleton';
import { FormLabel } from '../FormLabel';

import { TextProps } from 'interfaces';

/**
 * Default option representing "All" in the select field.
 */
export const allOption: SelectOption = {
  value: 'all',
  label: 'All',
};

/**
 * Option type used in the MultiSelect component.
 */
export type SelectOption = {
  /** The value of the option */
  value: string;
  /** The label to display for the option */
  label: string;
};

/**
 * MultiSelect component props.
 */
export type MultiSelectProps = {
  /** Array of options to display in the select dropdown */
  options: SelectOption[];
  /** The default selected value */
  defaultValue?: string[];
  /** Whether to include the "All" option in the dropdown. True by default. */
  hasAllOption?: boolean;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Callback function triggered when the selected value changes */
  onChange: (value: string[]) => void;
  /** Wheter to show the default input display or the chips style */
  displayVariant?: 'default' | 'chips';
  /** Wheter to display the default shrinking label or Rockets style, above the field */
  labelVariant?: 'default' | 'rockets';
  /** Additional properties to pass to the `Text` component used for rendering the label */
  labelProps?: TextProps;
} & Omit<SelectProps<string[]>, 'onChange'>;

export const MultiSelect = ({
  options = [],
  defaultValue,
  hasAllOption = true,
  isLoading = false,
  label,
  placeholder,
  onChange,
  fullWidth,
  size,
  variant = 'outlined',
  value,
  required,
  displayVariant = 'default',
  labelVariant = 'default',
  name,
  labelProps,
  ...rest
}: MultiSelectProps) => {
  const isChips = displayVariant === 'chips';

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const values = typeof value === 'string' ? value.split(',') : value;

    if (values.includes(allOption.value) && hasAllOption) {
      return onChange([]);
    }

    onChange(values);
  };

  const removeValue = (id: string) => {
    const valueIndex = value?.indexOf(id);
    if (!value || typeof valueIndex !== 'number' || valueIndex === -1) return;
    const newValue = [...value];
    newValue.splice(valueIndex, 1);
    onChange(newValue);
  };

  const finalOptions = [...(hasAllOption ? [allOption] : []), ...options];

  const renderValues = (selected?: string[]) => {
    const valuesIds: string[] = (selected as string[]) || value || [];

    const valueLabels = valuesIds.map(
      (selectedItem: string) =>
        options?.find((item) => item.value === selectedItem)?.label,
    );

    if (isChips) {
      return valueLabels.map((label, index) => (
        <Chip
          key={label}
          label={label}
          className="Rockets-MultiSelect-Chip"
          onDelete={() => removeValue(valuesIds[index])}
          sx={{
            borderRadius: '6px',
            mt: 1,
            '&:not(:last-child)': { mr: 1 },
          }}
        />
      ));
    }

    return valueLabels.join(', ');
  };

  const renderInputValue = (selected: string[]) => {
    if (isChips) {
      return placeholder || label;
    }

    if (selected?.length === 0 && hasAllOption) return allOption.label;

    return renderValues(selected);
  };

  const labelId = `label-${name}`;
  return (
    <FormFieldSkeleton isLoading={isLoading} hideLabel>
      <FormControl fullWidth={fullWidth} size={size}>
        {labelVariant === 'default' && (
          <InputLabel
            id={labelId}
            shrink={hasAllOption || !!value?.length}
            className="Rockets-MultiSelect-InputLabel"
            htmlFor={name}
          >
            {label}
          </InputLabel>
        )}

        {labelVariant === 'rockets' && label && typeof label === 'string' && (
          <FormLabel
            id={labelId}
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
        )}

        <Select
          labelId={labelId}
          className="Rockets-MultiSelect"
          defaultValue={defaultValue}
          onChange={handleChange}
          label={labelVariant === 'rockets' ? '' : label}
          fullWidth={fullWidth}
          size={size}
          variant={variant}
          value={value}
          multiple
          renderValue={renderInputValue}
          displayEmpty={hasAllOption || labelVariant === 'rockets'}
          name={name}
          required={required}
          hiddenLabel={labelVariant === 'rockets'}
          {...rest}
        >
          {finalOptions?.map((opt) => {
            const { value: val, label } = opt;
            const checked = value?.includes(val);

            return (
              <MenuItem
                key={val}
                value={val}
                className="Rockets-MultiSelect-MenuItem"
              >
                <Checkbox
                  checked={checked}
                  className="Rockets-MultiSelect-MenuItem-Checkbox"
                />
                <ListItemText
                  primary={label}
                  className="Rockets-MultiSelect-ListItemText"
                />
              </MenuItem>
            );
          })}
        </Select>
        {isChips && <Box>{renderValues()}</Box>}
      </FormControl>
    </FormFieldSkeleton>
  );
};
