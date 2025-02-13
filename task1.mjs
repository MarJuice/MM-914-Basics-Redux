import { playerPos, CAR, WALL, EMPTY } from "./gameConstants.mjs";
import { map, update, drawMap } from "./gameFunctions.mjs";

setInterval(() => { // Repeats update cycle every 100 milliseconds
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

    console.log(`Trying to move from ${row}, ${col} to ${nextRow}, ${nextCol}`); // Debug message for testing

    if (peek(nextRow, nextCol)) { // Peeks at the next position in the headed direction
        console.log(`Moving to ${nextRow}, ${nextCol}`); // Debug message for testing
        map[row][col] = EMPTY; // Replace the car with an empty square
        map[nextRow][nextCol] = CAR; // Move the car to the next square
        playerPos.row = nextRow; // Update the player position to the next row
        playerPos.col = nextCol; // Update the player position to the next column
    } else {
        console.log("Can't move!"); // Debug message for testing
        turn(); // Turn if the car can't move 
        // !car currently loops back and forth if it needs to turn left!
    }
}

function turn() {
    // Turns the car 90 deg clockwise.
    const directions = ["left", "up", "right", "down"]; // List of possible directions
    let index = directions.indexOf(direction); // Creates index to always turn 90 degrees
    direction = directions[(index + 1) % 4]; // Goes to the next index and repeats back
}

function peek(nextRow, nextCol) {
    // Returns true if the next cell is open, otherwise false.
    console.log(`Peeking at ${nextRow}, ${nextCol}`); // Debug message for testing
    if (nextRow >= 0 && nextRow < map.length && nextCol >= 0 && nextCol < map[nextRow].length) { // Checks if the next position is within bounds
        let result = map[nextRow][nextCol] != WALL; // Moves the car to the next square as long as it's not a wall
        console.log(`Peek result: ${result}`); // Debug message for testing
        return result;
    }
    return false; // Returns false if the move isn't allowed
}
