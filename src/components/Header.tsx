import { Box } from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box
            w="100%"
            p={4}
            background="transparent"
            zIndex={1}
            style={{
                position: "fixed",
            }}
        >
            Voxel Blox
        </Box>
    );
};
