import { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface Props {
    objPath: string;
    mtlPath: string;
    options?: {
        rotate?: boolean;
        wireframe?: boolean;
        position?: {
            x: number;
            y: number;
            z: number;
        };
    };
}

interface Group {
    rotation: {
        x: number;
        y: number;
    };
}

const isMesh = (object: THREE.Object3D): object is THREE.Mesh => {
    return (object as THREE.Mesh).isMesh;
};

export const Model = (props: Props) => {
    const group = useRef<Group>();

    const { mtlPath, objPath, options } = props;

    const _materials = useLoader(MTLLoader, mtlPath);
    const materials = _materials;
    const model = useLoader(OBJLoader, objPath, (loader) => {
        const _loader = loader as OBJLoader;
        materials.preload();
        _loader.setMaterials(materials);
    });

    model.receiveShadow = true;
    model.castShadow = true;
    model.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
        if (options?.position) {
            child.position.x = options.position.x;
            child.position.y = options.position.y;
            child.position.z = options.position.z;
        }
        if (isMesh(child)) {
            const childMaterial = child.material as THREE.MeshBasicMaterial;
            if (options?.wireframe) {
                childMaterial.wireframe = true;
                // childMaterial.map = null;
                // Todo configure the color of the wireframe
                // childMaterial.color = new THREE.Color(0x6893de);
            } else {
                childMaterial.wireframe = false;
            }
        }
    });

    useFrame(() => {
        if (options?.rotate) {
            if (typeof group.current != "undefined") {
                group.current.rotation.y += 0.01;
            }
        }
    });

    return (
        <group ref={group} dispose={null}>
            <primitive name="Object_1" key={objPath} object={model} />
        </group>
    );
};
