import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box,
    Button,
    Checkbox,
    MenuItem,
    Select,
    TextField,
    Typography,
    Skeleton,
    CircularProgress
} from '@mui/material';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const SkeletonTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export type TableColumn<T> = {
    key: keyof T | string;
    label: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
    skeletonWidth?: number | string;
};

export type TableAction = {
    label: string;
    value: string;
};

interface ReusableTableProps<T> {
    title?: string;
    rows: T[] | null;
    columns: TableColumn<T>[];
    rowKey: (row: T) => string;
    actions?: TableAction[];
    onAction?: (action: string, row: T) => void;
    onCreate?: () => void;
    loading?: boolean;
    skeletonRows?: number;
    emptyMessage?: string;
    error?: string | null;
    retry?: () => void;
}

export default function ReusableTable<T extends { _id: string }>({
    title,
    rows,
    rowKey,
    columns,
    actions,
    onAction,
    onCreate,
    loading = false,
    skeletonRows = 5,
    emptyMessage = "No data available",
    error = null,
    retry,
}: ReusableTableProps<T>) {
    const renderSkeleton = () => {
        return Array.from({ length: skeletonRows }).map((_, index) => (
            <SkeletonTableRow key={`skeleton-${index}`}>
                {columns.map((col, colIndex) => (
                    <StyledTableCell key={colIndex} align={col.align || "left"}>
                        <Skeleton
                            variant="text"
                            width={col.skeletonWidth || "80%"}
                            height={24}
                            sx={{
                                mx: col.align === "center" ? "auto" : undefined,
                                ml: col.align === "right" ? "auto" : undefined
                            }}
                        />
                    </StyledTableCell>
                ))}
                {actions && (
                    <StyledTableCell align="center">
                        <Skeleton
                            variant="rounded"
                            width={60}
                            height={32}
                            sx={{ mx: "auto" }}
                        />
                    </StyledTableCell>
                )}
            </SkeletonTableRow>
        ));
    };

    const renderContent = () => {
        if (loading) {
            return renderSkeleton();
        }

        if (error) {
            return (
                <TableRow>
                    <StyledTableCell
                        colSpan={columns.length + (actions ? 1 : 0)}
                        align="center"
                        sx={{ py: 4 }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography color="error" gutterBottom>
                                {error}
                            </Typography>
                            {retry && (
                                <Button
                                    variant="outlined"
                                    onClick={retry}
                                    sx={{ mt: 1 }}
                                >
                                    Retry
                                </Button>
                            )}
                        </Box>
                    </StyledTableCell>
                </TableRow>
            );
        }

        if (rows && rows.length === 0) {
            return (
                <TableRow>
                    <StyledTableCell
                        colSpan={columns.length + (actions ? 1 : 0)}
                        align="center"
                        sx={{ py: 4 }}
                    >
                        <Typography color="text.secondary">
                            {emptyMessage}
                        </Typography>
                    </StyledTableCell>
                </TableRow>
            );
        }

        return rows && rows.map((row) => (
            <StyledTableRow key={rowKey(row)}>
                {columns.map((col) => (
                    <StyledTableCell
                        key={String(col.key)}
                        align={col.align || "left"}
                    >
                        {col.render
                            ? col.render(row)
                            : (row as any)[col.key]}
                    </StyledTableCell>
                ))}

                {actions && (
                    <StyledTableCell align="center">
                        <DropdownMenu
                            rowId={row._id}
                            options={actions}
                            handleChoice={(value) =>
                                onAction?.(value, row)
                            }
                        />
                    </StyledTableCell>
                )}
            </StyledTableRow>
        ));
    };

    return (
        <>
            {/* Header */}
            {(title || onCreate) && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        margin: "2rem 0",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {title && <Typography variant="h4">{title}</Typography>}
                    {onCreate && !loading && !error && (
                        <Button variant="contained" onClick={onCreate}>
                            Create
                        </Button>
                    )}
                    {loading && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CircularProgress size={20} />
                            <Typography variant="body2" color="text.secondary">
                                Loading...
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}

            {/* Table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <StyledTableCell
                                    key={String(col.key)}
                                    align={col.align || "left"}
                                >
                                    {col.label}
                                </StyledTableCell>
                            ))}
                            {actions && (
                                <StyledTableCell align="center">
                                    Actions
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderContent()}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}