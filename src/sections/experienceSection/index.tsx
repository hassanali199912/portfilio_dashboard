import { Box, Button, Card, Chip, Skeleton, Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressWithLabel from "src/components/CircularProgress";
import { FormLayoutItem, FormLayouts } from "src/components/FormLayouts";
import ModelReusable from "src/components/ModelResuble";
import ReusableTable, { TableColumn } from "src/components/TableResued";
import { useToast } from "src/context/toast";
import { DashboardContent } from "src/layouts/dashboard";
import { experienceSchema, experienceSchemaFormData } from "src/schemas/experience.schema";
import { AppDispatch, RootState } from "src/stores";
import { CreateExperience, DeleteExperience, ExperienceRow, GetAllExperience, UpdateExperience, ChangeVisiablillity } from "src/stores/slices/experience";



const ExperienceFormLayout: FormLayoutItem<experienceSchemaFormData>[] = [
    {
        name: "title.ar",
        label: "Arabic Title ",
        grid: 6,
    },
    {
        name: "title.en",
        label: "English Title ",
        grid: 6,
    },
    {
        name: "shortDescription.ar",
        label: "Arabic Short Description ",
        grid: 6,
        type: "text_area"
    },
    {
        name: "shortDescription.en",
        label: "English Short Description ",
        grid: 6,
        type: "text_area"
    },

    {
        name: "date",
        label: "Date ",
        grid: 12,
    },
    {
        name: "type",
        label: "Experience Type ",
        grid: 12,
        type: "select",
        options: [
            {
                label: "Education Type",
                value: "education"
            },
            {
                label: "Working Company",
                value: "work"
            },
            {
                label: "Training Period",
                value: "training"
            },


        ]
    },

    {
        name: "order",
        label: "Skill Order",
        grid: 12,
        type: "number"
    },

];




export default function index() {

    const toast = useToast();
    const sectionActions = [
        { label: "Edit", value: "edit" },
        { label: "Toggle Visibility", value: "toggle" },
        { label: "Delete", value: "delete" },
    ];

    const sectionColumns: TableColumn<ExperienceRow>[] = [
        {
            key: "type",
            label: "Type",
            render: (row) => <Chip label={row.type} color="primary" />,
        },
        {
            key: "title.en",
            label: "Title Name",
            render: (row) => <Typography>{row.title.en}</Typography>
        },
        {
            key: "isVisible",
            label: "Visibility",
            render: (row) => (
                <Switch checked={row.isVisible} disabled />
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (row) =>
                dayjs(row.createdAt).format("DD MMM YYYY"),
        },
        {
            key: "updatedAt",
            label: "Updated At",
            render: (row) =>
                dayjs(row.updatedAt).format("DD MMM YYYY"),
        },
    ];

    const { loading, data, error } = useSelector((s: RootState) => s.experience)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(GetAllExperience());
    }, [])


    // Create Module Handler 
    const [selectedUpdate, setSelectedUpdate] = useState<ExperienceRow | null>(null)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const handelClose = () => setOpenForm(false)
    const onSubmit = (data: experienceSchemaFormData) => {

        if (selectedUpdate != null) {
            dispatch(UpdateExperience({ id: selectedUpdate._id, data })).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Experience Updated Successfully");
                    setSelectedUpdate(null);
                    handelClose();
                }
            })
            return;
        } else {
            dispatch(CreateExperience(data)).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Experience Created Successfully");
                    handelClose();
                }
            })
        }

    }

    // Delete Module Handler
    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>("")
    const handelCloseDelete = () => setOpenFormDelete(false)
    const handleDelete = () => {
        if (!selectedId) return;
        dispatch(DeleteExperience(selectedId)).then(res => {
            console.log("res data delete", res.payload);

            if (res.payload.success) {
                toast.showSuccess("Experience Deleted Successfully")
                setSelectedId("");
                handelCloseDelete()
            }
        })

    }




    return (
        <DashboardContent maxWidth={"xl"}>
            <Box sx={{ margin: "2rem 0", width: "100%" }}>
                <Typography variant="h4" sx={{
                    padding: "1rem 0"
                }}>
                    Experience Control
                </Typography>
                <Card sx={{
                    padding: "2rem"
                }}>

                    <ReusableTable<ExperienceRow>
                        title="Experience Sections"
                        rows={data}
                        rowKey={(row) => row._id}
                        columns={sectionColumns}
                        actions={sectionActions}
                        onCreate={() => {
                            console.log("Create Section")
                            setOpenForm(true);
                        }}
                        onAction={(action, row) => {
                            if (action === "edit") {
                                console.log("Edit", row);
                                setSelectedUpdate(row);
                                setOpenForm(true);
                            }

                            if (action === "toggle") {
                                dispatch(ChangeVisiablillity(row._id)).then((res) => {
                                    if (res.payload.success) {
                                        toast.showSuccess("Visiabllity Changed Successfully ")
                                    }
                                    if (!res.payload.success) {
                                        toast.showError("Error Happen")
                                    }

                                });
                            }

                            if (action === "delete") {
                                console.log("Delete", row._id);
                                setSelectedId(row._id);
                                setOpenFormDelete(true);
                            }
                        }}
                        loading={loading}
                        error={error}
                    />

                    {/* Create Module  */}
                    <ModelReusable
                        open={openForm}
                        handleClose={handelClose}
                        title={selectedUpdate ? "Update Record" : "Create New Record"}
                        component={
                            <FormLayouts<experienceSchemaFormData>
                                schema={experienceSchema}
                                defaultValues={
                                    selectedUpdate !== null ? selectedUpdate : {}
                                }
                                layout={ExperienceFormLayout}
                                onSubmit={onSubmit}
                            />
                        } />

                    {/* Delete Module  */}
                    <ModelReusable
                        open={openFormDelete}
                        handleClose={handelCloseDelete}
                        title=""
                        top="50%"
                        component={
                            <>
                                <Typography variant={"h3"} textAlign={"center"}>
                                    ⚠️
                                </Typography>
                                <Typography variant={"h3"} textAlign={"center"}>
                                    Are You Sure?
                                </Typography>
                                <Typography textAlign={"center"}>
                                    Once You Delete This Section , You Can't Retrive It
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    gap: "1rem",
                                    margin: "2rem 0 0 0 "
                                }}>
                                    <Button variant="contained"
                                        onClick={handleDelete}
                                    >Conform</Button>
                                    <Button variant="outlined" onClick={() => {
                                        setOpenFormDelete(false);
                                        setSelectedId("");
                                    }}
                                    >Cancel</Button>
                                </Box>
                            </>} />
                </Card>
            </Box>
        </DashboardContent>
    )
}
