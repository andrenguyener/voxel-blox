import React, { Suspense } from "react";

import { useColorMode, Box } from "@chakra-ui/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, Leva } from "leva";

import { Lights } from "../components/Lights";
import { Model } from "../components/Model";

const SetCamera = () => {
    const [initialLoaded, setInitialLoaded] = React.useState(false);

    React.useEffect(() => {
        setInitialLoaded(true);
    }, []);

    useThree(({ camera, scene }) => {
        if (!initialLoaded) {
            scene.position.y = -3;
            camera.position.y = 2;
            camera.position.x = 9;
            camera.position.z = 9;
            camera.manual = true;
        }
    });
    return null;
};

const MODELS = {
    shadow: {
        mtl: "shadow/heartless-3.vox-0-heartless-2.mtl",
        obj: "shadow/heartless-3.vox-0-heartless-2.obj",
    },
    vivi: {
        mtl: "vivi/vivi.vox-0-vivi-chibi.mtl",
        obj: "vivi/vivi.vox-0-vivi-chibi.obj",
    },
};

const Home = () => {
    const { colorMode, setColorMode } = useColorMode();
    const { model, rotate } = useControls({
        darkTheme: {
            value: colorMode === "dark" ? true : false,
            onChange: (val) => {
                setColorMode(val === true ? "dark" : "light");
            },
        },
        model: {
            value: Object.keys(MODELS)[0] as keyof typeof MODELS,
            options: [...Object.keys(MODELS)] as Array<keyof typeof MODELS>,
        },
        rotate: false,
    });
    const lighting = useControls(
        "Lighting",
        {
            castShadow: true,
            color: "#FFF",
            intensity: {
                min: 0,
                max: 1,
                value: 0.4,
            },
        },
        {
            collapsed: true,
        }
    );
    const debug = useControls(
        "Debug",
        {
            grid: false,
            wireframe: false,
        },
        {
            collapsed: true,
        }
    );

    return (
        <>
            <Box height={"100vh"} width={"100vw"} transition="0.5s ease-out" overflow={"hidden"}>
                <Canvas shadows={true}>
                    <Suspense fallback={null}>
                        <SetCamera />
                        <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeBufferGeometry args={[50, 50]} />
                            <shadowMaterial
                                color={colorMode === "light" ? "#464343" : "#000"}
                                transparent={true}
                            />
                        </mesh>

                        <Lights
                            ambientLight={{
                                color: lighting.color,
                                intensity: lighting.intensity,
                            }}
                            directionalLight={{
                                castShadow: lighting.castShadow,
                                intensity: 1.3,
                                position: [10, 30, 10],
                                shadowRadius: 100,
                            }}
                        />
                        {debug.grid && (
                            <>
                                <gridHelper
                                    args={[10, 10, 0x006600, 0x006600]}
                                    position={[0, 0, 0]}
                                />
                                <gridHelper
                                    args={[10, 10, 0x000066, 0x000066]}
                                    position={[0, 5, -5]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                <gridHelper
                                    args={[10, 10, 0x660000, 0x660000]}
                                    position={[-5, 5, 0]}
                                    rotation={[0, 0, Math.PI / 2]}
                                />
                            </>
                        )}
                        <OrbitControls autoRotate={rotate} />
                        <Model
                            mtlPath={MODELS[model].mtl}
                            objPath={MODELS[model].obj}
                            options={{
                                wireframe: debug.wireframe,
                            }}
                        />
                        {/* <EffectComposer> */}
                        {/* <Grid scale={scale} /> */}
                        {/* <Bloom
                                luminanceThreshold={0.5}
                                luminanceSmoothing={0.4}
                                // height={1000}
                                opacity={0.5}
                                intensity={0.75}
                            /> */}
                        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
                        {/* </EffectComposer> */}
                    </Suspense>
                </Canvas>
                <Leva
                    flat={true}
                    titleBar={{
                        drag: false,
                        filter: false,
                        title: "Controls",
                    }}
                />
            </Box>
        </>
    );
};

export default Home;
