import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { Button } from "./components";
import { fonts } from "./fonts";

export const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

export const customTheme = extendTheme({
    config,
    fonts,
    colors,
    components: {
        Button,
    },
});
