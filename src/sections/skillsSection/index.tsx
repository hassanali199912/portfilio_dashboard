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
import { skillSchemaFormData, skillsSchema } from "src/schemas/skill.schema";
import { AppDispatch, RootState } from "src/stores";
import { ChangeVisiablillity, CreateSkills, DeleteSkills, GetAllSkills, SkillsRow, UpdateSkills } from "src/stores/slices/skills";



const SkillsFormLayout: FormLayoutItem<skillSchemaFormData>[] = [
    {
        name: "name",
        label: "Skill Name",
        grid: 6,
    },
    {
        name: "value",
        label: "Presentage Value",
        grid: 6,
        type: "number"

    },
    {
        name: "image",
        label: "Image Url",
        grid: 12,

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

    const sectionColumns: TableColumn<SkillsRow>[] = [
        {
            key: "name",
            label: "Name",
            render: (row) => <Chip label={row.name} color="primary" />,
        },
        {
            key: "value",
            label: "Presantage",
            align: "left",
            render: (row) => <CircularProgressWithLabel value={row.value} />
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

    const { loading, data, error } = useSelector((s: RootState) => s.skills)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(GetAllSkills());
    }, [])


    // Create Module Handler 
    const [selectedUpdate, setSelectedUpdate] = useState<SkillsRow | null>(null)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const handelClose = () => setOpenForm(false)
    const onSubmit = (data: skillSchemaFormData) => {
        if (selectedUpdate != null) {
            dispatch(UpdateSkills({ id: selectedUpdate._id, data })).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Skills Updated Successfully");
                    setSelectedUpdate(null);
                    handelClose();
                }
            })
            return;
        } else {
            dispatch(CreateSkills(data)).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Skills Created Successfully");
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
        dispatch(DeleteSkills(selectedId)).then(res => {
            console.log("res data delete", res.payload);

            if (res.payload.success) {
                toast.showSuccess("Skills Deleted Successfully")
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
                    Skills Control
                </Typography>
                <Card sx={{
                    padding: "2rem"
                }}>

                    <ReusableTable<SkillsRow>
                        title="Website Sections"
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
                            <FormLayouts<skillSchemaFormData>
                                schema={skillsSchema}
                                defaultValues={
                                    selectedUpdate ? selectedUpdate :
                                        {
                                            image: "",
                                            name: "",
                                            order: 0,
                                            value: 50
                                        }}
                                layout={SkillsFormLayout}
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
