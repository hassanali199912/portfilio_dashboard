import { Box, Card, Skeleton, Typography } from "@mui/material"
import TabReusable, { TabItem } from "src/components/TabsReusable"
import { DashboardContent } from "src/layouts/dashboard"

import { GiHeron } from "react-icons/gi";
import ContentEditor from "src/components/ContentEditor";
import { ContentEditorFormData } from "src/schemas/contentEdtor.schema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { useEffect, useState } from "react";
import { GetProfileContentById, UpdateProfileContent } from "src/stores/slices/profile";
import { useToast } from "src/context/toast";
import { FaMarker } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRoadCircleXmark ,FaRProject } from "react-icons/fa6";





const ProfileContent = () => {

    const { data, error, loading } = useSelector((s: RootState) => s.profile);
    const dispatch = useDispatch<AppDispatch>();
    const [tabsPage, setTabsPage] = useState<TabItem[]>([])
    const toast = useToast();
    const onSubmit = (dataForm: ContentEditorFormData, tag: string) => {
        const objectData = {
            ...data,
            [tag]: dataForm
        }
        dispatch(UpdateProfileContent(objectData)).then(res => {
            if (res.payload.success) {
                toast.showSuccess("Data Updated Successfully");
            } else {
                toast.showError("Something Went Wrong");

            }
        });


    }

    useEffect(() => {
        dispatch(GetProfileContentById());
    }, [])

    useEffect(() => {
        data !== null && setTabsPage([
            {
                label: "Hero Content ",
                content: <ContentEditor
                    key={"hero"}
                    defaultValues={data.hero}
                    onSubmit={onSubmit}
                    tag="hero"

                />,
                icon: <GiHeron />
            },
            {
                label: "About Content ",
                content: <ContentEditor
                    key={"about"}
                    defaultValues={data.about}
                    onSubmit={onSubmit}
                    tag="about"
                />,
                icon: <FaMarker />
            },
            {
                label: "Profile Content ",
                content: <ContentEditor
                    key={"portfolio"}

                    defaultValues={data.portfolio}
                    onSubmit={onSubmit}
                    tag="portfolio"

                />,
                icon: <FaRProject />

            },
            {
                label: "Work Process Content ",
                content: <ContentEditor
                    key={"work_process"}

                    defaultValues={data.work_process}
                    onSubmit={onSubmit}
                    tag="work_process"
                />,
                icon: <FaRoadCircleXmark />

            },
            {
                label: "What I Do Content ",
                content: <ContentEditor
                    key={"what_i_do"}

                    defaultValues={data.what_i_do}
                    onSubmit={onSubmit}
                    tag="what_i_do"
                />,
                icon: <IoIosCheckmarkCircle />


            },
        ])
    }, [data])





    return <>
        <DashboardContent maxWidth={"xl"}>
            <Box sx={{ margin: "2rem 0", width: "100%" }}>
                <Typography variant="h4" sx={{
                    padding: "1rem 0"
                }}>
                    Content Control
                </Typography>
                <Card sx={{
                    padding: "2rem"
                }}>
                    {loading ? <Skeleton variant="rounded" width={"100%"} height={600} /> : <>
                        {data && tabsPage && <>
                            <TabReusable tabs={tabsPage} />
                        </>}
                    </>}

                </Card>
            </Box>
        </DashboardContent>
    </>
}

export default ProfileContent