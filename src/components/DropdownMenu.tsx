import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from "react-icons/bs";


export interface options {
    label:string,
    value:string
}

export default function DropdownMenu({
    rowId,
    options,
    handleChoice
}: {
    rowId: string,
    options: options[],
    handleChoice: (data: string, rowId: string) => void
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value: string) => {
        setAnchorEl(null);
        handleChoice(value, rowId)
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
               <BsThreeDotsVertical />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                {options.map((item, index) => <MenuItem
                    key={index}
                    onClick={() => handleClose(item.value)}
                >{item.label}</MenuItem>
                )}
            </Menu>
        </div>
    );
}
