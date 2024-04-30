import { Box, Snackbar, Stack } from "@mui/material"
import axios from "axios"
import { useState } from "react"

import Search from "./components/Search"
import WeatherTodayCard from "./components/WeatherTodayCard"
import useRecentSearchesStore from "./store/store"

const BASE_URL = "http://localhost:3001"

function WeatherApp() {
    const { data, addData } = useRecentSearchesStore()

    const [snackbarOpen, setSnackbarOpen] = useState<{
        open: boolean
        message: string
    }>({
        open: false,
        message: ""
    })

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return
        }

        setSnackbarOpen({
            open: false,
            message: ""
        })
    }

    const handleSearch = async (value: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/weather?city=${value}`
            )

            console.log(response.data)
            addData(value, response.data)
        } catch (error) {
            console.error(error)
            setSnackbarOpen({
                open: true,
                message: `Error fetching weather data: ${error}`
            })
        }
    }

    const handleCityClear = (city: string) => {}

    return (
        <Box>
            <Snackbar
                open={snackbarOpen.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
            />

            <Search onSearch={handleSearch} onCityClear={handleCityClear} />
            <Stack width="vw" alignItems="center" justifyContent="center" p={2}>
                {data.length > 0 && (
                    <WeatherTodayCard
                        location={data[0][1].location}
                        current={data[0][1].current}
                    />
                )}
            </Stack>
        </Box>
    )
}

export default WeatherApp
