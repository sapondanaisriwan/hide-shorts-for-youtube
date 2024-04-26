// Hides the first element that matches the given selector.
export const hideElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = "none";
  }
};

// Hides all elements that match the given selector.
export const hideAllElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    if (element.style.display !== "none") {
      element.style.display = "none";
    }
  });
};

export const hideElementIfNotHidden = (element, hideShorts) => {
  const shortsDisplayStyle = hideShorts ? "none" : "";

  if (!element) {
    return;
  }

  if (!element.style) {
    return;
  }

  if (element.style.display !== shortsDisplayStyle) {
    element.style.display = shortsDisplayStyle;
  }
};
