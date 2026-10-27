import React from 'react';
import { PageHero, SectionHead, GlowCells, FinalCTA, HERO_LOOKS, HERO_PHOTOS, Hi } from '../components/Kit.jsx';
import FlutedBackground from '../components/FlutedBackground.jsx';
import './About.css';

import inv1 from '../assets/investors/inv1.png';
import inv2 from '../assets/investors/inv2.png';
import inv3 from '../assets/investors/inv3.png';
import inv4 from '../assets/investors/inv4.png';
import inv5 from '../assets/investors/inv5.png';
import inv6 from '../assets/investors/inv6.png';
import inv7 from '../assets/investors/inv7.png';

export const LOGOS = [inv1, inv2, inv3, inv4, inv5, inv6, inv7];
const serif = "'Lora',Georgia,serif";
const FLAGS = import.meta.glob('../assets/flags/*.svg', { eager: true, query: '?url', import: 'default' });
const flag = (c) => FLAGS[`../assets/flags/${c}.svg`];

export const STATS = [
  { value: 100, fmt: (n) => Math.round(n) + '+', label: 'Markets', ctx: 'Live across Africa, Europe, the Americas, and the Middle East.' },
  { value: 15000, fmt: (n) => Math.round(n).toLocaleString() + '+', label: 'Businesses', ctx: 'From early teams to multi-entity global operators.' },
  { value: 12, fmt: (n) => '$' + Math.round(n) + 'B', label: 'Annualized volume', ctx: 'Settled across cards, payments, and treasury every year.' },
  { value: 20, fmt: (n) => Math.round(n) + '+', label: 'Licenses', ctx: 'Regulated coverage to operate compliantly in every market.' },
];

export const VALUES = [
  { t: 'Money should move as fast as the decision to move it.',
    d: 'Settlement in seconds across rails and markets, so finance is never the thing your team is waiting on.',
    p: 'A vendor approved at 2pm is paid by 2:01, not next week.' },
  { t: 'Automate the work, keep the judgment.',
    d: 'Agents run the busywork end to end. The approvals, the limits, and the final call stay with people.',
    p: 'Agents draft, match, and reconcile; people approve and decide.' },
  { t: 'One platform, one source of truth.',
    d: 'Every card, payment, and entry lands in the same ledger and reconciles as it happens, not at month end.',
    p: 'Cards, payments, and accounting agree in real time, not at close.' },
  { t: 'Global is the default, not an add-on.',
    d: 'Multi-entity, multi-currency, and multi-market from the first day, because the operators we build for already are.',
    p: 'Open a local account and pay into a new market the same day.' },
];

export const OFFICES = [
  { city: 'New York', region: 'North America', iso: 'us' },
  { city: 'Toronto', region: 'Canada', iso: 'ca' },
  { city: 'London', region: 'United Kingdom', iso: 'gb' },
  { city: 'Latvia', region: 'Europe', iso: 'lv' },
  { city: 'Lagos', region: 'Africa', iso: 'ng' },
];

