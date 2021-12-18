import { IconButton, useColorMode } from "@chakra-ui/react";

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label="theme toggle"
            icon={colorMode === "light" ? <h6>light</h6> : <h6>dark</h6>}
            onClick={toggleColorMode}
        />
    );
};

export default ThemeToggle;
