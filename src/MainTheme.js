
const SPACING_BASE = 10

export default {

    palette: {
        dark: "#393848",

        purple: {
            "200": "#b39ddb",
            "300": "#9575cd",
            "400": "#7e57c2",
            "500": "#673ab7",
            "600": "#5e35b1",
            "700": "#512da8",
        },

        dark: {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
        }
    },

    spacing: coef => coef * SPACING_BASE,

    
}