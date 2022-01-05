import Link from "next/link";

import { Box, Button, Heading, Image, useColorMode } from "@chakra-ui/react";

import { MotionBox } from "../components/motion/Box";

const Page404 = () => {
    const { colorMode } = useColorMode();

    return (
        <>
            <MotionBox
                animate={{ y: 20 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                width={["100%", "70%", "60%", "60%"]}
                margin="0 auto"
            >
                <Image src="/404-error_lost_in space.svg" alt="Error 404 not found Illustration" />
            </MotionBox>

            <Box marginY={4}>
                <Heading textAlign="center">Page not Found.</Heading>

                <Box textAlign="center" marginTop={4}>
                    <Link href="/" passHref>
                        <Button backgroundColor={colorMode === "light" ? "gray.300" : "purple.400"}>
                            Let&apos;s Head Back
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default Page404;
