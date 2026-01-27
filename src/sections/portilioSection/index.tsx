import { Box, Button, Grid, ListItem, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"
import PortfolioCard, { CardSkeleton } from "./PortfolioCard"
import { useCallback, useEffect, useState } from "react";

import CardFilters from "./CardFilters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { clearSelected, DeletePortfolio, getAllPortfolios } from "src/stores/slices/portfolio";
import { Link, useNavigate } from "react-router-dom";
import ModelReusable from "src/components/ModelResuble";
import { useToast } from "src/context/toast";


export default function HeroSection() {

    const { data, error, loading } = useSelector((s: RootState) => s.portfolio);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllPortfolios());
        return () => {
            dispatch(clearSelected());
        };
    }, [dispatch]);


    const handleNavigate = () => navigate("/portfolio-section/create");


    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const handleDelete = () => {

        if (selectedId) {
            dispatch(DeletePortfolio(selectedId)).then(res => {
                if (res.payload.success) {
                    toast.showSuccess("Data Deleted Successfully ");
                    setSelectedId("");
                    setOpenFormDelete(false)
                } else {
                    toast.showError("Some Error Happen ")
                }
            });

        } else {
            toast.showError("Some Error Happen To Selected Id")
        }
    }

    return <>

        <DashboardContent maxWidth={"xl"}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexFlow: "row",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Portfolio Section Customization
                </Typography>

                <Button variant="contained" onClick={handleNavigate}>
                    Create
                </Button>

            </Box >
            <CardFilters />

            <Box>
                <Grid container spacing={2}>
                    {loading ? <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </> : <>
                        {
                            data.length !== 0 ? <>
                                {data.map((item, index) => <PortfolioCard
                                    data={item}
                                    key={index}
                                    handleDelete={(id: string) => {
                                        setSelectedId(id);
                                        setOpenFormDelete(true)
                                    }} />)}
                            </> : <>
                                <Typography>No Data </Typography>
                            </>
                        }
                    </>}

                </Grid>
            </Box>
            {/* Delete Module  */}
            <ModelReusable
                open={openFormDelete}
                handleClose={() => setOpenFormDelete(false)}
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
                            <Button
                                variant="contained"
                                onClick={handleDelete}

                            >Conform</Button>
                            <Button variant="outlined" onClick={() => {
                                setOpenFormDelete(false);
                                setSelectedId("");
                            }}
                            >Cancel</Button>
                        </Box>
                    </>} />
        </DashboardContent>
    </>

}