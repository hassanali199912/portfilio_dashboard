import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------
import SectionsControlls from "../sections/sectionsControll/index"

export default function Page() {
    return (
        <>
            <title>{`Blank For Now - ${CONFIG.appName}`}</title>
            <SectionsControlls />
        </>
    );
}
