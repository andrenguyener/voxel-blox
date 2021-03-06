import React from "react";

export type Merge<P, T> = Omit<P, keyof T> & T;

export type Models = Record<string, Model>;
export interface Model {
    mtl: string;
    obj: string;
    image: string;
    background: string;
    imageStyle: React.CSSProperties;
    label: string;
}
