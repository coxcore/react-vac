import React from 'react';

export interface VACProps {
    name?: string;
    data?: any;
    trace?: string;
    listTrace?: string;
    customEvent?: { [key: string]: Function };
    hidden?: boolean;
    maxWidth?: number | string;
    maxHeight?: number | string;
    useValue?: string;
    useDefaultValue?: string;
    useList?: string;
    useEach?: string;
    [key: string]: string | any;
}

declare const VAC: React.FC<VACProps>;

export const withPreset: (presetName: string, presetProps?: VACProps) => VAC;

export const VACList: VAC;
export const VACInput: VAC;

export { VAC, VAC as default };
