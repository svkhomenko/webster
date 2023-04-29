export enum StageObjectType {
  IMAGE = 'image',
  TEXT = 'text',
  SHAPE = 'shape',
}

export type StageObjectData = {
  type: StageObjectType;
  width: number;
  height: number;
  x: number;
  y: number;
  draggable: boolean;
} & Record<string, any>;

export type StageObject = {
  id: string;
  data: StageObjectData;
} & Record<string, any>;

export type StageImageData = {
  src: string;
} & StageObjectData;

export type StageObjectPartial = {
  id: string;
  data: Partial<StageObjectData>;
};