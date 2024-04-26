export const isCSSHasSupport = CSS.supports("selector(:has(+ *))");
export const observerConfig = {
  childList: true,
  subtree: true,
};
