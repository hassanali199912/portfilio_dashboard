import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";


const iconLibraries: Record<string, any> = {
    fa: FaIcons,
    md: MdIcons,
    lu: LuIcons,
    si: SiIcons,
    ti: TiIcons
};


type Props = {
    iconKey?: string;
    size?: number;
    className?: string;
};


export const IconRender = ({ iconKey, size = 20, className }: Props) => {

    if (!iconKey) return null;

    const [lib, iconName] = iconKey.split(":");
    const IconComponent = iconLibraries[lib]?.[iconName];

    if (!IconComponent) return null;

    return <IconComponent size={size} className={className} />
}