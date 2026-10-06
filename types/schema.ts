export type SchemaProperty = {
  name: string;
  value: unknown;
  exists: boolean;
};

export type SchemaEntity = {
  types: string[];
  properties: SchemaProperty[];
};

export type SchemaBlock = {
  raw: unknown;
  types: string[];
  context: string | null;
  properties: SchemaProperty[];
  entities: SchemaEntity[];
  isValid: boolean;
};