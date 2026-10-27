import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Tick02Icon, SparklesIcon, ArrowRight02Icon, Alert02Icon, Add01Icon, AirplaneTakeOff01Icon, DollarCircleIcon,
  Invoice01Icon, SecurityCheckIcon, ArrowExpand01Icon, ChartColumnIcon, CheckmarkCircle02Icon, HandPrayerIcon,
  Cancel01Icon, Globe02Icon, Building03Icon, ArrowDataTransferHorizontalIcon, ArrowUpRight01Icon, FlashIcon,
  Shield01Icon, CreditCardIcon, File01Icon, ChartHistogramIcon, Layers01Icon, UserGroupIcon, Mail01Icon, Store01Icon,
  SmartPhone01Icon, Exchange01Icon, BankIcon, Coins01Icon, Calculator01Icon, SentIcon, ReceiptDollarIcon,
  ShoppingCart01Icon, Airplane01Icon, Wallet01Icon, InformationCircleIcon, Building06Icon, StopIcon, Briefcase01Icon,
} from '@hugeicons/core-free-icons';

// Every icon on the site comes from Hugeicons. These wrappers keep the call sites that
// were written for another set working: `size` and `weight` (bold draws a heavier stroke).
const make = (icon) => {
  const C = ({ size = 16, weight, color = 'currentColor', ...rest }) => (
    <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={weight === 'bold' ? 2.2 : weight === 'fill' ? 2 : 1.7} {...rest} />
  );
  return C;
};

export const Check = make(Tick02Icon);
export const Sparkle = make(SparklesIcon);
export const ArrowRight = make(ArrowRight02Icon);
export const Warning = make(Alert02Icon);
export const Plus = make(Add01Icon);
export const AirplaneTilt = make(AirplaneTakeOff01Icon);
export const CurrencyDollar = make(DollarCircleIcon);
export const Receipt = make(Invoice01Icon);
export const ShieldCheck = make(SecurityCheckIcon);
export const ArrowsOutSimple = make(ArrowExpand01Icon);
export const ChartBar = make(ChartColumnIcon);
export const CheckCircle = make(CheckmarkCircle02Icon);
export const HandPalm = make(StopIcon);
export const X = make(Cancel01Icon);
export const GlobeHemisphereWest = make(Globe02Icon);
export const Buildings = make(Building03Icon);
export const ArrowsLeftRight = make(ArrowDataTransferHorizontalIcon);
export const CreditCard = make(CreditCardIcon);
export const PaperPlaneTilt = make(SentIcon);
export const Bank = make(BankIcon);
export const Calculator = make(Calculator01Icon);

// the site's small inline set (Ic.*), now Hugeicons
const ic = (icon, size) => (p) => <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={1.9} {...p} />;
export const Ic = {
  arrow: ic(ArrowRight02Icon, 14), arrowNE: ic(ArrowUpRight01Icon, 12), check: ic(Tick02Icon, 12), plus: ic(Add01Icon, 12),
  spark: ic(SparklesIcon, 14), bolt: ic(FlashIcon, 12), shield: ic(Shield01Icon, 12), planet: ic(Globe02Icon, 14),
  cards: ic(CreditCardIcon, 14), doc: ic(File01Icon, 14), chart: ic(ChartHistogramIcon, 14), stack: ic(Layers01Icon, 14),
};

// the nav menu's icons, by key
const NAV = {
  accounting: Calculator01Icon, accounts: Wallet01Icon, cards: CreditCardIcon, expense: ReceiptDollarIcon, payments: SentIcon,
  procurement: ShoppingCart01Icon, reporting: ChartHistogramIcon, stablecoin: Coins01Icon, travel: Airplane01Icon, treasury: BankIcon,
  aboutus: InformationCircleIcon, contact: Mail01Icon, banksandfinancialinstitutions: BankIcon, corporateandliquidity: Building06Icon,
  fintechneobank: SmartPhone01Icon, fxandliquidity: Exchange01Icon, marketplaceandgigplatforms: Store01Icon,
  mobilenetworkproviders: SmartPhone01Icon, paymentserviceproviders: CreditCardIcon, remittanceplatform: SentIcon,
  invoicing: Invoice01Icon, Invoiceandbilling: Invoice01Icon, ai: SparklesIcon, AI: SparklesIcon, team: UserGroupIcon, briefcase: Briefcase01Icon, hand: HandPrayerIcon,
};
export const NavIcon = ({ k, size = 18 }) => <span className="nav-ic"><HugeiconsIcon icon={NAV[k] || Layers01Icon} size={size} color="currentColor" strokeWidth={1.7} /></span>;
