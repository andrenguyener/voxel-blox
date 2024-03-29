import React from "react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { HStack, Heading, Image, useColorModeValue, IconButton } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import type { Models } from "../types";
import { MotionBox } from "./motion";

const CARD_HEIGHT = 175;
const CARD_WIDTH = 150;

export const Cards = ({
    models,
    selectedModelKey,
    setSelectedModelKey,
}: {
    models: Models;
    selectedModelKey: string;
    setSelectedModelKey: React.Dispatch<React.SetStateAction<string>>;
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

    const selectedIndex = Object.keys(models).findIndex(
        (modelKey) => modelKey === selectedModelKey
    );
    const overlayBg = useColorModeValue("blackAlpha.900", "blackAlpha.800");
    return (
        <>
            {/* @ts-ignore:next-line */}
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
            {/* @ts-ignore:next-line */}
            <MotionBox
                w="100%"
                p={4}
                zIndex={1}
                custom={expandOverlay}
                variants={{
                    expand: (shouldExpand: boolean) => {
                        return {
                            height: shouldExpand ? "auto" : CARD_HEIGHT + 35,
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
                    {/* @ts-ignore:next-line */}
                    <AnimatePresence initial={false}>
                        {Object.values(models).map((model, index) => {
                            return (
                                <MotionBox
                                    key={model.label}
                                    p={4}
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
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    onClick={() => {
                                        setSelectedModelKey(Object.keys(models)[index]);
                                        setExpandOverlay(false);
                                    }}
                                >
                                    <MotionBox
                                        style={{
                                            backgroundImage: model.background,
                                        }}
                                        overflow={"hidden"}
                                        custom={[index, selectedIndex]}
                                        variants={{
                                            enter: ([modelIndex, selectedModelIndex]: [
                                                number,
                                                number
                                            ]) => {
                                                return {
                                                    opacity:
                                                        modelIndex === selectedModelIndex
                                                            ? 1
                                                            : 0.25,
                                                };
                                            },
                                        }}
                                        animate="enter"
                                        transition={{
                                            opacity: { duration: 0.2 },
                                        }}
                                    >
                                        <Image src={model.image} style={model.imageStyle} />
                                    </MotionBox>
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
