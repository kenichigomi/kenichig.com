/*
    Will have a plant that will need to be watered depending on daily weather conditions

    Water Mechanics
    - If a plant is not watered for 7 days, the plant will die
    - The amount of water a plant needs per day depends on the age of the plant
    - If a plant recieves more than 3 times the amount of water needed, the plant will drown
    
    Weather Mechanics
    - If the weather is sunny, the plant will need 1.5 times the amount of water
    - If the weather is cloudy, the plant will need 1 times the amount of water
    - If the weather is rainy, the plant will not need water

    Rewards
    - If a plant has been watered for 1 month, the plant will play a rick roll
    - 50 days: megalovania
    - 100 days: We are number 1
    - 500 days: 500 miles

    Messages
    - The plant is satisfied (perfect watering, rainy)
    - The plant is parched (no water, sunny)
    - The plant has been neglected (3+ days no water)
    - The plant has died (no water for 7+ days)
*/

// init
const canvas = document.getElementById("plant");
const ctx = canvas.getContext("2d");

// randon integer puller
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
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

// draw function
function draw(startX, startY, len, angle, branchWidth) {
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
    }
    //default +- angle is 15
    draw(0, -len, len*0.8, -`${getCookie("minus_angle")}`, branchWidth*0.8);
    draw(0, -len, len*0.8, +`${getCookie("plus_angle")}`, branchWidth*0.8);

    ctx.restore();
};

// water var counter
var clicks = 0;

function onClick() {
    clicks += 1;

    if (clicks === 10) {
      setCookie("did_user_water", "Yes", 1);
      setCookie("water_streak", Number(getCookie("water_streak"))+30, 10000);
}}; 


// stuff that happens when page is loaded
checkCookie();

// plant fully grows in one month (30 days)
// recursionMax = 10
// every 3 days we can change the increment

if (getCookie("water_streak") % 3 === 0) {
  recursion_count = getCookie("water_streak") / 3;
  if (recursion_count > 10) {
    draw(250, 450, 80, 0, 10)
  }
  else if (recursion_count > 0) {
    draw(250, 450, 80, 0, recursion_count)
  } 
  else if (recursion_count === 0) {
    // pass
  }
};

 
/*TODO
    - Add weather stuff
    - Add leaves/flowers
*/

