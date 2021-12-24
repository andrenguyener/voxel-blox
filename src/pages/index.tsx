import React, { Suspense } from "react";

import { useColorMode, Box, VStack, HStack, Heading, Text } from "@chakra-ui/react";
import { OrbitControls, Environment } from "@react-three/drei";
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
        (camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        if (!initialLoaded) {
            scene.position.y = -2;
            camera.manual = true;
        }
    });
    return null;
};

const MODELS = {
    shadow: {
        mtl: "models/shadow/heartless-3.vox-0-heartless-2.mtl",
        obj: "models/shadow/heartless-3.vox-0-heartless-2.obj",
    },
    vivi: {
        mtl: "models/vivi/vivi.vox-0-vivi-chibi.mtl",
        obj: "models/vivi/vivi.vox-0-vivi-chibi.obj",
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
                max: 2,
                value: 0.25,
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
        <Box height={"100vh"} width={"100vw"} transition="0.5s ease-out" overflow={"hidden"}>
            <VStack
                // divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                direction="column"
                align="stretch"
                height={"100%"}
            >
                <Box w="100%" p={4} background="transparent">
                    Voxel Blox
                </Box>
                <Canvas
                    shadows={true}
                    dpr={[1, 2]}
                    camera={{
                        position: [6, 2, 9],
                        fov: 100,
                    }}
                >
                    <Suspense fallback={null}>
                        <fog attach="fog" args={["#17171b", 30, 40]} />

                        <SetCamera />
                        <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeBufferGeometry args={[250, 250]} />
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
                                intensity: 1,
                                position: [10, 10, 6],
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

                        <Environment preset="dawn" />
                    </Suspense>
                </Canvas>
                <Box w="100%" height="300px" p={4}>
                    <HStack spacing={2} justify="center">
                        <Feature
                            title="Plan Money"
                            desc="The future can be even brighter but a goal without a plan is just a wish"
                        />
                        <Feature
                            title="Save Money"
                            desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
                        />
                    </HStack>
                </Box>
                <Leva
                    flat={true}
                    titleBar={{
                        drag: false,
                        filter: false,
                        title: "Controls",
                    }}
                />
            </VStack>
        </Box>
    );
};

const Feature = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <Heading fontSize="xl">{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box>
    );
};

export default Home;
