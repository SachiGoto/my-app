import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100", // This will be overridden by your gradient
        color: "gray.800",
        background: `radial-gradient(circle at center, deepskyblue, rgb(206, 130, 239), rgb(59, 59, 199))`,
        backgroundSize: "180% 180%",
        animation: "gradientAnimation 35s ease infinite",
        height: "100vh",
        width: "100vw",
        "@keyframes gradientAnimation": {
          "0%, 100%": { backgroundPosition: "82% 0%" },
          "50%": { backgroundPosition: "0% 100%" },
        },
      },
    },
  },
});
