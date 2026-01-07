import { Grid, TextField, Button, Box } from "@mui/material";

const AboutEdit = ({ values, onChange, onSave }: any) => {
    return (
        <Box component="form">
            <Grid container spacing={2}>
                {/* Image */}
                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Profile Image URL"
                        fullWidth
                        value={values.image}
                        onChange={(e) => onChange("image", e.target.value)}
                    />
                </Grid>

                {/* Titles */}
                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Arabic Title"
                        fullWidth
                        value={values.arTitle}
                        onChange={(e) => onChange("arTitle", e.target.value)}
                    />
                </Grid>

                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="English Title"
                        fullWidth
                        value={values.enTitle}
                        onChange={(e) => onChange("enTitle", e.target.value)}
                    />
                </Grid>

                {/* Descriptions */}
                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Arabic Description"
                        multiline
                        minRows={4}
                        fullWidth
                        value={values.arDescription}
                        onChange={(e) => onChange("arDescription", e.target.value)}
                    />
                </Grid>

                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="English Description"
                        multiline
                        minRows={4}
                        fullWidth
                        value={values.enDescription}
                        onChange={(e) => onChange("enDescription", e.target.value)}
                    />
                </Grid>

                {/* Social */}
                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Facebook Link"
                        fullWidth
                        value={values.social.facebook}
                        onChange={(e) =>
                            onChange("social.facebook", e.target.value)
                        }
                    />
                </Grid>

                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Instagram Link"
                        fullWidth
                        value={values.social.instagram}
                        onChange={(e) =>
                            onChange("social.instagram", e.target.value)
                        }
                    />
                </Grid>

                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="LinkedIn Link"
                        fullWidth
                        value={values.social.linkedin}
                        onChange={(e) =>
                            onChange("social.linkedin", e.target.value)
                        }
                    />
                </Grid>

                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="Github Link"
                        fullWidth
                        value={values.social.github}
                        onChange={(e) =>
                            onChange("social.github", e.target.value)
                        }
                    />
                </Grid>

                {/* CV */}
                <Grid size={{
                    xs: 12
                }}>
                    <TextField
                        label="CV Link"
                        fullWidth
                        value={values.cvLink}
                        onChange={(e) => onChange("cvLink", e.target.value)}
                    />
                </Grid>

                {/* Save */}
                <Grid size={{
                    xs: 12
                }}>
                    <Button variant="contained" fullWidth onClick={onSave}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutEdit;
