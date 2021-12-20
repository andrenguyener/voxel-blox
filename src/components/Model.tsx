import { useRef, useMemo } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface Props {
    rotate?: boolean;
    objPath: string;
    mtlPath: string;
}

interface Group {
    rotation: {
        x: number;
        y: number;
    };
}

export const Model = (props: Props) => {
    const group = useRef<Group>();

    const { mtlPath, objPath, rotate } = props;

    const _materials = useLoader(MTLLoader, mtlPath);
    const materials = useMemo(() => _materials, [mtlPath]);
    const _model = useLoader(OBJLoader, objPath, (loader) => {
        const _loader = loader as OBJLoader;
        materials.preload();
        _loader.setMaterials(materials);
    });
    const model = useMemo(() => _model, [objPath]);

    model.receiveShadow = true;
    model.castShadow = true;
    model.traverse((object) => {
        object.castShadow = true;
        object.receiveShadow = true;
    });

    useFrame(() => {
        if (rotate) {
            if (typeof group.current != "undefined") {
                group.current.rotation.y += 0.01;
            }
        }
    });

    return (
        <group ref={group} dispose={null}>
            <primitive name="Object_0" object={model} />
        </group>
    );
};
