export const $ = <T extends HTMLElement = HTMLDivElement>(selector: string) => {
  return document.querySelector(selector) as T;
};
// export const $$ = <T extends HTMLElement = HTMLDivElement>(
//   selector: string
// ) => {
//   return document.querySelectorAll(selector) as T;
// };
