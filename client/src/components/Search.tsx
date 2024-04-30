import CloseIcon from "@mui/icons-material/Close"
import {
    AppBar,
    Autocomplete,
    Box,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@mui/material"
import { ChangeEvent, useState } from "react"

import useRecentSearchesStore from "../store/store"

const uppercaseCityName = (city: string) =>
    city.replace(/\b\w/g, (char) => char.toUpperCase())

interface SearchBarProps {
    onSearch: (value: string) => void
    onCityClear: (city: string) => void
}
export default function Search({ onSearch, onCityClear }: SearchBarProps) {
    const { data, removeData } = useRecentSearchesStore()

    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log({
            event
        })
        setInputValue(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue !== "") {
            onSearch(inputValue)
        }
    }

    const handleClearCity = (city: string) => {
        console.log("Clearing city", city)
        removeData(city)
        onCityClear(city)
    }

    const options = data.map(([city]) => uppercaseCityName(city))

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" }
                        }}
                    >
                        Weather
                    </Typography>
                    <Autocomplete
                        freeSolo
                        options={options}
                        onChange={(_, value) => {
                            if (value) {
                                onSearch(value.toLowerCase())
                            }
                        }}
                        renderOption={(props, option) => {
                            return (
                                <Box
                                    component="li"
                                    sx={{ "& > img": { mr: 2 } }}
                                    {...props}
                                >
                                    {option}
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            right: "8px"
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation() // Prevent bubbling
                                            handleClearCity(
                                                option.toLowerCase()
                                            )
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps
                                }}
                                placeholder="Search city, then press Enter"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        minWidth: "300px",
                                        maxWidth: "500px",
                                        mt: 2,
                                        mb: 2,
                                        borderRadius: 4,
                                        backgroundColor: "white",
                                        "& fieldset": {
                                            borderColor: "lightgray"
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "gray"
                                        }
                                    }
                                }}
                            />
                        )}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
