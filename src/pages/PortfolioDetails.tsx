import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { DashboardContent } from "src/layouts/dashboard";
import PortfolioView from "src/sections/portilioSection/PortfolioView";
import { AppDispatch, RootState } from "src/stores";
import { clearSelected, getPortfolioById, getPortfolioByIdApi } from "src/stores/slices/portfolio";


const Page = () => {

    const { id } = useParams();
    const { selected, data } = useSelector((s: RootState) => s.portfolio);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (!id) return;

        //  if user refresh page at view details 
        if (data.length === 0) {
            dispatch(getPortfolioByIdApi(id));
            return;
        }

        dispatch(getPortfolioById(id));
        return () => {
            dispatch(clearSelected());
        };
    }, [dispatch]);

    return <>
        <DashboardContent maxWidth={"xl"}>
            
            {selected && <PortfolioView data={selected} />}
        </DashboardContent>
    </>
}


export default Page