import { Box, HStack, Heading, Image } from "@chakra-ui/react";

import type { Models } from "../types";

export const Cards = ({ models }: { models: Models }) => {
    return (
        <Box
            w="100%"
            p={4}
            zIndex={1}
            style={{
                position: "fixed",
                bottom: 0,
            }}
        >
            <HStack spacing={2} justify="center" align={"center"}>
                {Object.values(models).map((model) => {
                    return <Feature key={model.label} title={model.label} />;
                })}
            </HStack>
        </Box>
    );
};

const Feature = ({ title }: { title: string }) => {
    return (
        <Box
            p={5}
            w={"200px"}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(214, 213, 213, 0.048)",
            }}
        >
            <Image src="https://via.placeholder.com/150" alt="Placeholder Image" />
            <Heading fontSize="l" marginTop="10px">
                {title}
            </Heading>
        </Box>
    );
};
