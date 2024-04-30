import { createTheme, responsiveFontSizes } from "@mui/material/styles"

let theme = createTheme({
    // Customize your theme here, refer to MUI documentation for options
    palette: {
        primary: {
            main: "#3f51b5"
        },
        secondary: {
            main: "#f50057"
        }
    }
})

theme = responsiveFontSizes(theme) // For responsive typography

export default theme
