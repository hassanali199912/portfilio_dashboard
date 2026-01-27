import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Card, Typography, Divider, Grid, Button, TextField, Autocomplete, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { Controller, FormProvider, useForm, useFormContext, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import BackBtn from "src/components/BackBtn";
import { FormComponent, FormLayoutItem } from "src/components/FormLayouts";
import { useToast } from "src/context/toast";
import { DashboardContent } from "src/layouts/dashboard";
import { PortfolioFormData, portfolioFormSchema } from "src/schemas/portfolio.schema";
import { AppDispatch } from "src/stores";
import { CreatePortfolio, PortfolioItem, ProjectType, UpdatePortfolio } from "src/stores/slices/portfolio";


interface contentItems {
    label: string,
    value: string | undefined
}


interface ContentBoxProps {
    title: string;
    content: contentItems[];
    size: number
}
interface Props {
    data: PortfolioItem;
}


const PortfolioCreate = () => {

    const toast = useToast();
    const form = useForm<PortfolioFormData>({
        resolver: zodResolver(portfolioFormSchema),
        defaultValues: {
            title: {
                ar: "",
                en: ""
            },
            shortDescription: {
                ar: "",
                en: ""
            },
            role: {
                ar: "",
                en: ""
            },
            image: "",
            techStack: [],
            projectType: "",
            liveUrl: "",
            githubUrl: "",
            isFeatured: false,
            isVisible: false,
            order: 0,
        }
    });

    const dispatch = useDispatch<AppDispatch>()
    const [disabled, setDisable] = useState<boolean>(false)
    const onSubmit = (values: PortfolioFormData) => {
        setDisable(true);
        dispatch(CreatePortfolio(values as Partial<PortfolioItem>)).then(res => {
            setDisable(false);
            if (res.payload.success) {
                toast.showSuccess("Portfolio Created Successfully");
                form.reset();
            } else {
                toast.showError("Some Error Happen");
            }
        })

    };



    return (
        <>
            <DashboardContent maxWidth="xl">
                <BackBtn link="/portfolio-section" />
                <FormProvider {...form}  >
                    <Box component="form" onSubmit={form.handleSubmit(onSubmit, (error) => {
                        if (error) {
                            toast.showError("Some Error Happen , Make Sure Data Is Valid")
                        }
                    })} >
                        <Button
                            disabled={disabled}
                            type="submit" variant="contained" sx={{ display: "block", mb: 3, ml: "auto" }}>
                            Create
                        </Button>
                        <Grid container spacing={2}>
                            <Grid size={{
                                xs: 12,
                                md: 6
                            }}>
                                <FlagsSection disabled={disabled} />
                                <LocalizedSection title="Project Title" name="title" disabled={disabled} />
                                <TechStackAndTypeSection disabled={disabled} />
                                <LinksAndOrderSection disabled={disabled} />

                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}
                            >
                                <LocalizedSection title="Project Role" name="role" textArea={true} disabled={disabled} />
                                <LocalizedSection title="Short Description" name="shortDescription" textArea={true} disabled={disabled} />
                            </Grid>
                        </Grid>
                    </Box>
                </FormProvider>
            </DashboardContent>
        </>
    );
};




//#region





