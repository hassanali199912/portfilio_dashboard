import { CONFIG } from 'src/config-global';

import BlogSection from '../sections/blogSection';

export default function Page() {
  return (
    <>
      <title>{`Blog Section - ${CONFIG.appName}`}</title>
      <BlogSection />
    </>
  );
}
