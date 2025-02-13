import maps from "./maps.mjs";
import { CAR, GOAL, playerPos } from "./gameConstants.mjs";

let map = []; // Empty array to store rows and columns
let rawMap = maps.map1.split("\n"); // Separate each row of the map into an array
for (let i = 0; i < rawMap.length; i++) { // Iterate over each row
    map.push([...rawMap[i]]); // Push the rows into the map array
}

function atGoal() {
    // Returns true if the current cell is the goal cell.
    if (map[playerPos.row][playerPos.col] == GOAL) {
        return true;
    }
    return false;
}

function update() { // Checks every row and column
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] == CAR) { // Assigns the player position based on where the car is
                playerPos.row = row;
                playerPos.col = col;
            }
        }
    }
}

function drawMap() { // Draws the updated array
    console.log(map.map(row => row.join("")).join("\n")); // Draws a formatted array by joining rows and columns into a single string
    if (atGoal()) { // If the atGoal function returns true, it ends the loop
        clearInterval(interval); // Clears the interval in the task
    }
}

export { map, update, drawMap };