const LocalizedSection = ({ title, name, textArea = false, disabled = false }: { title: string; name: any, textArea?: boolean, disabled?: boolean }) => {
    const { control, formState: { errors }
    } = useFormContext();

    const fieldErrors = errors?.[name] as {
        ar?: { message?: string };
        en?: { message?: string };
    };

    const arError = fieldErrors?.ar?.message;
    const enError = fieldErrors?.en?.message;
    // const arError = errors?.[name]?.ar?.message;
    // const enError = errors?.[name]?.en?.message;
    return (
        <>
            <Card sx={{ mb: 3, p: 3 }} >
                <Typography variant="h5" mb={2}>{title}</Typography>
                <Grid container spacing={2}>
                    <Grid size={{
                        xs: 12, md: 12
                    }}>
                        <Controller
                            disabled={disabled}
                            name={`${name}.ar`}
                            control={control}
                            render={({ field }) => {
                                if (textArea) {
                                    return <TextField
                                        fullWidth
                                        multiline
                                        minRows={5}
                                        {...field}
                                        label="Arabic"
                                        error={!!arError}
                                        helperText={arError}
                                    />
                                }
                                return <TextField {...field} label="Arabic" fullWidth error={!!arError}
                                    helperText={arError} />
                            }
                            }
                        />
                    </Grid>

                    <Grid size={{
                        xs: 12, md: 12
                    }}>
                        <Controller
                            disabled={disabled}
                            name={`${name}.en`}
                            control={control}
                            render={({ field }) => {
                                if (textArea) {
                                    return <TextField fullWidth
                                        multiline minRows={5} {...field} label="English" error={!!enError}
                                        helperText={enError} />
                                }
                                return <TextField {...field} label="English" error={!!enError}
                                    helperText={enError} fullWidth />
                            }}
                        />
                    </Grid>
                </Grid>
            </Card>

        </>
    );
};

const TechStackAndTypeSection = ({ disabled = false }: { disabled?: boolean }) => {
    const { control, formState: { errors } } = useFormContext();
    const projectTypes = ["personal", "freelance", "government", "company"];

    return (
        <Card sx={{ mb: 3, p: 3 }}>
            <Typography variant="h5" mb={2}>Tech And Type </Typography>
            <Controller
                disabled={disabled}
                name="techStack"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        value={field.value}
                        onChange={(_, value) => field.onChange(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Technologies"
                                error={!!errors?.techStack}
                                helperText={errors?.techStack?.message as string} />
                        )}
                    />
                )}
            />
            <Divider variant="middle" style={{
                padding: "1rem"
            }} />
            <Controller
                disabled={disabled}
                name="projectType"
                control={control}
                render={({ field }) => (
                    <TextField select fullWidth label="Project Type" {...field} error={!!errors?.projectType}
                        helperText={errors?.projectType?.message as string}>
                        {projectTypes.map(type => (
                            <MenuItem key={type} value={type} >
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </Card>
    );
};

const FlagsSection = ({ disabled = false }: { disabled?: boolean }) => {
    const { control } = useFormContext();

    return (
        <Card sx={{ mb: 3, p: 3 }}>
            <FormControlLabel
                control={
                    <Controller
                        disabled={disabled}

                        name="isFeatured"
                        control={control}
                        render={({ field }) => (
                            <Switch checked={field.value} onChange={field.onChange} />
                        )}
                    />
                }
                label="Featured Project"
            />

            <FormControlLabel
                control={
                    <Controller
                        disabled={disabled}

                        name="isVisible"
                        control={control}
                        render={({ field }) => (
                            <Switch checked={field.value} onChange={field.onChange} />
                        )}
                    />
                }
                label="Visible"
            />
        </Card>
    );
};

const LinksAndOrderSection = ({ disabled = false }: { disabled?: boolean }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid size={{
                    xs: 12, md: 12
                }}>
                    <Controller
                        disabled={disabled}

                        name="image"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Enter Image Url" fullWidth
                                error={!!errors?.image}
                                helperText={errors?.image?.message as string} />
                        )}
                    />
                </Grid>
                <Grid size={{
                    xs: 12, md: 12
                }}>
                    <Controller
                        disabled={disabled}

                        name="liveUrl"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Live URL" fullWidth error={!!errors?.liveUrl}
                                helperText={errors?.liveUrl?.message as string} />
                        )}
                    />
                </Grid>

                <Grid size={{
                    xs: 12, md: 12
                }}>
                    <Controller
                        disabled={disabled}

                        name="githubUrl"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Github URL" fullWidth error={!!errors?.githubUrl}
                                helperText={errors?.githubUrl?.message as string} />
                        )}
                    />
                </Grid>

                <Grid size={{
                    xs: 12, md: 12
                }}>
                    <Controller
                        disabled={disabled}

                        name="order"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} onChange={(e) => field.onChange(Number(e.target.value))} type="number" label="Order" fullWidth />
                        )}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};


//#endregion

export default PortfolioCreate;
