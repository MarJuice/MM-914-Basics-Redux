import maps from "./maps.mjs";
import { CAR, GOAL, playerPos } from "./gameConstants.mjs";

let map = []; // Empty array to store rows and columns
let goalPos = []; // Empty array to store the goal position

function loadMap(mapNum) {
    let rawMap = mapNum.split("\n"); // Separate each row of the map into an array
    for (let i = 0; i < rawMap.length; i++) { // Iterate over each row
        map.push([...rawMap[i]]); // Push the rows into the map array
    }
} 

function update() { // Checks every row and column
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] == CAR) { // Assigns the player position based on where the car is
                playerPos.row = row;
                playerPos.col = col;
            } else if (map[row][col] == GOAL) { // Assigns the goal position based on where the goal is
                goalPos.push(row, col);
            }
        }
    }
}

function drawMap() { // Draws the updated array
    console.log(map.map(row => row.join("")).join("\n")); // Draws a formatted array by joining rows and columns into a single string
}

export { goalPos, map, update, drawMap };
