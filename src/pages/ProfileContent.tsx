import { CONFIG } from "src/config-global";

import HeroView from "../sections/profileContent/index"
import ProfileContent from "src/sections/profileContent/ProfileContentView";

export default function Page() {
    return (
        <>

            <title>{`Profile Content  - ${CONFIG.appName}`}</title>
            {/* <HeroView /> */}
            <ProfileContent />

        </>
    );
}
