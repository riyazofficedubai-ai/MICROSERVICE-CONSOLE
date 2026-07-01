'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import { FieldDefinition } from '@/types/form-schema';
import { toFieldKey } from '@/lib/dynamic-form-schema';

interface DynamicFieldProps {
  field: FieldDefinition;
  control: Control<any>;
  errors: FieldErrors;
}

/**
 * Renders the correct MUI input for a given fieldType.
 * Adding a new fieldType only requires adding a case here —
 * the JSON schema, validation, and form wiring stay untouched.
 */
export function DynamicField({ field, control, errors }: DynamicFieldProps) {
  const key = toFieldKey(field.name);
  const error = errors[key];
  const errorMessage = error?.message as string | undefined;

  switch (field.fieldType) {
    case 'LIST':
      return (
        <Controller
          name={key}
          control={control}
          render={({ field: rhfField }) => (
            <FormControl fullWidth error={!!error} required={field.required}>
              <InputLabel id={`${key}-label`}>{field.name}</InputLabel>
              <Select
                {...rhfField}
                labelId={`${key}-label`}
                label={field.name}
                value={rhfField.value ?? ''}
              >
                <MenuItem value="">
                  <em>Select {field.name}</em>
                </MenuItem>
                {(field.listOfValues1 ?? []).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {(errorMessage || field.helperText) && (
                <FormHelperText>{errorMessage || field.helperText}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      );

    case 'RADIO':
      return (
        <Controller
          name={key}
          control={control}
          render={({ field: rhfField }) => (
            <FormControl error={!!error} required={field.required} component="fieldset">
              <FormLabel component="legend" sx={{ fontSize: '0.95rem', mb: 0.5 }}>
                {field.name}
              </FormLabel>
              <RadioGroup {...rhfField} row value={rhfField.value ?? ''}>
                {(field.listOfValues1 ?? []).map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              {(errorMessage || field.helperText) && (
                <FormHelperText>{errorMessage || field.helperText}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      );

    case 'NUMBER':
      return (
        <Controller
          name={key}
          control={control}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              type="number"
              label={field.name}
              placeholder={field.placeholder}
              required={field.required}
              fullWidth
              error={!!error}
              helperText={errorMessage || field.helperText}
              value={rhfField.value ?? ''}
            />
          )}
        />
      );

    case 'TEXTAREA':
      return (
        <Controller
          name={key}
          control={control}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              label={field.name}
              placeholder={field.placeholder}
              required={field.required}
              fullWidth
              multiline
              minRows={3}
              error={!!error}
              helperText={
                errorMessage ||
                field.helperText ||
                (field.maxLength
                  ? `${(rhfField.value ?? '').length}/${field.maxLength}`
                  : undefined)
              }
              inputProps={{ maxLength: field.maxLength }}
              value={rhfField.value ?? ''}
            />
          )}
        />
      );

    case 'TEXT':
    default:
      return (
        <Controller
          name={key}
          control={control}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              label={field.name}
              placeholder={field.placeholder}
              required={field.required}
              fullWidth
              error={!!error}
              helperText={errorMessage || field.helperText}
              inputProps={{
                minLength: field.minLength,
                maxLength: field.maxLength,
              }}
              value={rhfField.value ?? ''}
            />
          )}
        />
      );
  }
}
