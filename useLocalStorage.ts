/**
 * These types mirror the JSON schema provided in the assignment.
 * Any new field can be added purely as JSON data — no component code
 * needs to change unless an entirely new fieldType is introduced.
 */

export type FieldType = 'TEXT' | 'LIST' | 'RADIO' | 'CHECKBOX' | 'TEXTAREA' | 'NUMBER';

export interface FieldDefinition {
  id: number;
  name: string;
  fieldType: FieldType;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required: boolean;
  listOfValues1?: string[];
  placeholder?: string;
  helperText?: string;
}

export interface FormSchema {
  data: FieldDefinition[];
}
