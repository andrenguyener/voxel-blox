import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { Styles } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

import { colors } from "./colors";
import { Button } from "./components";
import { fonts } from "./fonts";

export const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

// setup light/dark mode global defaults
const styles: Styles = {
    global: (props) => ({
        body: {
            color: mode("#5c5a71", "#e9e9ee")(props),
            bg: mode("#e9e9ee", "purple.900")(props),
        },
    }),
};

export const customTheme = extendTheme({
    config,
    fonts,
    colors,
    components: {
        Button,
    },
    styles,
});
