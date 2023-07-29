// cookies!
function setCookie(cookie_name, cookie_value, exp_days) {
    const d = new Date();
    d.setTime(d.getTime() + (exp_days * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
};
  
  function getCookie(cookie_name) {
    let name = cookie_name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};

(() => {
  const $cookiesBanner = document.querySelector(".cookieBanner");
  const $cookiesBannerButton = $cookiesBanner.querySelector("acceptButton");
  const cookieName = "cookiePerms";
  const hasCookie = getCookie(cookieName);

  
  if (!hasCookie) {
    $cookiesBanner.classList.remove("hidden");
  }

  $cookiesBannerButton.addEventListener("click", () => {
    setCookie(cookiePerms, "closed", 365);
    $cookiesBanner.remove();
  });
})();

