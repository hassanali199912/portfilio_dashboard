import { CONFIG } from "src/config-global";
import TailoredCvView from "../sections/tailoredCv";

export default function Page() {
  return (
    <>
      <title>{`Tailored CV - ${CONFIG.appName}`}</title>
      <TailoredCvView />
    </>
  );
}
