import { Box, Button, Card, CardHeader, ListItem, Table, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"

import HeroFrom from "./Form"
import { useState } from "react"
import HeroPreview from "./HeroPreview";

import "./style.css"
import StatusTable from "./StatusTable";

export default function HeroSection() {

    const [isEdit, setIsEdit] = useState(false);

    return <>

        <DashboardContent>
            <Box sx={{ margin: "2rem 0", width: "100%" }}>
                <Card sx={{
                    padding: "2rem"
                }}>
                    <StatusTable />
                </Card>
            </Box>
            <Box sx={{ perspective: "1200px", width: "100%" }}>
                <Box className={`flip-card ${isEdit ? "flipped" : ""}`}>
                    {/* Front */}
                    <Card className="card-face card-front">
                        <HeroPreview onEdit={() => setIsEdit(true)} data={{
                            ar_name: "حسن",
                            en_name: "hassan",
                            ar_title: "مطور ويب ",
                            en_title: "web developemt",
                            ar_description: "دة الوصف العربي ليا ",
                            en_description: "this is mu english des",
                            profile_photo: "https://hassanalihassan-protfilio.netlify.app/imgs/logo2.jpg",
                            button_link: "http//:www.google.com"
                        }} />
                    </Card>

                    {/* Back */}
                    <Card className="card-face card-back">
                        <HeroFrom
                            onCancel={() => setIsEdit(false)}
                        />
                    </Card>
                </Box>
            </Box>

        </DashboardContent>
    </>

}