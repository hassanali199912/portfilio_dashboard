import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, TextareaAutosize, TextField } from "@mui/material";


export interface SelectOption {
    label: string;
    value: string | number;
}

export interface FormLayoutItem<T> {
    name: string;
    label: string;
    type?: "text" | "email" | "password" | "number" | "text_area" | "select";
    grid?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    placeholder?: string;
    disabled?: boolean;
    minRow?: number,
    options?: SelectOption[]
}


interface FormLayoutsProps<T extends FieldValues> {
    layout: FormLayoutItem<T>[];
    schema: ZodSchema<T>;
    defaultValues: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
}
export function FormLayouts<T extends FieldValues>({
    layout,
    schema,
    defaultValues,
    onSubmit,
}: FormLayoutsProps<T>) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(schema as any),
        defaultValues,
    });


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container spacing={2}>
                {layout.map((field) => (
                    <Controller
                        key={String(field.name)}
                        name={field.name as any}
                        control={control}
                        render={({ field: controllerField }) => (
                            <FormComponent

                                {...controllerField}
                                onChange={(e) => {
                                    const value =
                                        field.type === "number"
                                            ? Number(e.target.value)
                                            : e.target.value;

                                    controllerField.onChange(value);
                                }}
                                label={field.label}
                                type={field.type}
                                grid={field.grid}
                                placeholder={field.placeholder}
                                disabled={field.disabled}
                                error={!!errors[field.name]}
                                errorMessage={errors[field.name]?.message as string}
                                minRow={field.minRow}
                                options={field.options}

                            />
                        )}
                    />
                ))}
                <Button variant="contained" color="primary" type="submit"> Save </Button>
            </Grid>
        </Box>
    );

}

export interface FormFieldProps {
    name: string;
    label: string;
    type?: "text" | "email" | "password" | "number" | "text_area" | "select";
    value?: string | number;
    minRow?: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;

    grid?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    placeholder?: string;
    helperText?: string;

    error?: boolean;
    errorMessage?: string;

    disabled?: boolean;
    options?: SelectOption[]
}

export const FormComponent = ({
    name,
    label,
    type = "text",
    value,
    onChange,
    grid = 6,
    placeholder,
    helperText,
    error = false,
    errorMessage,
    disabled = false,
    minRow = 8,
    options = [{
        label: "",
        value: ""
    }]
}: FormFieldProps) => {


    if (type === "text_area") return <>
        <Grid size={grid}>
            <FormControl fullWidth error={error} disabled={disabled}>
                <TextField
                    fullWidth
                    multiline
                    label={label}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    minRows={minRow}
                />

                {(helperText || errorMessage) && (
                    <FormHelperText>
                        {error ? errorMessage : helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </Grid>
    </>
    if (type === "select") {
        return (
            <Grid size={grid}>
                <FormControl fullWidth error={error} disabled={disabled}>
                    <TextField
                        select
                        label={label}
                        name={name}
                        value={value ?? ""}
                        onChange={onChange}
                        placeholder={placeholder}
                    >
                        {options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {(helperText || errorMessage) && (
                        <FormHelperText>
                            {error ? errorMessage : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
        );
    }


    return <>
        <Grid size={grid}>
            <FormControl
                style={{
                }}
                fullWidth
                error={error}
                disabled={disabled}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />

                {(helperText || errorMessage) && (
                    <FormHelperText>
                        {error ? errorMessage : helperText}
                    </FormHelperText>
                )}
            </FormControl>
        </Grid>
    </>
}
