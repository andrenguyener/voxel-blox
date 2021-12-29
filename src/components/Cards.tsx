import React from "react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Image, useColorModeValue, IconButton } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import type { Models } from "../types";
import { MotionBox } from "./motion";

const CARD_HEIGHT = 225;
const CARD_WIDTH = 200;

export const Cards = ({
    models,
    selectedModel,
    setSelectedModel,
}: {
    models: Models;
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [expandOverlay, setExpandOverlay] = React.useState(false);
    const [displayExpandToggle, setDisplayExpandToggle] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            const expand = window.innerWidth < Object.keys(models).length * CARD_WIDTH;
            setDisplayExpandToggle(expand);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const selectedIndex = Object.keys(models).findIndex((modelKey) => modelKey === selectedModel);
    const overlayBg = useColorModeValue("blackAlpha.900", "blackAlpha.800");
    return (
        <>
            <AnimatePresence>
                {expandOverlay && (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        bgColor={overlayBg}
                        style={{
                            position: "fixed",

                            height: "100%",
                            width: "100%",
                            top: 0,
                        }}
                    />
                )}
            </AnimatePresence>
            <MotionBox
                w="100%"
                p={4}
                zIndex={1}
                custom={expandOverlay}
                variants={{
                    expand: (shouldExpand: boolean) => {
                        return {
                            height: shouldExpand ? "auto" : "250px",
                        };
                    },
                }}
                initial={false}
                animate="expand"
                style={{
                    position: "fixed",
                    bottom: 0,
                }}
            >
                <HStack spacing={2} justify="center" align={"center"} flexWrap={"wrap"}>
                    <AnimatePresence initial={false}>
                        {Object.values(models).map((model, index) => {
                            return (
                                <MotionBox
                                    key={model.label}
                                    p={5}
                                    w={CARD_WIDTH}
                                    h={CARD_HEIGHT}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    bgColor={"whiteAlpha.50"}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        backdropFilter: "blur(10px)",
                                        cursor: "pointer",
                                        marginBottom: "10px",
                                    }}
                                    custom={[index, selectedIndex]}
                                    variants={{
                                        enter: ([modelIndex, selectedModelIndex]: [
                                            number,
                                            number
                                        ]) => {
                                            return {
                                                opacity:
                                                    modelIndex === selectedModelIndex ? 1 : 0.25,
                                            };
                                        },
                                    }}
                                    animate="enter"
                                    transition={{
                                        opacity: { duration: 0.2 },
                                    }}
                                    onClick={() => {
                                        setSelectedModel(Object.keys(models)[index]);
                                        setExpandOverlay(false);
                                    }}
                                >
                                    <Box
                                        style={{
                                            backgroundImage: model.background,
                                        }}
                                        overflow={"hidden"}
                                    >
                                        <Image
                                            src={model.image}
                                            style={{
                                                transform: "scale(1.3)",
                                            }}
                                        />
                                    </Box>
                                    <Heading
                                        fontSize="12px"
                                        letterSpacing={"1px"}
                                        marginTop="10px"
                                        fontFamily={"var(--chakra-fonts-mono)"}
                                    >
                                        {model.label}
                                    </Heading>
                                </MotionBox>
                            );
                        })}
                    </AnimatePresence>
                </HStack>
                {displayExpandToggle && (
                    <IconButton
                        style={{
                            position: "fixed",
                            bottom: 15,
                            right: 15,
                        }}
                        aria-label="Toggle button"
                        icon={expandOverlay ? <TriangleDownIcon /> : <TriangleUpIcon />}
                        onClick={() => setExpandOverlay(!expandOverlay)}
                    />
                )}
            </MotionBox>
        </>
    );
};
