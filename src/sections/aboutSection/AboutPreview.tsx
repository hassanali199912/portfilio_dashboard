import {
    Box,
    Card,
    Typography,
    IconButton,
    Stack,
    Divider,
    Avatar,
    Button
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

type HeroData = {
    image: string;
    arTitle: string;
    enTitle: string;
    arDescription: string;
    enDescription: string;
    social: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        github?: string;
    };
    cvLink: string;
};

const AboutPreview = ({
    data,
    onEdit,
}: {
    data: HeroData;
    onEdit: () => void;
}) => {
    return (
        <Card
            sx={{
                display: "flex",
                minHeight: 280,
                p: 2,
                position: "relative",
            }}
        >
            {/* Edit Button */}
            <IconButton
                onClick={onEdit}
                sx={{ position: "absolute", top: 12, right: 12 }}
            >
                <MdEdit />
            </IconButton>

            {/* Image */}
            <Box
                sx={{
                    width: 240,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Avatar
                    src={data.image}
                    variant="rounded"
                    sx={{ width: "100%", height: "100%" }}
                />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, pl: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                    {data.enTitle}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    {data.arTitle}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" mb={1}>
                    {data.enDescription}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {data.arDescription}
                </Typography>

                {/* Social */}
                <Stack direction="row" spacing={1} mt={2}>
                    {data.social.facebook && <FaFacebookF />}
                    {data.social.instagram && <FaInstagram />}
                    {data.social.linkedin && <FaLinkedinIn />}
                    {data.social.github && <FaGithub />}
                </Stack>

                {/* CV */}
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    href={data.cvLink}
                    target="_blank"
                >
                    Download CV
                </Button>
            </Box>
        </Card>
    );
};

export default AboutPreview;
