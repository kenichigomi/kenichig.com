// cookies!

  const getCookieForChecker = (name) => {
    const value = " " + document.cookie;
    console.log("value", `==${value}==`);
    const parts = value.split(" " + name + "=");
    return parts.length < 2 ? undefined : parts.pop().split(";").shift();
  };
  
  const setCookieForChecker = function (name, value, expiryDays, domain, path, secure) {
    const exdate = new Date();
    exdate.setHours(
      exdate.getHours() +
        (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
    );
    document.cookie =
      name +
      "=" +
      value +
      ";expires=" +
      exdate.toUTCString() +
      ";path=" +
      (path || "/") +
      (domain ? ";domain=" + domain : "") +
      (secure ? ";secure" : "");
  };


  const $cookiesBanner = document.querySelector(".cookieBanner");
  const $cookiesBannerButton = $cookiesBanner.querySelector("button");
  const cookieAccept = "cookiesBanner";
  const hasCookie = getCookieForChecker(cookieAccept);

  
  if (!hasCookie) {
    $cookiesBanner.classList.remove("hidden");
  }

  $cookiesBannerButton.addEventListener("click", () => {
    setCookieForChecker(cookieAccept, "closed");
    $cookiesBanner.remove();
  });


