export const queryShortVideoLinks = () => {
  return [...document.querySelectorAll('a[href^="/shorts/"')];
};
