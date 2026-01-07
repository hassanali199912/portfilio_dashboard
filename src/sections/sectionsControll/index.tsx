import { Box, Button, Card, Checkbox, ListItem, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "src/stores"
import { useEffect, useState } from "react"
import { ChangeVisiablillity, CreateSection, DeleteSection, GetAllSections, SectionRow } from "src/stores/slices/sections"
import ReusableTable, { TableColumn } from "src/components/TableResued"
import { Chip, Switch } from "@mui/material";
import dayjs from "dayjs";
import { useToast } from "src/context/toast"
import ModelReusable from "src/components/ModelResuble"
import { FormLayouts } from "src/components/FormLayouts"
import { sectionSchema, sectionSchemaFormData } from "src/schemas/section.schema"
import { FormLayoutItem } from "../profileContent/Form"


const sectionFormLayout: FormLayoutItem<sectionSchemaFormData>[] = [
    {
        name: "key",
        label: "The Key",
        grid: 12,
    },
    {
        name: "title",
        label: "The Title",
        grid: 12,

    },

];




export default function Index() {
    const toast = useToast();
    const sectionActions = [
        { label: "Edit", value: "edit" },
        { label: "Toggle Visibility", value: "toggle" },
        { label: "Delete", value: "delete" },
    ];
    const sectionColumns: TableColumn<SectionRow>[] = [
        {
            key: "key",
            label: "Key",
            render: (row) => <Chip label={row.key} color="primary" />,
        },
        {
            key: "title",
            label: "Title",
            align: "left",
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



    const { loading, data, error } = useSelector((s: RootState) => s.section)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(GetAllSections());
    }, [])


    // Create Module Handler 
    const [openForm, setOpenForm] = useState<boolean>(false)
    const handelClose = () => setOpenForm(false)
    const onSubmit = (data: sectionSchemaFormData) => {
        console.log("this is form submit", data);
        dispatch(CreateSection(data)).then(res => {
            if (res.payload.success) {
                toast.showSuccess("Section Created Successfully");
                handelClose();
            }
        })
    }
    // Delete Module Handler
    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>("")
    const handelCloseDelete = () => setOpenFormDelete(false)
    const handleDelete = () => {
        if (!selectedId) return;
        dispatch(DeleteSection(selectedId)).then(res => {
            console.log("res data delete", res.payload);

            if (res.payload.success) {
                toast.showSuccess("Section Deleted Successfully")
                setSelectedId("");
                handelCloseDelete()
            }
        })

    }

    return <>

        <DashboardContent
            maxWidth={"xl"}
        >
            <Box

                sx={{
                    mb: 5,
                    display: 'flex',
                    alignItems: 'start',
                    flexFlow: "column",
                    justifyContent: "flex-start"
                }}
            >
                <Typography variant="h3" padding={"1rem 0"}>
                    Controlled Sections
                </Typography>

                <Card
                    sx={{
                        width: "100%",
                        padding: "1rem"
                    }}>
                    <ReusableTable<SectionRow>
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
                        title="Create New Record"
                        component={
                            <FormLayouts<sectionSchemaFormData>
                                schema={sectionSchema}
                                defaultValues={{
                                    key: "",
                                    title: ""
                                }}
                                layout={sectionFormLayout}
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


            </Box >
        </DashboardContent>
    </>

}