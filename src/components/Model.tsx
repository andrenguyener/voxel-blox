import { useRef } from "react";

import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "react-three-fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface Group {
    rotation: {
        x: number;
        y: number;
    };
}

// export const loadObjModel = (
//     // scene: THREE.Scene,
//     mtlPath: string,
//     objPath: string,
//     options: {
//         smooth: boolean;
//         receiveShadow: boolean;
//         castShadow: boolean;
//         position: {
//             x: number;
//             y: number;
//         };
//     } = {
//         smooth: false,
//         receiveShadow: true,
//         castShadow: true,
//         position: {
//             x: 3.5,
//             y: 0,
//         },
//     }
// ): Promise<THREE.Object3D> => {
//     const { receiveShadow, castShadow, position } = options;

//     const onProgress = (xhr: any) => {
//         if (xhr.lengthComputable) {
//             const percentComplete = (xhr.loaded / xhr.total) * 100;
//             console.log(Math.round(percentComplete) + "% downloaded");
//         }
//     };

//     const onError = () => {
//         console.error("Error Loading Obj");
//     };

//     return new Promise((resolve) => {
//         const manager = new THREE.LoadingManager();
//         new MTLLoader(manager).load(mtlPath, (materials) => {
//             materials.preload();

//             new OBJLoader(manager).setMaterials(materials).load(
//                 objPath,
//                 (obj) => {
//                     console.log(`${objPath}:`, obj);

//                     obj.position.y = position.y;
//                     obj.position.x = position.x;
//                     obj.receiveShadow = receiveShadow;
//                     obj.castShadow = castShadow;
//                     // scene.add(obj);
//                     obj.traverse((object) => {
//                         object.castShadow = castShadow;
//                         object.receiveShadow = receiveShadow;
//                         // console.log("object.geometry:", object.geometry);

//                         // if (smooth) {
//                         //     // smooth shading
//                         //     const tempGeometry = new THREE.Geometry().fromBufferGeometry(
//                         //         object.geometry
//                         //     );
//                         //     tempGeometry.mergeVertices();
//                         //     tempGeometry.computeVertexNormals();
//                         //     object.geometry = new THREE.BufferGeometry().fromGeometry(tempGeometry);
//                         // }
//                     });
//                     resolve(obj);
//                 },
//                 onProgress,
//                 onError
//             );
//         });
//     });
// };

interface Props {
    rotate?: boolean;
    objPath: string;
    mtlPath: string;
}

export const Model = (props: Props) => {
    /* Refs */
    const group = useRef<Group>();

    const materials = useLoader(MTLLoader, props.mtlPath);
    const model = useLoader(OBJLoader, props.objPath, (loader) => {
        const _loader = loader as OBJLoader;
        materials.preload();
        _loader.setMaterials(materials);
    });
    model.receiveShadow = true;
    model.castShadow = true;
    model.traverse((object) => {
        object.castShadow = true;
        object.receiveShadow = true;
    });

    useFrame(() => {
        if (props.rotate) {
            if (typeof group.current != "undefined") {
                group.current.rotation.y += 0.01;
            }
        }
    });

    return (
        <>
            {model ? (
                <group ref={group}>
                    <primitive name="Object_0" object={model} />
                </group>
            ) : (
                <Html>Loading...</Html>
            )}
        </>
    );
};
