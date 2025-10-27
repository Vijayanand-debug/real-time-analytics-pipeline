import { FaSlidersH, FaBroadcastTower } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiApachekafka } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface MenuItem {
    control_panel: IconType;
    live_feed: IconType;
    key_metrics: IconType;
    analytics: IconType;
    home: IconType;
    geoSearch: IconType;
    pipeline: IconType;
    linkedIn: IconType;
    navMenu: IconType;
    closeMenu: IconType;
    architecture: IconType;
    git: IconType;
}

export const menuItems: MenuItem = {
    control_panel: FaSlidersH,
    live_feed: FaBroadcastTower,
    key_metrics: MdTrendingUp,
    analytics: IoMdAnalytics,
    home: ImHome,
    geoSearch: FaMapLocationDot,
    pipeline: SiApachekafka,
    linkedIn: FaLinkedin,
    navMenu: GiHamburgerMenu,
    closeMenu: IoMdClose,
    architecture: FaNetworkWired,
    git: FaGithub,
};