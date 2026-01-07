import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { MdImage } from 'react-icons/md';
import DropdownMenu from 'src/components/DropdownMenu';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    Value: string,
    Ar_Label: string,
    En_Label: string,
    Icon: string,
    Visibility: boolean,
    order: number,
    Bg_Color: string,
) {
    return { Value, Ar_Label, En_Label, Icon, Visibility, order, Bg_Color };
}

const rows = [
    createData('15 Y', "خبره", "Experince", "❤️", true, 1, "#ggg"),
    createData('15 Y', "خبره", "Experince", "❤️", true, 1, "#ggg"),
];

export default function StatusTable() {


    const [showForm, setShowForm] = useState<boolean>(false);

    const menuOptions = [
        {
            label: "Edit",
            value: "edit"
        },
        {
            label: "Delete",
            value: "delete"
        }
    ]

    const handleChoice = (value: string) => {
        console.log("Value is", value);
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} margin={"2rem 0"}>
                <Typography variant="h4">
                    Status Card
                </Typography>
                <Button color={showForm ? 'error' : 'primary'} variant='contained' onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Close" : "Create"}
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            {[
                                "#",
                                "Value",
                                "Ar Label",
                                "En Label",
                                "Icon",
                                "Visibility",
                                "order",
                                "Bg Color",
                                "Actions",
                            ].map(item => <StyledTableCell align='center'>{item}</StyledTableCell>)}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showForm && <>
                            <TableForm />
                        </>}
                        {rows.map((row) => (
                            <StyledTableRow key={row.En_Label}>
                                <StyledTableCell component="th" scope="row">
                                    !
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.Value}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.Ar_Label}</StyledTableCell>
                                <StyledTableCell align="center">{row.En_Label}</StyledTableCell>
                                <StyledTableCell align="center">{row.Icon}</StyledTableCell>
                                <StyledTableCell align="center">{row.Visibility ? "Visable" : "Not Visable "}</StyledTableCell>
                                <StyledTableCell align="center">{row.order}</StyledTableCell>
                                <StyledTableCell align="center">{row.Bg_Color}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <DropdownMenu
                                        options={menuOptions}
                                        handleChoice={handleChoice}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}


const TableForm = () => {
    const [formData, setFormData] = useState({
        value: "",
        arLabel: "",
        enLabel: "",
        icon: "",
        visible: true,
        order: 1,
        bgColor: "#ffffff",
    });

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        console.log("Table Row Data:", formData);
    };

    return (
        <StyledTableRow>
            {/* Create */}
            <StyledTableCell component="th" scope="row">
                Create
            </StyledTableCell>

            {/* Value */}
            <StyledTableCell>
                <TextField
                    size="small"
                    fullWidth
                    value={formData.value}
                    onChange={(e) => handleChange("value", e.target.value)}
                    placeholder='Enter Value'
                />
            </StyledTableCell>

            {/* Ar Label */}
            <StyledTableCell align="center">
                <TextField
                    size="small"
                    value={formData.arLabel}
                    onChange={(e) => handleChange("arLabel", e.target.value)}
                    placeholder='Arabic Label'

                />
            </StyledTableCell>

            {/* En Label */}
            <StyledTableCell align="center">
                <TextField
                    size="small"
                    value={formData.enLabel}
                    onChange={(e) => handleChange("enLabel", e.target.value)}
                    placeholder='English  Label'

                />
            </StyledTableCell>

            {/* Icons */}
            <StyledTableCell align="center">
                <Select
                    size="small"
                    value={formData.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="image">
                        <MdImage /> Image
                    </MenuItem>
                </Select>
            </StyledTableCell>

            {/* Visibility */}
            <StyledTableCell align="center">
                <Checkbox
                    checked={formData.visible}
                    onChange={(e) => handleChange("visible", e.target.checked)}
                />
            </StyledTableCell>

            {/* Order */}
            <StyledTableCell align="center">
                <TextField
                    type="number"
                    size="small"
                    sx={{ width: 70 }}
                    value={formData.order}
                    onChange={(e) => handleChange("order", Number(e.target.value))}
                />
            </StyledTableCell>

            {/* BG Color */}
            <StyledTableCell align="center">
                <input
                    type="color"
                    value={formData.bgColor}
                    onChange={(e) => handleChange("bgColor", e.target.value)}
                    style={{ width: 40, height: 30, border: "none", cursor: "pointer" }}
                />
            </StyledTableCell>

            {/* Save */}
            <StyledTableCell align="center">
                <Button variant="outlined" onClick={handleSave}>
                    Save
                </Button>
            </StyledTableCell>
        </StyledTableRow>
    );
};