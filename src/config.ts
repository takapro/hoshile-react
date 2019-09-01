declare const config: {
  siteName?: string;
  basePath?: string;
  apiBase?: string;
};

const CONFIG = typeof config === 'undefined' ? {} : config;

export const SITE_NAME = CONFIG.siteName || 'HoshiLe’s Store';

export const BASE_PATH = CONFIG.basePath || '/';

const API_BASE = CONFIG.apiBase || 'https://hoshile-api.herokuapp.com/';
export const PRODUCT_API = API_BASE + 'products';
export const USER_API = API_BASE + 'user';
export const ORDER_API = API_BASE + 'orders';
