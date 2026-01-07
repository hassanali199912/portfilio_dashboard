import { CONFIG } from "src/config-global";

import PortfolioView from "../sections/portilioSection/index"

export default function Page() {
    return (
        <>

            <title>{`About Section - ${CONFIG.appName}`}</title>
            <PortfolioView />

        </>
    );
}
