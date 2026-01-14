import { CONFIG } from "src/config-global";
import SkillsView from "../sections/skillsSection/index";
export default function Page() {
    return (
        <>

            <title>{`Skills Section - ${CONFIG.appName}`}</title>
            <SkillsView />

        </>
    );
}
