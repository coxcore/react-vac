import React from 'react';

export interface VACProps {
    name?: string;
    data?: any;
    trace?: string;
    listTrace?: string;
    customEvent?: { [key: string]: (...args: any[]) => void };
    hidden?: boolean;
    maxWidth?: number | string;
    maxHeight?: number | string;
    formName?: String;
    useName?: string;
    useValue?: string;
    useDefaultValue?: string;
    useList?: string;
    useEach?: string;
    [key: string]: string | any;
}

export type VAC = React.FC<VACProps>;

export declare const withPreset: (type: string, hocProps?: VACProps) => VAC;

export declare const VAC: VAC;
export declare const VACList: VAC;
export declare const VACInput: VAC;

export default VAC;
