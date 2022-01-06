import React, { Suspense } from "react";

import { useColorMode, useBreakpoint, Box, Fade } from "@chakra-ui/react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, Leva } from "leva";

import { Cards, Header, Lights, Model, LoadingSpinner } from "../components";
import type { Models } from "../types";

// Todo make gradient variables
const MODELS: Models = {
    shadow: {
        mtl: "models/shadow/shadow.mtl",
        obj: "models/shadow/shadow.obj",
        image: "models/shadow/image-300.png",
        background: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
        imageStyle: {
            transform: "scale(1.3)",
        },
        label: "Shadow",
    },
    vivi: {
        mtl: "models/vivi/vivi.mtl",
        obj: "models/vivi/vivi.obj",
        image: "models/vivi/image-300.png",
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        imageStyle: {
            transform: "scale(1.3)",
        },
        label: "Vivi",
    },
    soldier: {
        mtl: "models/soldier/soldier.mtl",
        obj: "models/soldier/soldier.obj",
        image: "models/soldier/image-300.png",
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        imageStyle: {
            transform: "scale(1.4) translateY(-5px) translateX(2px)",
        },
        label: "Soldier",
    },
    moogle: {
        mtl: "models/moogle/moogle.mtl",
        obj: "models/moogle/moogle.obj",
        image: "models/moogle/image-300.png",
        background:
            "linear-gradient( 109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
        imageStyle: {
            transform: "scale(1.3) translateY(10px)",
        },
        label: "Moogle",
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
            scene.position.y = -3;
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
    const breakpoint = useBreakpoint();
    const { colorMode, setColorMode } = useColorMode();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isCollapsed, setIsCollapsed] = React.useState<null | boolean>(null);
    const [selectedModelKey, setSelectedModelKey] = React.useState<keyof typeof MODELS>(
        Object.keys(MODELS)[0]
    );

    React.useEffect(() => {
        if (isCollapsed === null && breakpoint) {
            const initial = breakpoint === "sm" || breakpoint === "base";
            setIsCollapsed(initial);
        }
    }, [breakpoint]);

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
                value: 0.5,
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
                in={!isLoading}
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
                    titleBar={{
                        drag: false,
                        filter: false,
                        title: "Controls",
                    }}
                    hideCopyButton={true}
                    collapsed={{
                        collapsed: !!isCollapsed,
                        onChange: (val) => {
                            setIsCollapsed(val);
                        },
                    }}
                />
                <Cards
                    models={MODELS}
                    setSelectedModelKey={setSelectedModelKey}
                    selectedModelKey={selectedModelKey}
                />
            </Fade>
        </Box>
    );
};

export default Home;
