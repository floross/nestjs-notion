import { NotionModuleOptions } from '../interfaces';

const defaultOptions: NotionModuleOptions = {
  notionVersion: '2021-05-13',
};

export function mergeDefaults(
  options: NotionModuleOptions,
  defaults: NotionModuleOptions = defaultOptions,
) {
  return {
    ...defaults,
    ...options,
  };
}
