import { CONFIG } from "src/config-global";
import ExperienceView from "../sections/experienceSection/index";
export default function Page() {
    return (
        <>

            <title>{`Experience Section - ${CONFIG.appName}`}</title>
            <ExperienceView />

        </>
    );
}
