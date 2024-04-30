import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography
} from "@mui/material"
import dayjs from "dayjs"

import { WeatherData } from "../types"

export default function WeatherTodayCard({ location, current }: WeatherData) {
    const formattedDate = dayjs(location.localtime).format("dddd, MMMM D, YYYY")
    const formattedTime = dayjs(location.localtime).format("h:mm A")

    return (
        <Box>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardHeader
                        title={location.name}
                        subheader={location.country}
                    />
                    <CardContent>
                        <Typography variant="h4">
                            {Math.round(current.temp_f)} °F
                        </Typography>
                        <Typography>{current.condition.text}</Typography>

                        <Typography variant="body2" color={"grey"}>
                            Feels like {Math.round(current.feelslike_f)} °F
                        </Typography>
                        <Typography variant="body2" color={"grey"}>
                            Wind: {current.wind_dir}{" "}
                            {Math.round(current.wind_mph)} mph
                        </Typography>
                        <Typography mt={2} variant="body2" color={"secondary"}>
                            {formattedDate}
                        </Typography>
                        <Typography variant="body2" color={"secondary"}>
                            Local Time: {formattedTime}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* TODO: 7-Day Forecast (Smaller Cards) */}
        </Box>
    )
}
