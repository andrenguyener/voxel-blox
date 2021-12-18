import { Suspense } from "react";

import { useColorMode, Box, Flex } from "@chakra-ui/react";
import { OrbitControls } from "@react-three/drei";
import { Grid, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Canvas, useThree } from "react-three-fiber";

import ThemeToggle from "../components/layout/ThemeToggle";
import { Lights } from "../components/Lights";
import { Model } from "../components/Model";

const SetCamera = () => {
    useThree(({ camera }) => {
        // camera.rotation.set(deg2rad(30), 0, 0);
        camera.position.y = 5;
        camera.position.x = 15 * Math.sin(0.2 * Math.PI);
        camera.position.z = 15 * Math.cos(0.2 * Math.PI);
    });
    return null;
};

const Home = () => {
    const { colorMode } = useColorMode();
    const { scale } = useControls({
        scale: {
            min: 0.1,
            max: 4,
            value: 0.5,
        },
    });
    return (
        <>
            <Box height={"100vh"} width={"100vw"} transition="0.5s ease-out" overflow={"hidden"}>
                <Flex as="header" width="full" align="center" justify={"flex-end"}>
                    <ThemeToggle />
                </Flex>
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
                                color: "#FFF",
                                intensity: 0.4,
                            }}
                            directionalLight={{
                                castShadow: true,
                                intensity: 1.3,
                                // position: [300 * 1.5, 400 * 1.5, 500 * 1.5],
                                position: [10, 30, 10],
                                shadowRadius: 100,
                            }}
                        />
                        <OrbitControls />
                        <Model
                            mtlPath="shadow/heartless-3.vox-0-heartless-2.mtl"
                            objPath="shadow/heartless-3.vox-0-heartless-2.obj"
                            // rotate={true}
                        />
                        <EffectComposer>
                            <Grid scale={scale} />
                        </EffectComposer>
                    </Suspense>
                </Canvas>
            </Box>
        </>
    );
};

export default Home;
