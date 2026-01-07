import { CONFIG } from "src/config-global";

import ContactView from "../sections/contactSection/index"

export default function Page() {
    return (
        <>

            <title>{`Contact Section - ${CONFIG.appName}`}</title>
            <ContactView />

        </>
    );
}
