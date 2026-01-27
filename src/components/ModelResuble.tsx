import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

interface ModelResublePorps {
    // styles
    top?: string,
    left?: string,
    width?: number,
    // controllers
    open: boolean,
    handleClose: () => void
    //content
    title: string,
    component: React.ReactNode
}



export default function ModelReusable({
    top = "30%",
    left = "50%",
    width,
    open,
    handleClose,
    component,
    title
}: ModelResublePorps) {

    if (top) {
        style.top = top;
    }
    if (left) {
        style.left = left;
    }

    if (width) {
        style.width = width;
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} maxWidth={width}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Box sx={{
                        padding: "2rem 0 0 0 "
                    }}>
                        {component}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
