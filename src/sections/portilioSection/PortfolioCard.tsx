import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    Chip,
    Stack,
    Box,
    Skeleton
} from "@mui/material";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DropdownMenu, { options } from "src/components/DropdownMenu";
import { PortfolioItem } from "src/stores/slices/portfolio";

interface Props {
    data: PortfolioItem,
    handleDelete: (id: string) => void;
}


export default function PortfolioCard({ data, handleDelete }: Props) {

    const navigator = useNavigate();

    const menuOptions: options[] = [
        {
            label: "Edit Project",
            value: "edit",
        },
        {
            label: "Delete Project",
            value: "delete",
        },
    ]

    const handleNavigate = () => {
        navigator(`/portfolio-section/${data._id}`)
    }

    return (
        <Grid

            size={{
                xs: 12,
                md: 4
            }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-4px)",
                    },
                }}
            >
                {/* Image */}
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={
                            //data.image ||
                            "assets/images/product/product-1.webp"}
                        alt={data.title.en}
                    />

                    {data.isFeatured && (
                        <Chip
                            label="Featured"
                            color="primary"
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                fontWeight: 600,
                            }}
                        />
                    )}

                    <Box sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 30,
                        height: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "lightgray",
                        borderRadius: "50%",
                        fontWeight: 800

                    }}>
                        <DropdownMenu
                            rowId={data._id} options={menuOptions}
                            handleChoice={(value, id) => {
                                console.log(value);

                                if (value === "edit") {
                                    handleNavigate();
                                }
                                if (value === "delete") {
                                    handleDelete(id)
                                }
                            }}
                        />
                    </Box>

                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {data.projectType.toUpperCase()}
                    </Typography>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        {data.title.en}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {data.shortDescription.en}
                    </Typography>

                    <Typography variant="body2" fontWeight={500} sx={{ mb: 2 }}>
                        {data.role.en}
                    </Typography>

                    {/* Tech Stack */}
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {data.techStack.map((tech) => (
                            <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ px: 2, pb: 2 }}>
                    {data.githubUrl && (
                        <Button
                            size="small"
                            startIcon={<FaGithub />}
                            href={data.githubUrl}
                            target="_blank"
                        >
                            GitHub
                        </Button>
                    )}

                    {data.liveUrl && (
                        <Button
                            size="small"
                            href={data.liveUrl}
                            target="_blank"
                            variant="contained"
                        >
                            Live Demo
                        </Button>
                    )}


                    <Button
                        style={{
                            marginLeft: "auto"
                        }}
                        size="medium"
                        color="primary"
                        variant="contained"
                        onClick={handleNavigate}
                    >
                        View
                    </Button>

                </CardActions>
            </Card>
        </Grid>
    );
}






export function CardSkeleton() {

    return <>
        <Grid

            size={{
                xs: 12,
                md: 4
            }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-4px)",
                    },
                }}
            >
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                <CardContent>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
            </Card>
        </Grid>

    </>
}