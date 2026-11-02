// ES Module Export for Vite / standard React bundling
import { PORTFOLIO_DATA as RAW_DATA } from '../../data/portfolioData.js';
export const PORTFOLIO_DATA = RAW_DATA || (typeof window !== 'undefined' ? window.PORTFOLIO_DATA : {});
