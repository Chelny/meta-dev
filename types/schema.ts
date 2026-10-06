export type SchemaProperty = {
  name: string;
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