export const MAP_W = 1000, MAP_H = 380;
export const DOTS = '270.7 348.6;281.1 348.6;937.0 348.6;260.3 338.1;270.7 338.1;281.1 338.1;291.5 338.1;926.6 338.1;937.0 338.1;947.4 338.1;260.3 327.7;270.7 327.7;281.1 327.7;291.5 327.7;937.0 327.7;260.3 317.2;270.7 317.2;281.1 317.2;291.5 317.2;260.3 306.8;270.7 306.8;281.1 306.8;291.5 306.8;301.9 306.8;312.3 306.8;520.5 306.8;531.0 306.8;541.4 306.8;801.6 306.8;812.1 306.8;822.5 306.8;832.9 306.8;843.3 306.8;853.7 306.8;864.1 306.8;270.7 296.3;281.1 296.3;291.5 296.3;301.9 296.3;312.3 296.3;322.7 296.3;510.1 296.3;520.5 296.3;531.0 296.3;541.4 296.3;551.8 296.3;801.6 296.3;812.1 296.3;822.5 296.3;832.9 296.3;843.3 296.3;853.7 296.3;864.1 296.3;270.7 285.8;281.1 285.8;291.5 285.8;301.9 285.8;312.3 285.8;322.7 285.8;499.7 285.8;510.1 285.8;520.5 285.8;531.0 285.8;541.4 285.8;551.8 285.8;562.2 285.8;801.6 285.8;812.1 285.8;822.5 285.8;832.9 285.8;843.3 285.8;853.7 285.8;864.1 285.8;260.3 275.4;270.7 275.4;281.1 275.4;291.5 275.4;301.9 275.4;312.3 275.4;322.7 275.4;333.2 275.4;499.7 275.4;510.1 275.4;520.5 275.4;531.0 275.4;541.4 275.4;551.8 275.4;562.2 275.4;812.1 275.4;822.5 275.4;832.9 275.4;843.3 275.4;853.7 275.4;260.3 264.9;270.7 264.9;281.1 264.9;291.5 264.9;301.9 264.9;312.3 264.9;322.7 264.9;333.2 264.9;499.7 264.9;510.1 264.9;520.5 264.9;531.0 264.9;541.4 264.9;551.8 264.9;562.2 264.9;260.3 254.4;270.7 254.4;281.1 254.4;291.5 254.4;301.9 254.4;312.3 254.4;322.7 254.4;333.2 254.4;343.6 254.4;499.7 254.4;510.1 254.4;520.5 254.4;531.0 254.4;541.4 254.4;551.8 254.4;562.2 254.4;260.3 244.0;270.7 244.0;281.1 244.0;291.5 244.0;301.9 244.0;312.3 244.0;322.7 244.0;333.2 244.0;343.6 244.0;354.0 244.0;489.3 244.0;499.7 244.0;510.1 244.0;520.5 244.0;531.0 244.0;541.4 244.0;551.8 244.0;770.4 244.0;780.8 244.0;791.2 244.0;801.6 244.0;812.1 244.0;260.3 233.5;270.7 233.5;281.1 233.5;291.5 233.5;301.9 233.5;312.3 233.5;322.7 233.5;333.2 233.5;343.6 233.5;354.0 233.5;478.9 233.5;489.3 233.5;499.7 233.5;510.1 233.5;520.5 233.5;531.0 233.5;541.4 233.5;551.8 233.5;572.6 233.5;583.0 233.5;760.0 233.5;770.4 233.5;780.8 233.5;791.2 233.5;801.6 233.5;812.1 233.5;822.5 233.5;832.9 233.5;270.7 223.0;281.1 223.0;291.5 223.0;301.9 223.0;312.3 223.0;322.7 223.0;333.2 223.0;343.6 223.0;468.5 223.0;478.9 223.0;489.3 223.0;499.7 223.0;510.1 223.0;520.5 223.0;531.0 223.0;541.4 223.0;551.8 223.0;562.2 223.0;572.6 223.0;583.0 223.0;593.4 223.0;760.0 223.0;770.4 223.0;780.8 223.0;791.2 223.0;801.6 223.0;812.1 223.0;822.5 223.0;832.9 223.0;270.7 212.6;281.1 212.6;291.5 212.6;301.9 212.6;312.3 212.6;322.7 212.6;333.2 212.6;343.6 212.6;468.5 212.6;478.9 212.6;489.3 212.6;499.7 212.6;510.1 212.6;520.5 212.6;531.0 212.6;541.4 212.6;551.8 212.6;562.2 212.6;572.6 212.6;583.0 212.6;593.4 212.6;760.0 212.6;770.4 212.6;780.8 212.6;791.2 212.6;801.6 212.6;812.1 212.6;822.5 212.6;281.1 202.1;291.5 202.1;301.9 202.1;312.3 202.1;468.5 202.1;478.9 202.1;489.3 202.1;499.7 202.1;510.1 202.1;520.5 202.1;531.0 202.1;541.4 202.1;551.8 202.1;562.2 202.1;572.6 202.1;583.0 202.1;593.4 202.1;791.2 202.1;801.6 202.1;468.5 191.7;478.9 191.7;489.3 191.7;499.7 191.7;510.1 191.7;520.5 191.7;531.0 191.7;541.4 191.7;551.8 191.7;562.2 191.7;572.6 191.7;583.0 191.7;593.4 191.7;468.5 181.2;478.9 181.2;489.3 181.2;499.7 181.2;510.1 181.2;520.5 181.2;531.0 181.2;541.4 181.2;551.8 181.2;562.2 181.2;572.6 181.2;583.0 181.2;655.9 181.2;666.3 181.2;676.7 181.2;687.1 181.2;697.5 181.2;468.5 170.7;478.9 170.7;489.3 170.7;499.7 170.7;510.1 170.7;520.5 170.7;531.0 170.7;541.4 170.7;551.8 170.7;562.2 170.7;645.5 170.7;655.9 170.7;666.3 170.7;676.7 170.7;687.1 170.7;697.5 170.7;707.9 170.7;718.4 170.7;728.8 170.7;739.2 170.7;749.6 170.7;760.0 170.7;770.4 170.7;780.8 170.7;791.2 170.7;187.4 160.3;197.8 160.3;208.2 160.3;218.6 160.3;229.0 160.3;239.5 160.3;478.9 160.3;489.3 160.3;499.7 160.3;510.1 160.3;520.5 160.3;531.0 160.3;541.4 160.3;551.8 160.3;645.5 160.3;655.9 160.3;666.3 160.3;676.7 160.3;687.1 160.3;697.5 160.3;707.9 160.3;718.4 160.3;728.8 160.3;739.2 160.3;749.6 160.3;760.0 160.3;770.4 160.3;780.8 160.3;791.2 160.3;801.6 160.3;812.1 160.3;822.5 160.3;177.0 149.8;187.4 149.8;197.8 149.8;208.2 149.8;218.6 149.8;229.0 149.8;239.5 149.8;249.9 149.8;489.3 149.8;499.7 149.8;510.1 149.8;520.5 149.8;531.0 149.8;645.5 149.8;655.9 149.8;666.3 149.8;676.7 149.8;687.1 149.8;697.5 149.8;707.9 149.8;718.4 149.8;728.8 149.8;739.2 149.8;749.6 149.8;760.0 149.8;770.4 149.8;780.8 149.8;791.2 149.8;801.6 149.8;812.1 149.8;822.5 149.8;832.9 149.8;166.6 139.3;177.0 139.3;187.4 139.3;197.8 139.3;208.2 139.3;218.6 139.3;229.0 139.3;239.5 139.3;249.9 139.3;645.5 139.3;655.9 139.3;666.3 139.3;676.7 139.3;687.1 139.3;697.5 139.3;707.9 139.3;718.4 139.3;728.8 139.3;739.2 139.3;749.6 139.3;760.0 139.3;770.4 139.3;780.8 139.3;791.2 139.3;801.6 139.3;812.1 139.3;822.5 139.3;832.9 139.3;843.3 139.3;145.8 128.9;156.2 128.9;166.6 128.9;177.0 128.9;187.4 128.9;197.8 128.9;208.2 128.9;218.6 128.9;229.0 128.9;239.5 128.9;249.9 128.9;655.9 128.9;666.3 128.9;676.7 128.9;687.1 128.9;697.5 128.9;707.9 128.9;718.4 128.9;728.8 128.9;739.2 128.9;749.6 128.9;760.0 128.9;770.4 128.9;780.8 128.9;791.2 128.9;801.6 128.9;812.1 128.9;822.5 128.9;832.9 128.9;843.3 128.9;853.7 128.9;135.3 118.4;145.8 118.4;156.2 118.4;166.6 118.4;177.0 118.4;187.4 118.4;197.8 118.4;208.2 118.4;218.6 118.4;229.0 118.4;239.5 118.4;249.9 118.4;260.3 118.4;635.1 118.4;645.5 118.4;655.9 118.4;666.3 118.4;676.7 118.4;687.1 118.4;697.5 118.4;707.9 118.4;718.4 118.4;728.8 118.4;739.2 118.4;749.6 118.4;760.0 118.4;770.4 118.4;780.8 118.4;791.2 118.4;801.6 118.4;812.1 118.4;822.5 118.4;832.9 118.4;843.3 118.4;853.7 118.4;124.9 107.9;135.3 107.9;145.8 107.9;156.2 107.9;166.6 107.9;177.0 107.9;187.4 107.9;197.8 107.9;208.2 107.9;218.6 107.9;229.0 107.9;239.5 107.9;249.9 107.9;260.3 107.9;270.7 107.9;281.1 107.9;458.1 107.9;468.5 107.9;478.9 107.9;489.3 107.9;499.7 107.9;614.2 107.9;624.7 107.9;635.1 107.9;645.5 107.9;655.9 107.9;666.3 107.9;676.7 107.9;687.1 107.9;697.5 107.9;707.9 107.9;718.4 107.9;728.8 107.9;739.2 107.9;749.6 107.9;760.0 107.9;770.4 107.9;780.8 107.9;791.2 107.9;801.6 107.9;812.1 107.9;822.5 107.9;832.9 107.9;843.3 107.9;853.7 107.9;124.9 97.5;135.3 97.5;145.8 97.5;156.2 97.5;166.6 97.5;177.0 97.5;187.4 97.5;197.8 97.5;208.2 97.5;218.6 97.5;229.0 97.5;239.5 97.5;249.9 97.5;260.3 97.5;270.7 97.5;281.1 97.5;291.5 97.5;458.1 97.5;468.5 97.5;478.9 97.5;489.3 97.5;499.7 97.5;510.1 97.5;520.5 97.5;531.0 97.5;603.8 97.5;614.2 97.5;624.7 97.5;635.1 97.5;645.5 97.5;655.9 97.5;666.3 97.5;676.7 97.5;687.1 97.5;697.5 97.5;707.9 97.5;718.4 97.5;728.8 97.5;739.2 97.5;749.6 97.5;760.0 97.5;770.4 97.5;780.8 97.5;791.2 97.5;801.6 97.5;812.1 97.5;822.5 97.5;832.9 97.5;843.3 97.5;853.7 97.5;864.1 97.5;874.5 97.5;124.9 87.0;135.3 87.0;145.8 87.0;156.2 87.0;166.6 87.0;177.0 87.0;187.4 87.0;197.8 87.0;208.2 87.0;218.6 87.0;229.0 87.0;239.5 87.0;249.9 87.0;260.3 87.0;270.7 87.0;281.1 87.0;291.5 87.0;447.7 87.0;458.1 87.0;468.5 87.0;478.9 87.0;489.3 87.0;499.7 87.0;510.1 87.0;520.5 87.0;531.0 87.0;541.4 87.0;593.4 87.0;603.8 87.0;614.2 87.0;624.7 87.0;635.1 87.0;645.5 87.0;655.9 87.0;666.3 87.0;676.7 87.0;687.1 87.0;697.5 87.0;707.9 87.0;718.4 87.0;728.8 87.0;739.2 87.0;749.6 87.0;760.0 87.0;770.4 87.0;780.8 87.0;791.2 87.0;801.6 87.0;812.1 87.0;822.5 87.0;832.9 87.0;843.3 87.0;853.7 87.0;864.1 87.0;874.5 87.0;884.9 87.0;104.1 76.6;114.5 76.6;124.9 76.6;135.3 76.6;145.8 76.6;156.2 76.6;166.6 76.6;177.0 76.6;187.4 76.6;197.8 76.6;208.2 76.6;218.6 76.6;229.0 76.6;239.5 76.6;249.9 76.6;260.3 76.6;270.7 76.6;281.1 76.6;447.7 76.6;458.1 76.6;468.5 76.6;478.9 76.6;489.3 76.6;499.7 76.6;510.1 76.6;520.5 76.6;531.0 76.6;541.4 76.6;551.8 76.6;593.4 76.6;603.8 76.6;614.2 76.6;624.7 76.6;635.1 76.6;645.5 76.6;655.9 76.6;666.3 76.6;676.7 76.6;687.1 76.6;697.5 76.6;707.9 76.6;718.4 76.6;728.8 76.6;739.2 76.6;749.6 76.6;760.0 76.6;770.4 76.6;780.8 76.6;791.2 76.6;801.6 76.6;812.1 76.6;822.5 76.6;832.9 76.6;843.3 76.6;853.7 76.6;864.1 76.6;874.5 76.6;884.9 76.6;895.3 76.6;104.1 66.1;114.5 66.1;124.9 66.1;135.3 66.1;145.8 66.1;156.2 66.1;166.6 66.1;177.0 66.1;187.4 66.1;197.8 66.1;208.2 66.1;218.6 66.1;229.0 66.1;239.5 66.1;249.9 66.1;260.3 66.1;447.7 66.1;458.1 66.1;468.5 66.1;478.9 66.1;489.3 66.1;499.7 66.1;510.1 66.1;520.5 66.1;531.0 66.1;541.4 66.1;551.8 66.1;562.2 66.1;593.4 66.1;603.8 66.1;614.2 66.1;624.7 66.1;635.1 66.1;645.5 66.1;655.9 66.1;666.3 66.1;676.7 66.1;687.1 66.1;697.5 66.1;707.9 66.1;718.4 66.1;728.8 66.1;739.2 66.1;749.6 66.1;760.0 66.1;770.4 66.1;780.8 66.1;791.2 66.1;801.6 66.1;812.1 66.1;822.5 66.1;832.9 66.1;843.3 66.1;853.7 66.1;864.1 66.1;874.5 66.1;884.9 66.1;895.3 66.1;104.1 55.6;114.5 55.6;124.9 55.6;135.3 55.6;145.8 55.6;156.2 55.6;166.6 55.6;177.0 55.6;187.4 55.6;197.8 55.6;208.2 55.6;218.6 55.6;229.0 55.6;239.5 55.6;249.9 55.6;468.5 55.6;478.9 55.6;489.3 55.6;499.7 55.6;510.1 55.6;520.5 55.6;531.0 55.6;541.4 55.6;551.8 55.6;562.2 55.6;603.8 55.6;614.2 55.6;624.7 55.6;635.1 55.6;645.5 55.6;655.9 55.6;666.3 55.6;676.7 55.6;687.1 55.6;697.5 55.6;707.9 55.6;718.4 55.6;728.8 55.6;739.2 55.6;749.6 55.6;760.0 55.6;770.4 55.6;780.8 55.6;791.2 55.6;801.6 55.6;812.1 55.6;822.5 55.6;832.9 55.6;843.3 55.6;853.7 55.6;864.1 55.6;874.5 55.6;884.9 55.6;895.3 55.6;104.1 45.2;114.5 45.2;124.9 45.2;135.3 45.2;145.8 45.2;156.2 45.2;166.6 45.2;177.0 45.2;187.4 45.2;197.8 45.2;208.2 45.2;218.6 45.2;229.0 45.2;239.5 45.2;510.1 45.2;520.5 45.2;531.0 45.2;541.4 45.2;551.8 45.2;614.2 45.2;624.7 45.2;635.1 45.2;645.5 45.2;655.9 45.2;666.3 45.2;676.7 45.2;687.1 45.2;697.5 45.2;707.9 45.2;718.4 45.2;728.8 45.2;739.2 45.2;749.6 45.2;760.0 45.2;770.4 45.2;780.8 45.2;791.2 45.2;801.6 45.2;812.1 45.2;822.5 45.2;832.9 45.2;843.3 45.2;853.7 45.2;864.1 45.2;874.5 45.2;884.9 45.2;124.9 34.7;135.3 34.7;145.8 34.7;156.2 34.7;166.6 34.7;177.0 34.7;187.4 34.7;197.8 34.7;208.2 34.7;322.7 34.7;333.2 34.7;343.6 34.7;354.0 34.7;364.4 34.7;374.8 34.7;645.5 34.7;655.9 34.7;666.3 34.7;676.7 34.7;687.1 34.7;697.5 34.7;707.9 34.7;718.4 34.7;728.8 34.7;739.2 34.7;749.6 34.7;760.0 34.7;770.4 34.7;780.8 34.7;791.2 34.7;801.6 34.7;812.1 34.7;832.9 34.7;843.3 34.7;853.7 34.7;864.1 34.7;322.7 24.2;333.2 24.2;343.6 24.2;354.0 24.2;364.4 24.2;374.8 24.2;385.2 24.2;687.1 24.2;697.5 24.2;707.9 24.2;718.4 24.2;728.8 24.2;739.2 24.2;749.6 24.2;760.0 24.2;322.7 13.8;333.2 13.8;343.6 13.8;354.0 13.8;364.4 13.8;374.8 13.8;333.2 3.3;343.6 3.3;354.0 3.3;364.4 3.3'.split(';').map((s) => s.split(' ').map(Number));
export const PINS = [
  { c: 'New York', x: 263.0, y: 108.2, la: 'start', dx: 11, dy: 15 },
  { c: 'Toronto', x: 248.2, y: 100.0, la: 'end', dx: -11, dy: -7 },
  { c: 'London', x: 465.5, y: 78.5, la: 'end', dx: -11, dy: -7 },
  { c: 'Latvia', x: 531.8, y: 63.6, la: 'start', dx: 11, dy: 4 },
  { c: 'Lagos', x: 475.1, y: 202.4, la: 'start', dx: 13, dy: 5 },
];
const GLOWS = [[520.5, 214.8], [506.8, 82.6], [219.2, 170.7], [608.2, 151.4]];
export const ARCS = [[0, 2], [2, 3], [2, 4], [1, 2], [0, 4]];
export const arcPath = (a, b) => {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - dist * 0.22;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

function useInView(ref, margin = 0.85) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (seen) return;
    let last = 0;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * margin && r.bottom > 0) {
        setSeen(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 60) return;
      last = now;
      check();
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [seen, margin]);
  return seen;
}

