import { Box, Button } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";



const BackBtn = ({ link }: { link: string }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(link)
    }


    return <>
        <Box>
            <Button onClick={handleBack}>
                <IoMdArrowRoundBack  style={{
                    marginInlineEnd:"0.5rem"
                }}/> Back

            </Button>

        </Box>
    </>
}


export default BackBtn