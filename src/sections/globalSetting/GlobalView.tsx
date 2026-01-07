import {
    Card,
    Avatar,
    Typography,
    Grid,
    Stack,
    Divider,
    Box
} from "@mui/material";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import ModelReusable from "src/components/ModelResuble";
import { GlobalSetting } from "src/stores/slices/global";

type Props = {
    data: GlobalSetting
};

const AboutSection = ({ data }: Props) => {
    const { contact, cvLink, personalImage } = data;

    return (
        <>
            {/* Top Section */}
            <Grid
                container
                spacing={2}
                alignItems="self-start"
                width={"100%"}
                padding={"2rem 1rem 0 1rem"}
            >
                <Grid size={{
                    md: 4,
                    xs: 12
                }}
                >
                    <Typography variant="h5" fontWeight={600} mb={2}>
                        Personal Information
                    </Typography>

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <MdEmail size={22} color="#1976d2" />
                            <Typography>{contact.email}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <MdPhone size={22} color="#1976d2" />
                            <Typography>{contact.phone}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <MdLocationOn size={22} color="#1976d2" />
                            <Typography>{contact.address}</Typography>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid size={{
                    md: 3,
                    xs: 12,
                }}>
                    <Box
                        component={"img"}
                        src={personalImage}
                        alt="Personal Image"
                        width={"100%"}
                    />
                </Grid>

                <Grid size={{
                    md: 5,
                    xs: 12
                }}>

                    <Box
                        sx={{
                            width: "80%",
                            margin: "auto",
                            height: 450,
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <iframe
                            src={cvLink}
                            title="CV Preview"
                            width="100%"
                            height="100%"
                            style={{
                                border: "none",
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

        </>
    );
};

export default AboutSection;
