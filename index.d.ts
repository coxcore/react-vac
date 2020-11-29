import React from 'react';

export interface VACProps {
  name?: string,
  data?: any,
  customEvent?: { [key: string]: Function },
  hidden?: boolean,
  maxWidth?: number | string,
  maxHeight?: number | string,
  useValue?: string,
  useDefaultValue?: string,
  useList?: string,
  useEach?: string,
  [key: string]: string | any
}

declare const VAC: React.FC<VACProps>;

export const VACList: React.FC<VACProps>;
export const VACInput: React.FC<VACProps>;

export default VAC;
