import { Box, Grid, IconButton, Typography } from "@mui/material";
import { MdEditNotifications } from "react-icons/md";
import { heroSectionFormData } from "src/schemas/hero.schema";

interface HeroPreviewProps {
    data: heroSectionFormData;
    onEdit: () => void;
}

const HeroPreview = ({ data, onEdit }: HeroPreviewProps) => {
    const {
        ar_name,
        en_name,
        ar_title,
        en_title,
        ar_description,
        en_description,
        profile_photo,
        button_link,
    } = data;

    return (
        <Grid container spacing={3} height="100%">
            {/* Left Content */}
            <Grid size={{
                xs: 12,
                md: 8
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Hero Section</Typography>
                    <IconButton onClick={onEdit}>
                        <MdEditNotifications />
                    </IconButton>
                </Box>

                {/* Arabic */}
                <Box mt={3}>
                    <Typography variant="h6" color="text.secondary">
                        Arabic Content
                    </Typography>

                    <Typography mt={1}>
                        <strong>Name:</strong> {ar_name}
                    </Typography>

                    <Typography>
                        <strong>Title:</strong> {ar_title}
                    </Typography>

                    <Typography mt={1}>{ar_description}</Typography>
                </Box>

                {/* English */}
                <Box mt={4}>
                    <Typography variant="h6" color="text.secondary">
                        English Content
                    </Typography>

                    <Typography mt={1}>
                        <strong>Name:</strong> {en_name}
                    </Typography>

                    <Typography>
                        <strong>Title:</strong> {en_title}
                    </Typography>

                    <Typography mt={1}>{en_description}</Typography>
                </Box>

                {/* Button Link */}
                {button_link && (
                    <Box mt={3}>
                        <Typography variant="body2" color="primary">
                            Button Link: {button_link}
                        </Typography>
                    </Box>
                )}
            </Grid>

            {/* Right Image */}
            <Grid
                size={{
                    xs: 12,
                    md: 4
                }}>
                <Box
                    sx={{
                        height: "100%",
                        borderRadius: 2,
                        overflow: "hidden",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    {profile_photo ? (
                        <Box
                            component="img"
                            src={profile_photo}
                            alt="Hero"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                        >
                            <Typography color="text.secondary">
                                No Image Provided
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default HeroPreview;
