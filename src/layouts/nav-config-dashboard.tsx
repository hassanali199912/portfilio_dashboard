import { SiApacherocketmq } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { MdRoundaboutRight } from "react-icons/md";
import { VscServerProcess } from "react-icons/vsc";
import { MdOutlineContactEmergency } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  // New Nav And Page
  {
    title: 'Section Visibility',
    path: '/sections',
    icon: <FaEye />,
  },

  {
    title: 'Global Setting',
    path: '/global',
    icon: <SiApacherocketmq />,
  },

  {
    title: 'Profile Content',
    path: '/profile-content',
    icon: <SiApacherocketmq />,
  },
  {
    title: 'About Section',
    path: '/about-section',
    icon: <MdRoundaboutRight />,
  },
  {
    title: 'Work Process Section',
    path: '/work-section',
    icon: < VscServerProcess />,
  },
  {
    title: 'Portfolio Section',
    path: '/portfolio-section',
    icon: < GoProjectSymlink />,
  },
  {
    title: 'Contact Me Section',
    path: '/contact-section',
    icon: <MdOutlineContactEmergency />,
  },
  {
    title: 'Skills Section',
    path: '/skills-section',
    icon: <MdOutlineContactEmergency />,
  },
  {
    title: 'Experience Section',
    path: '/experience',
    icon: <MdOutlineContactEmergency />,
  },

];
