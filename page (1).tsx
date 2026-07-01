'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Box } from '@mui/material';
import { FormSchema } from '@/types/form-schema';
import { buildDynamicSchema, buildDefaultValues } from '@/lib/dynamic-form-schema';
import { DynamicField } from './DynamicField';

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
  loading?: boolean;
}

/**
 * Renders an entire form purely from a JSON field-definition array.
 * To change the form (add a field, change its type, mark it optional, etc.)
 * only the JSON in `schema` needs to change — this component never does.
 */
export function DynamicForm({
  schema,
  onSubmit,
  submitLabel = 'Submit',
  loading = false,
}: DynamicFormProps) {
  const validationSchema = buildDynamicSchema(schema.data);
  const defaultValues = buildDefaultValues(schema.data);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const submit = (values: Record<string, string>) => {
    onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={3}>
        {schema.data.map((field) => (
          <DynamicField key={field.id} field={field} control={control} errors={errors} />
        ))}

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
            {loading ? 'Submitting…' : submitLabel}
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={() => reset(defaultValues)}
            disabled={loading}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
