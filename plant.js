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

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(51);

    var len = 100
    stroke(255);
    line(200, height, 200, height-len)
}