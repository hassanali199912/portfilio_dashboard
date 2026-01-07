import { CONFIG } from "src/config-global";

import WorkView from "../sections/workSection/index"

export default function Page() {
    return (
        <>

            <title>{`Work Progress Section - ${CONFIG.appName}`}</title>
            <WorkView />

        </>
    );
}
