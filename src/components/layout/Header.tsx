import { Box, Flex, Heading } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <Flex as="header" width="full" align="center">
            <Heading as="h1" size="md"></Heading>

            <Box marginLeft="auto">
                <ThemeToggle />
            </Box>
        </Flex>
    );
};

export default Header;
