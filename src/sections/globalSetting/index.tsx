import { Box, Button, Card, Checkbox, Divider, ListItem, Skeleton, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "src/stores"
import { useEffect, useState } from "react"
import { socialMediaData, GetAllMedia, ChangeVisiablillity, DeleteMedia, CreateMedia, UpdateMedia } from "src/stores/slices/social"
import ReusableTable, { TableColumn } from "src/components/TableResued"
import { Chip, Switch } from "@mui/material";
import dayjs from "dayjs";
import { useToast } from "src/context/toast"
import ModelReusable from "src/components/ModelResuble"
import { FormLayoutItem, FormLayouts } from "src/components/FormLayouts"
import { AboutSchema, AboutData } from "src/schemas/global.schema"
import ProfileCard from "./GlobalView"
import { GetGlobalById, GlobalSetting, UpdateGlobalSetting } from "src/stores/slices/global"
import { IconRender } from "src/components/IconRender"
import { SocialFormData, SocialSchema } from "src/schemas/social.schema"


const globalSettingFormLayout: FormLayoutItem<AboutData>[] = [
    {
        name: "contact.email",
        label: "Email",
        grid: 12,
        type: "email",
        placeholder: "example@email.com",
    },

    {
        name: "contact.phone",
        label: "Phone Number",
        grid: 12,
        placeholder: "+201553880080",
    },

    {
        name: "contact.address",
        label: "Address",
        grid: 12,
        placeholder: "Egypt, Assuit...",
    },

    {
        name: "personalImage",
        label: "Personal Image URL",
        grid: 12,
        placeholder: "https://...",
        type: "text_area",
        minRow: 4
    },

    {
        name: "cvLink",
        label: "CV Link",
        grid: 12,
        placeholder: "https://drive.google.com/...",
        type: "text_area",
        minRow: 4
    },



];
const SocialFormLayout: FormLayoutItem<SocialFormData>[] = [
    {
        name: "name",
        label: "Icon Name",
        grid: 12,
        placeholder: "Ex: Facebook ,Linkedin ",
    },

    {
        name: "url",
        label: "URL Value ",
        grid: 12,
        placeholder: "https://drive.google.com/...",
        type: "text_area",
        minRow: 4
    },
    {
        name: "iconKey",
        label: "Icon Key ",
        grid: 12,
        placeholder: "Ex: fa, md, lu,si ",
    },
    {
        name: "order",
        label: "Icon Order  ",
        grid: 12,
        type: "number",
        placeholder: "1 , 2 , 3 ...etc",
    },
];


const TableActions = [
    { label: "Edit", value: "edit" },
    { label: "Toggle Visibility", value: "toggle" },
    { label: "Delete", value: "delete" },
];
const sectionColumns: TableColumn<socialMediaData>[] = [
    {
        key: "name",
        label: "Name",
        render: (row) => <Chip label={row.name} color="primary" />,
    },
    {
        key: "iconKey",
        label: "Icon Key",
        render: (row) => <Typography> <IconRender iconKey={row.iconKey} /></Typography>,
    },
    {
        key: "isVisible",
        label: "Visibility",
        render: (row) => (
            <Switch checked={row.isVisible} disabled />
        ),
    },
    {
        key: "order",
        label: "Order",
        render: (row) => <Typography>{row.order}</Typography>,
    },

    {
        key: "createdAt",
        label: "Created At",
        render: (row) =>
            dayjs(row.createdAt).format("DD MMM YYYY"),
    },
];


export default function Index() {
    const toast = useToast();

    const { loading, data, error } = useSelector((s: RootState) => s.global)
    const { loading: socialLoading, data: socialData, error: socialError } = useSelector((s: RootState) => s.social)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(GetGlobalById());
        dispatch(GetAllMedia());
    }, [])

    // Update Module Handler 
    const [openForm, setOpenForm] = useState<boolean>(false)
    const handelClose = () => setOpenForm(false)
    const onSubmit = (data: AboutData) => {
        console.log("this is form submit", data);
        dispatch(UpdateGlobalSetting(data)).then(res => {
            if (res.payload.success) {
                toast.showSuccess("Section Created Successfully");
                handelClose();
            }
        })
    }

    // Create And Update Module Handler (Social) 
    const [selectedMedia, setSelectedMedia] = useState<Partial<socialMediaData>>({})
    const [openFormSocial, setOpenFormSocial] = useState<boolean>(false)
    const handelCloseSocial = () => setOpenFormSocial(false)
    const onSubmitSocial = (data: Partial<socialMediaData>) => {

        if (selectedMedia !== null) {
            const updatedObject = {
                data: data,
                id: selectedMedia._id || ""
            }
            dispatch(UpdateMedia(updatedObject)).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Social Updated Successfully");
                    handelCloseSocial();
                }
            });

            return;
        }

        dispatch(CreateMedia(data)).then(res => {
            if (res.payload.success) {
                toast.showSuccess("Social Created Successfully");
                handelCloseSocial();
            }
        });
    }


    // Delete Module Handler
    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>("")
    const handelCloseDelete = () => setOpenFormDelete(false)
    const handleDelete = () => {
        if (!selectedId) return;
        dispatch(DeleteMedia(selectedId)).then(res => {
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
                    Global Setting
                </Typography>

                <Card
                    sx={{
                        width: "100%",
                        padding: "1rem"
                    }}>
                    {loading ? <Skeleton variant="rounded" width={"100%"} height={600} /> : <>
                        {data && <>

                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}>
                                <Button variant="contained" onClick={() => setOpenForm(true)}> Update </Button>
                            </Box>
                            <ProfileCard data={data} />
                        </>}
                    </>}
                    {error && <><Typography
                        style={{
                            textAlign: "center"
                        }}>
                        There is an error happen
                    </Typography></>}

                </Card>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h3" padding={"1rem 0"}>
                    Social Media
                </Typography>

                <Card
                    sx={{
                        width: "100%",
                        padding: "1rem"
                    }}
                >

                    <ReusableTable<socialMediaData>
                        title="Social Media"
                        rows={socialData}
                        rowKey={(row) => row._id}
                        columns={sectionColumns}
                        actions={TableActions}
                        onCreate={() => {
                            console.log("Create Section")
                            setSelectedMedia({});
                            setOpenFormSocial(true);
                        }}
                        onAction={(action, row) => {
                            if (action === "edit") {
                                console.log("Edit", row);
                                setSelectedMedia(row);
                                setOpenFormSocial(true);

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
                        loading={socialLoading}
                        error={socialError}
                    />

                </Card>

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

                {/* Create  And Update Module For Icons  */}
                <ModelReusable
                    top="50%"
                    open={openFormSocial}
                    handleClose={handelCloseSocial}
                    title="Update Global Data"
                    component={
                        <FormLayouts<SocialFormData>
                            schema={SocialSchema}
                            defaultValues={
                                selectedMedia ? selectedMedia : {
                                    iconKey: "",
                                    name: "",
                                    order: 0,
                                    url: ""
                                }}
                            layout={SocialFormLayout}
                            onSubmit={onSubmitSocial}
                        />
                    } />
                {/* Update Module  */}
                <ModelReusable
                    top="50%"
                    open={openForm}
                    handleClose={handelClose}
                    title="Update Global Data"
                    component={
                        <FormLayouts<AboutData>
                            schema={AboutSchema}
                            defaultValues={
                                data ? data : {
                                    contact: {
                                        email: "",
                                        address: "",
                                        phone: ""
                                    },
                                    cvLink: "",
                                    personalImage: ""
                                }
                            }
                            layout={globalSettingFormLayout}
                            onSubmit={onSubmit}
                        />
                    } />
            </Box >
        </DashboardContent>
    </>

}