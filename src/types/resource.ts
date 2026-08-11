export type FieldType =
  | 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'tags'
  | 'date' | 'datetime' | 'image' | 'multi-image' | 'video' | 'password';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  section?: string;
  required?: boolean;
  options?: string[];
  uploadFolder?: string; // for image/video/multi-image types
  placeholder?: string;
  hint?: string;
  colSpan?: 1 | 2;
}

export interface ColumnConfig {
  key: string;
  label: string;
  render?: (row: any) => string;
  isStatus?: boolean;
  isMedia?: boolean;
}

export interface ResourceConfig {
  key: string; // api path segment e.g. 'services'
  title: string;
  singular: string;
  icon?: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  searchPlaceholder?: string;
  statusOptions?: string[];
  hasSoftDelete?: boolean;
  extraActions?: { label: string; action: string }[];
}
