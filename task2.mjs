import maps from "./maps.mjs";
import { playerPos, CAR, WALL, EMPTY } from "./gameConstants.mjs";
import { goalPos, map, update, drawMap, loadMap } from "./gameFunctions.mjs";

loadMap(maps.map2); // Load the second map

let interval = setInterval(() => { // Repeats update cycle every 100 milliseconds
    console.clear();
    update();
    move();
    drawMap();
}, 100);

let direction = "left"; // Default driving direction

function move() {
    // Moves the car 1 cell in the direction it is heading. 
    
    let row = playerPos.row; // Assign row position on the map based on the players position
    let col = playerPos.col; // Assign column position on the map based on the players position

    let nextRow = row; // Variable for the next row to allow doing operations and checks
    let nextCol = col; // Variable for next column to allow doing operations and checks

    if (direction == "left") { // Default direction is left, move negative direction of column
        nextCol--;
    } else if (direction == "right") { // Moving right means moving in a positive direction of columns
        nextCol++;
    } else if (direction == "up") { // Moving up means moving in a negative direction of rows
        nextRow--;
    } else if (direction == "down") { // Moving down means moving in a positive direction of rows
        nextRow++;
    }

    if (peek(nextRow, nextCol)) { // Peeks at the next position in the headed direction
        map[row][col] = EMPTY; // Replace the car with an empty square
        map[nextRow][nextCol] = CAR; // Move the car to the next square
        playerPos.row = nextRow; // Update the player position to the next row
        playerPos.col = nextCol; // Update the player position to the next column
    } else {
        turn(); // Turn if the car can't move 
    }
    if (atGoal()) { // Check if at the goal
        clearInterval(interval); // Stop the loop
        console.log("Goal reached!");
    }
}

function turn() { // Parameter for the number of turns
    const directions = ["left", "up", "right", "down"]; // List of possible directions
    let index = directions.indexOf(direction); // Get the index of the current position
    direction = directions[(index + 1) % 4]; // Update the direction by 90 degrees for each turn
}

function peek(nextRow, nextCol) {
    // Returns true if the next cell is open, otherwise false.
    if (nextRow >= 0 && nextRow < map.length && nextCol >= 0 && nextCol < map[nextRow].length) { // Checks if the next position is within bounds
        let result = map[nextRow][nextCol] != WALL; // Moves the car to the next square as long as it's not a wall
        return result;
    }
    return false; // Returns false if the move isn't allowed
}

function atGoal() {
    // Returns true if the current cell is the goal cell.
    if (playerPos.row == goalPos[0] && playerPos.col == goalPos[1]) { // Checks if the position is at the same as the goal position
        return true;
    }
    return false;
}
