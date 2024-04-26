let isRedirectShorts = false;

// Function to redirect to the watch page
function redirectToWatchPage() {
  // If isRedirectShorts = false, exit the function
  if (!isRedirectShorts) return;

  const { origin, pathname } = location;

  // Check if the current page is a shorts video
  const isShorts = pathname.startsWith("/shorts/");

  // if isShorts = false, exit the function
  if (!isShorts) return;

  const newURL = `${origin}${pathname.replace("/shorts/", "/watch?v=")}`;
  location.replace(newURL);
}

export const optionRedirectShorts = (value) => {
  isRedirectShorts = value;
  redirectToWatchPage();
};

document.addEventListener("yt-navigate-start", redirectToWatchPage);
