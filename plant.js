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
    let check_cookie = getCookie("brownColor");
    if (check_cookie != "") {
      //pass
    } else {
        setCookie("brownColor", getRandomInt(64, 168), 365);
        setCookie("plusAngle", getRandomInt(10, 30), 365);
        setCookie("minusAngle", getRandomInt(10, 30), 365);
        setCookie("waterStreak", 0, 365);
    }
};

// draw function
function draw(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = `rgba(${getCookie("brownColor")}, 63, 0, 1)`;
    ctx.fillStyle = `rgba(${getCookie("brownColor")}, 63, 0, 1)`;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(len < stopRecursion) {
        ctx.restore();
        return;
    }
    //default +- angle is 15
    draw(0, -len, len*0.8, -`${getCookie("minusAngle")}`, branchWidth*0.8);
    draw(0, -len, len*0.8, +`${getCookie("plusAngle")}`, branchWidth*0.8);

    ctx.restore();
};

// TODO:
// figure out some sort of math to determine the amount of water that needs to be added to the plant
// what is max growth of the plant?
// We start off at 80, visual changes occur every increment of 20, which means that I can in theory get
// 80 days worth of content?

// I have a massive size limitation currently...

// water var counter
var water_button = document.getElementById("water_button"), water_count=0;
water_button.onclick = function() {
    water_count += 1;
};

// variables that need updating
var streakCount = 0;
var stopRecursion = 10;

// stuff that happens when day is loaded
checkCookie();
draw(250, 450, 80, 0, 8);

