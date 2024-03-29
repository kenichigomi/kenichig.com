// init
const canvas = document.getElementById("plant");
const ctx = canvas.getContext("2d");

// randon integer puller
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// date grabber
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// season grabber
function getSeason(date) {
  const springStart = new Date(date.getFullYear(), 2, 20); 
  const summerStart = new Date(date.getFullYear(), 5, 21); 
  const autumnStart = new Date(date.getFullYear(), 8, 22); 
  const winterStart = new Date(date.getFullYear(), 11, 21); 

  if (date >= springStart && date < summerStart) {
    return 'Summer';
  } else if (date >= summerStart && date < autumnStart) {
    return 'Summer';
  } else if (date >= autumnStart && date < winterStart) {
    return 'Fall';
  } else {
    return 'Summer';
  }
};

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
  
function checkCookie() {
    let check_cookie = getCookie("cookiesBanner");
    if (check_cookie === "closed") {
      //pass 
    } else {
        setCookie("tree_color", getRandomInt(64, 168), 10000);
        setCookie("plus_angle", getRandomInt(10, 30), 10000);
        setCookie("minus_angle", getRandomInt(10, 30), 10000);
        setCookie("water_streak", 0, 10000);
        setCookie("did_user_water", "no", 1);
    }
};

// draw leaf
function leaves(ctx, branchX, branchY, leafSize) {
    const currentDate = new Date();
    const currentSeason = getSeason(currentDate);
    ctx.save();

    if (currentSeason === 'Winter') {
      // pass
    }
    else if (currentSeason === 'Spring') {
      ctx.fillStyle = 'green';
      ctx.translate(branchX, branchY);
  
      ctx.beginPath();
      ctx.arc(0, 0, leafSize, (Math.PI*1.1), (Math.PI*1.9));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      
      ctx.beginPath();
      ctx.arc(0, -32, leafSize, (Math.PI*0.9), (Math.PI*0.1), 1);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    else if (currentSeason === 'Summer') {
      ctx.fillStyle = `rgba(0, ${getRandomInt(70, 200)}, 0)`;
      ctx.translate(branchX, branchY);
  
      ctx.beginPath();
      ctx.ellipse(0, 0, leafSize, 15, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
    else if (currentSeason === 'Fall') {
      ctx.fillStyle = `rgba(255, ${getRandomInt(0, 255)}, 15)`;
      ctx.translate(branchX, branchY);
  
      ctx.beginPath();
      ctx.ellipse(0, 0, leafSize, 15, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

}
// draw tree
function draw(startX, startY, len, angle, branchWidth, recursionLevel) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = `rgba(${getCookie("tree_color")}, 63, 0, 1)`;
    ctx.fillStyle = `rgba(${getCookie("tree_color")}, 63, 0, 1)`;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(len < recursion_count) {
        ctx.restore();
        return;
    };

    recursionLevel++;

    //default +- angle is 15
    draw(0, -len, len*0.8, -`${getCookie("minus_angle")}`, branchWidth*0.8, recursionLevel);
    draw(0, -len, len*0.8, +`${getCookie("plus_angle")}`, branchWidth*0.8, recursionLevel);
    if (recursionLevel > 4) {
      leaves(ctx, 0, -len, 5);
    }

    ctx.restore();
};

// water var counter
/*var clicks = 0;

function onClick() {
  const lastUpdateDate = getCookie("last_water_update");
  const currentDate = getCurrentDate();

    clicks += 1;

    if (lastUpdateDate !== currentDate) {
      if (clicks === 1) {
      setCookie("did_user_water", "yes", 1);
      setCookie("water_streak", Number(getCookie("water_streak"))+10, 10000);
      setCookie("last_water_update", currentDate, 1)
}}}; */


// stuff that happens when page is loaded
checkCookie();

const $plantWaterButton = document.querySelector(".plantWaterButton");

if (!getCookie("did_user_water")) {
  setCookie("did_user_water", "no", 1);
};

if (getCookie("did_user_water") === "no") {
    $plantWaterButton.classList.remove("hidden"); // button should appear if the cookie has expired
}

  $plantWaterButton.addEventListener("click", () => {
      setCookie("did_user_water", "yes", 1);
      setCookie("water_streak", Number(getCookie("water_streak"))+10, 10000);
      $plantWaterButton.remove();
});


// calculations
if (getCookie("water_streak") !== 0) {
  recursion_count = 100 - getCookie("water_streak");
  if (recursion_count > 80) {
    // pass
  }
  else if (recursion_count < 13) {
    recursion_count = 10;
    draw(250, 450, 80, 0, 8, 0)
  } 
  else {
    draw(250, 450, 80, 0, 8, 0)
  }
};

 
/*TODO
    - Add weather stuff
*/

