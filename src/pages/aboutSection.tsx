import { CONFIG } from "src/config-global";

import AboutView from "../sections/aboutSection/index"

export default function Page() {
    return (
        <>

            <title>{`About Section - ${CONFIG.appName}`}</title>
            <AboutView />

        </>
    );
}
