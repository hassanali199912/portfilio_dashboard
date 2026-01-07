
import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Typography } from "@mui/material";

import { FormLayouts } from "src/components/FormLayouts";

import { heroSectionSchema, heroSectionFormData } from "../../schemas/hero.schema"


export interface FormLayoutItem<T> {
    name: keyof T;
    label: string;
    type?: "text" | "email" | "password" | "number" | "text_area";
    grid?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    placeholder?: string;
    disabled?: boolean;
}

const heroFormLayout: FormLayoutItem<heroSectionFormData>[] = [
    {
        name: "ar_name",
        label: "Arabic Name",
        grid: 6,
    },
    {
        name: "en_name",
        label: "English Name",
        grid: 6,
    },
    {
        name: "ar_title",
        label: "Arabic Title",
        grid: 6,
    },
    {
        name: "en_title",
        label: "English Title",
        grid: 6,
    },

    {
        name: "ar_description",
        label: "Arabic Description",
        grid: 6,
        type: "text_area"

    },
    {
        name: "en_description",
        label: "English description",
        grid: 6,
        type: "text_area"

    },


    {
        name: "profile_photo",
        label: "Photo Link",
        grid: 6,
    },
    {
        name: "button_link",
        label: "Button Link",
        grid: 6,
    },
];


export default function HeroFrom({ onCancel }: {
    onCancel: () => void
}) {

    const onSubmit = (data: heroSectionFormData) => {
        console.log("Form Data:", data);
    };


    return <>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={"1rem"}>
            <Typography variant="h4">Edit Hero</Typography>
            <Button onClick={onCancel} color="secondary">
                Cancel
            </Button>
        </Box>

        <FormLayouts<heroSectionFormData>
            schema={heroSectionSchema}
            defaultValues={{

                ar_name: "حسن",
                en_name: "hassan",
                ar_title: "مطور ويب ",
                en_title: "web developemt",
                ar_description: "دة الوصف العربي ليا ",
                en_description: "this is mu english des",
                profile_photo: "http://localhost:3039/hero-section",
                button_link: "http//:www.google.com"
            }}
            layout={heroFormLayout}
            onSubmit={onSubmit}

        />
    </>
}

