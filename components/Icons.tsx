import type { Icon as TablerIcon } from "@tabler/icons-react";
import {
  IconArrowNarrowRight,
  IconBellRinging,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBuildingStore,
  IconCar,
  IconCarGarage,
  IconCarLifter,
  IconCheck,
  IconClipboardCheck,
  IconDroplet,
  IconEngine,
  IconHistory,
  IconMenu2,
  IconReceiptTax,
  IconRobot,
  IconShieldCheck,
  IconShoppingBag,
  IconSparkles,
  IconUsersGroup,
  IconWallet,
  IconX,
} from "@tabler/icons-react";

// Icons come from Tabler, which has a real automotive set (garage, engine,
// lifter, oil). Everything on the page goes through this map, so swapping a
// glyph is a one-line change and stroke weight stays consistent.
type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

function adapt(Glyph: TablerIcon, stroke = 1.7) {
  return function Adapted({ width, height, className }: IconProps) {
    return (
      <Glyph size={width ?? height ?? 24} stroke={stroke} className={className} />
    );
  };
}

/* product modules */
export const GarageIcon = adapt(IconCarGarage);
export const HistoryIcon = adapt(IconHistory);
export const AiIcon = adapt(IconRobot);
export const RobotIcon = adapt(IconRobot);
export const BoxIcon = adapt(IconCarLifter);
export const PartnersIcon = adapt(IconBuildingStore);
export const MarketIcon = adapt(IconShoppingBag);
export const WalletIcon = adapt(IconWallet);
export const CommunityIcon = adapt(IconUsersGroup);
export const BellIcon = adapt(IconBellRinging);
export const CarIcon = adapt(IconCar);
export const ShieldIcon = adapt(IconShieldCheck);

/* dashboard lamps */
export const InspectionIcon = adapt(IconClipboardCheck, 1.8);
export const OilIcon = adapt(IconDroplet, 1.8);
export const InsuranceIcon = adapt(IconShieldCheck, 1.8);
export const TaxIcon = adapt(IconReceiptTax, 1.8);
export const EngineIcon = adapt(IconEngine, 1.8);

/* interface */
export const CheckIcon = adapt(IconCheck, 2.2);
export const ArrowRight = adapt(IconArrowNarrowRight, 1.8);
export const CloseIcon = adapt(IconX, 1.8);
export const MenuIcon = adapt(IconMenu2, 1.8);
export const SparkIcon = adapt(IconSparkles, 1.8);

/* social */
export const WhatsAppIcon = adapt(IconBrandWhatsapp, 1.8);
export const InstagramIcon = adapt(IconBrandInstagram, 1.8);
