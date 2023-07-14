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


// water var counter
//var water_button = document.getElementById("water_button"), water_count=0;
//water_button.onclick = function() {
//    water_count += 1;
//};

// fractal code
const canvas = document.getElementById("plant");
const ctx = canvas.getContext("2d");

function draw(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(len < 10) {
        ctx.restore();
        return;
    }

    draw(0, -len, len*0.8, -15);
    draw(0, -len, len*0.8, +15);

    ctx.restore();
}

draw(250, 500, 80, 0, 8)