function StatNumber({ value, run, fmt }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    let raf, start;
    const dur = 1500;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{fmt(n)}</>;
}

export default function AboutPage() {
  const statsRef = React.useRef(null);
  const statsIn = useInView(statsRef);
  return (
    <main className="ab">
      <PageHero
        look={HERO_LOOKS.about}
        photo={HERO_PHOTOS.about}
        eyebrow="About Hinstantt"
        title={<>Building the operating system for <em className="ab-accent ab-accent--light">global money</em>.</>}
        sub="Cards, payments, treasury and accounting on one platform, run by agents that work 24/7 across 100+ markets."
        actions={<><a className="btn btn-primary" href="/contact">Get in touch</a><a className="btn btn-ghost" href="#believe">What we believe</a></>}
      />

      {/* why we exist */}
      <section className="ab-sec">
        <div className="wrap ab-story">
          <div>
            <SectionHead kicker="Our story" title="Why we exist." />
            <p className="ab-p">Finance is the one function still built for a single country. Most global teams run a different stack in every market: a bank here, a card program there, a spreadsheet holding it together, and a month-end scramble to make the numbers agree.</p>
            <p className="ab-p">Hinstantt collapses that into one platform. Cards, payments, treasury and accounting run across every market a business operates in, and AI agents handle the work that used to live in inboxes and reconciliations.</p>
            <p className="ab-p">We build for operators who are already global, because that is where money is hardest and the tools are weakest.</p>
          </div>
          <blockquote className="ab-quote" data-enter>Finance should move at the speed of the business, not the other way around.</blockquote>
        </div>
      </section>

      {/* numbers, counting up, in glowing-line cells */}
      <section className="ab-sec ab-sec--tight" ref={statsRef}>
        <div className="wrap">
          <GlowCells cols={4}>
            {STATS.map((st) => (
              <div key={st.label} className="ab-stat">
                <span className="ab-stat-v"><StatNumber value={st.value} run={statsIn} fmt={st.fmt} /></span>
                <span className="ab-stat-l">{st.label}</span>
                <p className="kf-d">{st.ctx}</p>
              </div>
            ))}
          </GlowCells>
        </div>
      </section>

      {/* values */}
      <section className="ab-sec" id="believe">
        <div className="wrap">
          <SectionHead kicker="Principles" title="What we believe." />
          <GlowCells cols={2} className="ab-values">
            {VALUES.map((v, i) => (
              <div key={v.t}>
                <span className="ab-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ab-value-t">{v.t}</h3>
                <p className="kf-d">{v.d}</p>
                <p className="ab-practice"><b>In practice</b> {v.p}</p>
              </div>
            ))}
          </GlowCells>
        </div>
      </section>

      {/* coverage: the dot map on the dark fluted glass */}
      <section className="ab-map">
        <div className="ab-map-bg" aria-hidden="true"><FlutedBackground className="ab-map-scene" dark hue={10} /></div>
        <div className="wrap">
          <SectionHead light kicker="Coverage" title="Live in 100+ markets." sub="Teams in five cities, money moving across Africa, Europe, the Americas and the Middle East." />
          <svg className="ab-map-svg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Global coverage map">
            <defs>
              <radialGradient id="abGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(0,169,224,.5)" /><stop offset="100%" stopColor="rgba(0,169,224,0)" /></radialGradient>
            </defs>
            {GLOWS.map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r="135" fill="url(#abGlow)" opacity=".45" />)}
            <g fill="rgba(170,200,225,.3)">{DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.7" />)}</g>
            <g fill="none" stroke="rgba(120,215,255,.55)" strokeWidth="1" strokeLinecap="round">
              {ARCS.map(([a, b], i) => <path key={i} className="ab-arc" d={arcPath(PINS[a], PINS[b])} pathLength="100" style={{ '--i': i }} />)}
            </g>
            {PINS.map((p) => (
              <g key={p.c}>
                <circle className="ab-pin-halo" cx={p.x} cy={p.y} r="10" />
                <circle cx={p.x} cy={p.y} r="4.5" fill="#7fd3ff" />
                <circle cx={p.x} cy={p.y} r="1.8" fill="#fff" />
                <text x={p.x + p.dx} y={p.y + p.dy} textAnchor={p.la} fontFamily="'Inter',sans-serif" fontSize="12.5" fontWeight="600" fill="#fff">{p.c}</text>
              </g>
            ))}
          </svg>
          <div className="ab-offices">
            {OFFICES.map((o) => (
              <span key={o.city} className="ab-office"><img src={flag(o.iso)} alt="" /><b>{o.city}</b><small>{o.region}</small></span>
            ))}
          </div>
        </div>
      </section>

      {/* investors */}
      <section className="ab-sec">
        <div className="wrap">
          <SectionHead kicker="Investors" title="Backed by leading investors." sub="We are building the infrastructure for global money, with investors who back category-defining companies." />
          <GlowCells cols={LOGOS.length > 6 ? 4 : 3} className="ab-logos">
            {LOGOS.map((logo, i) => <img key={i} src={logo} alt="" loading="lazy" decoding="async" />)}
          </GlowCells>
        </div>
      </section>

      <FinalCTA title="Come build with us." sub="We are growing the team behind the Finance OS for global operators." />
    </main>
  );
}
