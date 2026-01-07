import { Box, Button, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"

export default function Blank() {


    return <>

        <DashboardContent>
            <Box
                sx={{
                    mb: 5,
                    display: 'flex',
                    alignItems: 'start',
                }}
            >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Blank
                </Typography>
            </Box >
        </DashboardContent>
    </>

}