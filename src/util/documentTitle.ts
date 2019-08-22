import { SITE_NAME } from '../config';

export const documentTitle = (page?: string): void => {
  document.title = SITE_NAME + (page ? (' - ' + page) : '');
};
