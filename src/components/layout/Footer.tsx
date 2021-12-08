import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex as="footer" width="full" align="center">
            <Text>{new Date().getFullYear()} - </Text>
        </Flex>
    );
};

export default Footer;
