import { Box, Button, ListItem, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"

export default function HeroSection() {


    return <>

        <DashboardContent>
            <Box
                sx={{
                    mb: 5,
                    display: 'flex',
                    alignItems: 'start',
                    flexFlow: "column",
                    justifyContent: "flex-start"
                }}
            >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Working Progress Section Customization
                </Typography>

                <Box>
                    <Box
                        component="ul"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {
                            [
                                "custom Card of working progress",
                            ].map((item, index) => <ListItem key={index}>{item}</ListItem>)
                        }

                    </Box>
                </Box>
            </Box >
        </DashboardContent>
    </>

}