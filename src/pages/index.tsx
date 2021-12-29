import React, { Suspense } from "react";

import { useColorMode, Box, Fade, useBreakpoint } from "@chakra-ui/react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, Leva } from "leva";

import { Cards, Header, Lights, Model, LoadingSpinner } from "../components";
import type { Models } from "../types";

// Todo make gradient variables
const MODELS: Models = {
    shadow: {
        mtl: "models/shadow/heartless-3.vox-0-heartless-2.mtl",
        obj: "models/shadow/heartless-3.vox-0-heartless-2.obj",
        image: "models/shadow/image-300.png",
        background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        label: "Shadow",
    },
    vivi: {
        mtl: "models/vivi/vivi.vox-0-vivi-chibi.mtl",
        obj: "models/vivi/vivi.vox-0-vivi-chibi.obj",
        image: "models/vivi/image-300.png",
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        label: "Vivi",
    },
    shadow2: {
        mtl: "models/shadow/heartless-3.vox-0-heartless-2.mtl",
        obj: "models/shadow/heartless-3.vox-0-heartless-2.obj",
        image: "models/shadow/image-300.png",
        background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        label: "Shadow2",
    },
    vivi2: {
        mtl: "models/vivi/vivi.vox-0-vivi-chibi.mtl",
        obj: "models/vivi/vivi.vox-0-vivi-chibi.obj",
        image: "models/vivi/image-300.png",
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        label: "Vivi2",
    },
};

const UpdateCamera = () => {
    const [initialLoaded, setInitialLoaded] = React.useState(false);
    React.useEffect(() => {
        setInitialLoaded(true);
    }, []);

    useThree(({ camera, scene }) => {
        const currentAspect = (camera as THREE.PerspectiveCamera).aspect;
        const newAspect = window.innerWidth / window.innerHeight;
        if (currentAspect !== newAspect) {
            (camera as THREE.PerspectiveCamera).aspect = newAspect;
            camera.updateProjectionMatrix();
        }
        if (!initialLoaded) {
            scene.position.y = -2;
            camera.manual = true;
        }
    });

    return null;
};

const SetLoading = ({
    setIsLoading,
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    React.useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    }, []);

    return null;
};

const Home = () => {
    const { colorMode, setColorMode } = useColorMode();
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedModelKey, setSelectedModelKey] = React.useState<keyof typeof MODELS>(
        Object.keys(MODELS)[0]
    );

    const { rotate } = useControls({
        darkTheme: {
            value: colorMode === "dark",
            onChange: (enableDark) => {
                setColorMode(enableDark ? "dark" : "light");
            },
        },
        rotate: false,
    });
    const lighting = useControls(
        "Lighting",
        {
            castShadow: true,
            color: "#d8d8d8",
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
    const breakpoint = useBreakpoint();
    const isSmallScreen = breakpoint === "sm";

    if (!breakpoint) {
        return null;
    }

    return (
        <Box
            h="100vh"
            w="100vw"
            transition="0.5s ease-out"
            overflow={"hidden"}
            style={{ position: "relative" }}
        >
            <LoadingSpinner isIn={isLoading} />
            <Header />
            <Fade
                in={!!(!isLoading && breakpoint)}
                transition={{
                    enter: {
                        duration: 1,
                    },
                }}
                style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Canvas
                    shadows={true}
                    camera={{
                        position: [6, 2, 9],
                        fov: 85,
                    }}
                    style={{
                        position: "absolute",
                        height: "100vh",
                        width: "100vw",
                    }}
                >
                    <Suspense fallback={<SetLoading setIsLoading={setIsLoading} />}>
                        <UpdateCamera />
                        <fog attach="fog" args={["#17171b", 30, 40]} />
                        <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeBufferGeometry args={[250, 250]} />
                            <shadowMaterial color={undefined} opacity={0.5} transparent={true} />
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
                        <Model
                            mtlPath={MODELS[selectedModelKey].mtl}
                            objPath={MODELS[selectedModelKey].obj}
                            options={{
                                wireframe: debug.wireframe,
                            }}
                        />
                        <OrbitControls autoRotate={rotate} />
                        <Environment preset="dawn" />
                    </Suspense>
                </Canvas>
                <Leva
                    flat={true}
                    collapsed={isSmallScreen}
                    titleBar={{
                        drag: false,
                        filter: false,
                        title: "Controls",
                    }}
                    hideCopyButton={true}
                />
            </Fade>
            <Cards
                models={MODELS}
                setSelectedModel={setSelectedModelKey}
                selectedModel={selectedModelKey}
            />
        </Box>
    );
};

export default Home;
