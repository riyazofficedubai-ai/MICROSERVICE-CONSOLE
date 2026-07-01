import { z, ZodTypeAny } from 'zod';
import { FieldDefinition } from '@/types/form-schema';

/**
 * Converts a human-readable field name into a safe object key.
 * "Full Name" -> "fullName", "Love React?" -> "loveReact"
 */
export function toFieldKey(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map((word, idx) =>
      idx === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
}

/**
 * Builds one Zod validator for a single field definition,
 * honoring required/optional, min/max length, and value membership
 * for LIST/RADIO types.
 */
function buildFieldValidator(field: FieldDefinition): ZodTypeAny {
  let schema: ZodTypeAny;

  switch (field.fieldType) {
    case 'LIST':
    case 'RADIO': {
      const options = field.listOfValues1 ?? [];
      schema = z.string();
      if (options.length > 0) {
        schema = (schema as z.ZodString).refine(
          (val) => options.includes(val) || val === '',
          { message: `Please select a valid option for "${field.name}"` },
        );
      }
      break;
    }
    case 'NUMBER': {
      schema = z.coerce.number({
        invalid_type_error: `${field.name} must be a number`,
      });
      break;
    }
    case 'TEXTAREA':
    case 'TEXT':
    default: {
      let strSchema = z.string();
      if (field.minLength !== undefined && field.required) {
        strSchema = strSchema.min(
          field.minLength,
          `${field.name} must be at least ${field.minLength} character(s)`,
        );
      }
      if (field.maxLength !== undefined) {
        strSchema = strSchema.max(
          field.maxLength,
          `${field.name} must be at most ${field.maxLength} characters`,
        );
      }
      // Field-specific format checks by name convention (keeps schema purely JSON-driven,
      // but adds sensible UX for common field names like "Email").
      if (field.name.toLowerCase().includes('email')) {
        strSchema = strSchema.email(`Enter a valid ${field.name.toLowerCase()}`);
      }
      schema = strSchema;
      break;
    }
  }

  if (!field.required) {
    schema = schema.optional().or(z.literal(''));
  } else if (field.fieldType === 'TEXT' || field.fieldType === 'TEXTAREA') {
    schema = (schema as z.ZodString).min(1, `${field.name} is required`);
  } else {
    schema = schema.refine((val) => val !== undefined && val !== '', {
      message: `${field.name} is required`,
    });
  }

  return schema;
}

/**
 * Builds a full Zod object schema from an array of field definitions.
 * This is the single source of truth driving both rendering AND validation.
 */
export function buildDynamicSchema(fields: FieldDefinition[]) {
  const shape: Record<string, ZodTypeAny> = {};
  fields.forEach((field) => {
    shape[toFieldKey(field.name)] = buildFieldValidator(field);
  });
  return z.object(shape);
}

/**
 * Builds default form values from field definitions' defaultValue.
 */
export function buildDefaultValues(fields: FieldDefinition[]): Record<string, string> {
  const defaults: Record<string, string> = {};
  fields.forEach((field) => {
    if (field.fieldType === 'LIST' || field.fieldType === 'RADIO') {
      // defaultValue is a 1-based index string per the assignment JSON ("1" => first option)
      const options = field.listOfValues1 ?? [];
      const idx = field.defaultValue ? parseInt(field.defaultValue, 10) - 1 : -1;
      defaults[toFieldKey(field.name)] = options[idx] ?? '';
    } else {
      defaults[toFieldKey(field.name)] = field.defaultValue ?? '';
    }
  });
  return defaults;
}
