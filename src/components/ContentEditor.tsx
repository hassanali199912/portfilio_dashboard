import { Box, Typography } from "@mui/material";
import { z } from "zod";
import { FormLayouts, FormLayoutItem } from "src/components/FormLayouts";
import { ContentEditorFormData, contentEditorSchema } from "src/schemas/contentEdtor.schema";




const contentEditorLayout: FormLayoutItem<ContentEditorFormData>[] = [
    {
        name: "title.ar",
        label: "Arabic Title",
        grid: 6,
        placeholder: "اكتب العنوان بالعربي",
    },
    {
        name: "title.en",
        label: "English Title",
        grid: 6,
        placeholder: "Enter title in English",
    },
    {
        name: "description.ar",
        label: "Arabic Description",
        grid: 6,
        type: "text_area",
        minRow: 6,
        placeholder: "الوصف بالعربي",
    },
    {
        name: "description.en",
        label: "English Description",
        grid: 6,
        type: "text_area",
        minRow: 6,
        placeholder: "Description in English",
    },
];


interface ContentEditorProps {
    defaultValues: ContentEditorFormData,
    onSubmit: (data: ContentEditorFormData, tag: string) => void
    tag: string

}

const ContentEditor = ({
    defaultValues,
    onSubmit,
    tag

}: ContentEditorProps) => {
    console.log(`def Value ${tag}`, defaultValues);


    return (
        <Box
            sx={{
                width: "100%",
                p: 3,
            }}
        >
            <Typography variant="h5" mb={2}>
                Content Editor ({tag})
            </Typography>

            <FormLayouts<ContentEditorFormData>
                layout={contentEditorLayout}
                schema={contentEditorSchema}
                defaultValues={defaultValues}
                onSubmit={(data => onSubmit(data, tag))}
            />
        </Box>
    );
};

export default ContentEditor;
