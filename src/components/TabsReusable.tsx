import { Box, Tab, Tabs } from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";


export interface TabItem {
    label: string,
    content: ReactNode,
    icon?: ReactElement,
    disable?: boolean
}

interface TabReusableProps {
    tabs: TabItem[],
    defaultIndex?: number,
    variant?: "standard" | "scrollable" | "fullWidth";

}


const TabReusable = ({
    tabs,
    defaultIndex = 0,
    variant = "standard"
}: TabReusableProps) => {
    const [activeTab, setActiveTab] = useState<number>(defaultIndex)

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return <>
        <Box width="100%">
            {/* Tabs Header */}
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant={variant}
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        icon={tab.icon}
                        iconPosition={tab.icon ? "start" : undefined}
                        disabled={tab.disable}
                    />
                ))}
            </Tabs>

            {/* Active Tab Content */}
            <Box mt={3}>
                {tabs[activeTab]?.content}
            </Box>
        </Box>
    </>
}

export default TabReusable
