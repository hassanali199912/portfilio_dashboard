import { Box, Button, Grid, ListItem, Typography } from "@mui/material"

import { DashboardContent } from "src/layouts/dashboard"
import AboutEdit from "./AboutEdit";
import AboutPreview from "./AboutPreview";
import { useCallback, useState } from "react";
import PortfolioCard from "../portilioSection/PortfolioCard";
import { FiltersProps, ProductFilters } from "../product/product-filters";
import { ProductSort } from "../product/product-sort";

const intialData = {
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
    arTitle: "حسن علي",
    enTitle: "hassan Ali ",
    arDescription: "دة الوصف العربي ليا",
    enDescription: "this is mu english des",
    social: {
        facebook: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
        instagram: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
        linkedin: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
        github: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
    },
    cvLink: "https://media.licdn.com/dms/image/v2/D4D03AQHclqSIUi8W6g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728854185923?e=1768435200&v=beta&t=i1T-rb5wb-z2eGY4p21u8fQVvWy8RWyr-eP0xehtiEo",
}


const GENDER_OPTIONS = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'shose', label: 'Shose' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
    { value: 'below', label: 'Below $25' },
    { value: 'between', label: 'Between $25 - $75' },
    { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107',
];

const defaultFilters = {
    price: '',
    gender: [GENDER_OPTIONS[0].value],
    colors: [COLOR_OPTIONS[4]],
    rating: RATING_OPTIONS[0],
    category: CATEGORY_OPTIONS[0].value,
};

export default function HeroSection() {

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(intialData);

    const handleChange = (key: string, value: any) => {
        setData(prev => {
            const keys = key.split(".");
            const updated = { ...prev } as any;
            let ref = updated;
            keys.slice(0, -1).forEach(k => (ref[k] = { ...ref[k] }));
            ref[keys.at(-1)!] = value;
            return updated;
        });
    };

    const [sortBy, setSortBy] = useState('featured');

    const [openFilter, setOpenFilter] = useState(false);

    const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

    const handleOpenFilter = useCallback(() => {
        setOpenFilter(true);
    }, []);

    const handleCloseFilter = useCallback(() => {
        setOpenFilter(false);
    }, []);

    const handleSort = useCallback((newSort: string) => {
        setSortBy(newSort);
    }, []);

    const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
        setFilters((prevValue) => ({ ...prevValue, ...updateState }));
    }, []);

    const canReset = Object.keys(filters).some(
        (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
    );
    return <>

        <DashboardContent maxWidth={"xl"}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexFlow: "column",
                    justifyContent: "flex-start"
                }}
            >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Portfolio Card Section
                </Typography>

            </Box >
                <Box
                    sx={{
                        mb: 5,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap-reverse',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box
                        sx={{
                            my: 1,
                            gap: 1,
                            flexShrink: 0,
                            display: 'flex',
                        }}
                    >
                        <ProductFilters
                            canReset={canReset}
                            filters={filters}
                            onSetFilters={handleSetFilters}
                            openFilter={openFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                            onResetFilter={() => setFilters(defaultFilters)}
                            options={{
                                genders: GENDER_OPTIONS,
                                categories: CATEGORY_OPTIONS,
                                ratings: RATING_OPTIONS,
                                price: PRICE_OPTIONS,
                                colors: COLOR_OPTIONS,
                            }}
                        />

                        <ProductSort
                            sortBy={sortBy}
                            onSort={handleSort}
                            options={[
                                { value: 'featured', label: 'Featured' },
                                { value: 'newest', label: 'Newest' },
                                { value: 'priceDesc', label: 'Price: High-Low' },
                                { value: 'priceAsc', label: 'Price: Low-High' },
                            ]}
                        />
                    </Box>
                </Box>


            {/* {edit ? (
                <AboutEdit
                    values={data}
                    onChange={handleChange}
                    onSave={() => setEdit(false)}
                />
            ) : (
                <AboutPreview data={data} onEdit={() => setEdit(true)} />
            )} */}
        </DashboardContent>
    </>

}