import { Box, HStack, Heading, Text } from "@chakra-ui/react";

export const Cards = ({ height }: { height: string }) => {
    return (
        <Box w="100%" h={height} p={4}>
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
