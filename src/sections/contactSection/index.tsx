import { useEffect, useState } from "react";
import { Box, Button, Chip, Link, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import ModelReusable from "src/components/ModelResuble";
import ReusableTable, { TableColumn } from "src/components/TableResued";
import { useToast } from "src/context/toast";
import { DashboardContent } from "src/layouts/dashboard";
import { AppDispatch, RootState } from "src/stores";
import { DeleteMessage, GetAllMessages, MessageRow, UpdateMessage } from "src/stores/slices/messages";

function whatsappHref(value: string) {
    const digits = value.replace(/[^\d]/g, "");
    return digits ? `https://wa.me/${digits}` : undefined;
}

export default function ContactSection() {
    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, data, error } = useSelector((state: RootState) => state.messages);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        dispatch(GetAllMessages());
    }, [dispatch]);

    const rows = data
        ? [...data].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        : null;

    const columns: TableColumn<MessageRow>[] = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            render: (row) => {
                const href = whatsappHref(row.whatsapp);
                if (!href) return row.whatsapp;
                return (
                    <Link href={href} target="_blank" rel="noreferrer">
                        {row.whatsapp}
                    </Link>
                );
            },
        },
        {
            key: "budget",
            label: "Budget",
        },
        {
            key: "message",
            label: "Message",
            render: (row) => (
                <Typography sx={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>
                    {row.message}
                </Typography>
            ),
        },
        {
            key: "createdAt",
            label: "Received",
            render: (row) => dayjs(row.createdAt).format("DD MMM YYYY"),
        },
        {
            key: "isRead",
            label: "Status",
            render: (row) => (
                <Chip
                    label={row.isRead ? "Read" : "Unread"}
                    color={row.isRead ? "default" : "warning"}
                    size="small"
                />
            ),
        },
    ];

    const handleDelete = () => {
        if (!selectedId) return;
        dispatch(DeleteMessage(selectedId)).then((res) => {
            if (res.payload?.success) {
                toast.showSuccess("Message deleted");
                setSelectedId("");
                setOpenDelete(false);
            }
        });
    };

    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ margin: "2rem 0", width: "100%" }}>
                <Typography variant="h4" sx={{ padding: "1rem 0" }}>
                    Contact Messages
                </Typography>
                <ReusableTable<MessageRow>
                    title="Inbox"
                    rows={rows}
                    rowKey={(row) => row._id}
                    columns={columns}
                    actions={[
                        { label: "Mark as read", value: "read" },
                        { label: "Delete", value: "delete" },
                    ]}
                    onAction={(action, row) => {
                        if (action === "read") {
                            dispatch(UpdateMessage({ id: row._id, data: { isRead: true } })).then((res) => {
                                if (res.payload?.success) {
                                    toast.showSuccess("Marked as read");
                                }
                            });
                        }
                        if (action === "delete") {
                            setSelectedId(row._id);
                            setOpenDelete(true);
                        }
                    }}
                    loading={loading}
                    error={error}
                    emptyMessage="No messages yet"
                />
                <ModelReusable
                    open={openDelete}
                    handleClose={() => {
                        setOpenDelete(false);
                        setSelectedId("");
                    }}
                    title=""
                    top="50%"
                    component={
                        <>
                            <Typography variant="h5" textAlign="center">
                                Delete this message?
                            </Typography>
                            <Typography textAlign="center" sx={{ mt: 1 }}>
                                This cannot be undone.
                            </Typography>
                            <Box sx={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                                <Button variant="contained" onClick={handleDelete}>
                                    Delete
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenDelete(false);
                                        setSelectedId("");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </>
                    }
                />
            </Box>
        </DashboardContent>
    );
}
