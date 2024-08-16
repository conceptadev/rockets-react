import React from 'react';
import Box from '@mui/material/Box';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { TextField } from '../../components/TextField';
import { FormLabel } from '../../components/FormLabel';
import { TypographyProps } from '@mui/material';

const NUMBER_REGEX = /^\d$/;

type OmittedTextFieldProps = Omit<
  MuiTextFieldProps,
  | 'onChange'
  | 'select'
  | 'multiline'
  | 'defaultValue'
  | 'value'
  | 'autoFocus'
  | 'variant'
>;

type OmittedBoxProps = Omit<MuiBoxProps, 'onChange' | 'onBlur'>;

export interface BaseOtpInputProps {
  value?: string;
  length?: number;
  autoFocus?: boolean;
  textFieldProps?:
    | OmittedTextFieldProps
    | ((index: number) => OmittedTextFieldProps);
  name?: string;
  label?: string;
  labelProps?: TypographyProps;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string, isComplete: boolean) => void;
}

type OtpInputProps = OmittedBoxProps & BaseOtpInputProps;

export const KEYBOARD_KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  HOME: 'Home',
  END: 'End',
} as const;

type SplittedValue = {
  character: string;
  inputRef: React.RefObject<HTMLInputElement>;
}[];

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      value = '',
      length = 4,
      autoFocus = false,
      textFieldProps,
      name,
      label,
      labelProps,
      className,
      onComplete,
      onChange,
      onBlur,
      ...restBoxProps
    }: OtpInputProps,
    ref,
  ) => {
    const checkCompletion = (inputValue: string) =>
      inputValue.slice(0, length).length === length;

    const initializeInputs = (): SplittedValue =>
      Array.from({ length }, (_, index) => ({
        character: value[index] ?? '',
        inputRef: React.createRef<HTMLInputElement>(),
      }));

    const inputData = initializeInputs();

    const updateValue = (index: number, char: string) =>
      value.slice(0, index) + char + value.slice(index + 1);

    const focusInput = (index: number) => {
      if (index < length) inputData[index]?.inputRef.current?.select();
    };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number,
    ) => {
      if (index === 0 && event.target.value.length > 1) {
        const inputComplete = checkCompletion(event.target.value);
        onChange?.(event.target.value);
        if (inputComplete) onComplete?.(event.target.value);
        focusInput(event.target.value.length - 1);
        return;
      }

      const char = event.target.value[0] ?? '';

      if (char && !NUMBER_REGEX.test(char)) return;

      const newValue = updateValue(index, char);
      onChange?.(newValue);

      if (char !== '' && NUMBER_REGEX.test(char)) {
        focusInput(newValue.length - 1 < index ? newValue.length : index + 1);
      } else if (newValue.length <= index) {
        focusInput(index - 1);
      }

      if (checkCompletion(newValue)) onComplete?.(newValue);
    };

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
      index: number,
    ) => {
      const inputElement = event.target as HTMLInputElement;
      const caretAtStart =
        inputElement.selectionStart === 0 && inputElement.selectionEnd === 0;

      if (inputElement.value === event.key) {
        event.preventDefault();
        focusInput(index + 1);
      } else if (event.key === KEYBOARD_KEYS.BACKSPACE) {
        if (!inputElement.value) {
          event.preventDefault();
          focusInput(index - 1);
        } else if (caretAtStart) {
          event.preventDefault();
          const newValue = updateValue(index, '');
          onChange?.(newValue);
          if (newValue.length <= index) focusInput(index - 1);
        }
      } else if (event.key === KEYBOARD_KEYS.LEFT) {
        event.preventDefault();
        focusInput(index - 1);
      } else if (event.key === KEYBOARD_KEYS.RIGHT) {
        event.preventDefault();
        focusInput(index + 1);
      } else if (event.key === KEYBOARD_KEYS.HOME) {
        event.preventDefault();
        focusInput(0);
      } else if (event.key === KEYBOARD_KEYS.END) {
        event.preventDefault();
        focusInput(length - 1);
      }
    };

    const handlePaste = (
      event: React.ClipboardEvent<HTMLDivElement>,
      index: number,
    ) => {
      const pastedData = event.clipboardData.getData('text/plain');
      const newValue =
        pastedData.length <= length - index
          ? value.slice(0, index) +
            pastedData +
            value.slice(index + pastedData.length, length)
          : value;
      onChange?.(newValue);
      if (checkCompletion(newValue)) {
        onComplete?.(newValue);
        focusInput(length - 1);
      } else {
        focusInput(newValue.length);
      }
    };

    const handleBlurEvent = (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const isInputFocused = inputData.some(
        ({ inputRef }) => inputRef.current === event.relatedTarget,
      );
      if (!isInputFocused) {
        const isComplete = checkCompletion(value);
        onBlur?.(value, isComplete);
      }
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {!!label && (
          <FormLabel name={`${name}-0`} label={label} labelProps={labelProps} />
        )}
        <Box
          display="flex"
          gap="20px"
          alignItems="center"
          justifyContent="center"
          ref={ref}
          className={`otp-input-box ${className || ''}`}
          {...restBoxProps}
        >
          {inputData.map(({ character, inputRef }, index) => {
            const {
              onPaste,
              onFocus,
              onKeyDown,
              className,
              onBlur: textFieldBlur,
              error,
              name,
              ...restTextFieldProps
            } = typeof textFieldProps === 'function'
              ? textFieldProps(index) || {}
              : textFieldProps || {};

            return (
              <TextField
                id={index === 0 ? `${name}-${index}` : undefined}
                key={`otp-input-${index}`}
                autoFocus={autoFocus && index === 0}
                autoComplete="one-time-code"
                value={character}
                error={error}
                inputRef={inputRef}
                inputProps={{
                  sx: {
                    textAlign: 'center',
                  },
                }}
                InputProps={{
                  sx: {
                    caretColor: 'transparent',
                    '.MuiInputBase-input::selection': {
                      backgroundColor: 'transparent',
                    },
                  },
                }}
                className={className}
                onPaste={(event) => {
                  event.preventDefault();
                  handlePaste(event, index);
                  onPaste?.(event);
                }}
                onFocus={(event) => {
                  event.preventDefault();
                  event.target.select();
                  onFocus?.(event);
                }}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => {
                  handleKeyDown(event, index);
                  onKeyDown?.(event);
                }}
                onBlur={(event) => {
                  textFieldBlur?.(event);
                  handleBlurEvent(event);
                }}
                name={`${name}-${index}`}
                {...restTextFieldProps}
              />
            );
          })}
        </Box>
      </Box>
    );
  },
);

export default OtpInput;
