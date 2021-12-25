import { Fade, Box, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = ({ isIn }: { isIn: boolean }) => {
    return (
        <Fade
            in={isIn}
            transition={{
                exit: {
                    duration: 1,
                },
            }}
        >
            <Box
                position="fixed"
                w="100%"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="xl" />
            </Box>
        </Fade>
    );
};
