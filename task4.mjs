import maps from "./maps.mjs";
import { playerPos, CAR, WALL, EMPTY } from "./gameConstants.mjs";
import { goalPos, map, update, drawMap, loadMap } from "./gameFunctions.mjs";

loadMap(maps.map4); // Load the fourth map
update(); // Update at the start to get player position

let direction = "left"; // Default driving direction
let path = bfsSolve(); // Find the shortest path to the goal by using the BFS algorithm

let interval = setInterval(() => { // Repeats update cycle every 100 milliseconds
    console.clear();
    update();
    executePath(path.shift()); // Instead of moving first, it will find the path first, then follow it
    drawMap();

    if (atGoal()) {
        clearInterval(interval);
        console.log("Goal reached!");
    }
}, 100);

// BFS algorithm to find the shortest path
function bfsSolve() {
    let queue = [];  // Store positions to explore
    let visited = new Set(); // Keep track of visited positions
    let start = { row: playerPos.row, col: playerPos.col, path: [] }; // Dictionary with the start position of the path
    
    queue.push(start); // Explore the path
    visited.add(`${start.row},${start.col}`); // Prevent going to visited positions

    while (queue.length > 0) {
        let { row, col, path } = queue.shift(); // Dequeue the first element

        if (goalPath(row, col)) {
            return path; // Return the shortest path
        }

        // Check all possible moves (left, right, up, down)
        for (let dir of ["left", "right", "up", "down"]) {
            let { nextRow, nextCol } = getNextPosition(row, col, dir);
            
            if (peek(nextRow, nextCol) && !visited.has(`${nextRow},${nextCol}`)) { // Checks if the next square is empty and not visited before
                visited.add(`${nextRow},${nextCol}`); // Save the path
                queue.push({ row: nextRow, col: nextCol, path: [...path, dir] }); // Queue the path
            }
        }
    }
}

// Execute the next step in the path
function executePath(targetDirection) {
    turnToDirection(targetDirection); // Adjust car direction before moving
    move(); // Move in the targeted direction
}

// Get next position based on direction
function getNextPosition(row, col, dir) {
    let nextRow = row;
    let nextCol = col;

    if (dir == "left") { // Default direction is left, move negative direction of column
        nextCol--;
    } else if (dir == "right") { // Moving right means moving in a positive direction of columns
        nextCol++;
    } else if (dir == "up") { // Moving up means moving in a negative direction of rows
        nextRow--;
    } else if (dir == "down") { // Moving down means moving in a positive direction of rows
        nextRow++;
    }

    return { nextRow, nextCol };
}

// Ensure car is facing the correct direction before moving
function turnToDirection(targetDirection) {
    const directions = ["left", "up", "right", "down"];
    let currentIndex = directions.indexOf(direction);
    let targetIndex = directions.indexOf(targetDirection);
    
    let turns = (targetIndex - currentIndex + 4) % 4; // 1-3 turns
    for (let i = 0; i < turns; i++) {
        turn();
    }
}

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
    }
}

// Turns the car, one turn is 90 degrees
function turn() { // Parameter for the number of turns
    const directions = ["left", "up", "right", "down"]; // List of possible directions
    let index = directions.indexOf(direction); // Get the index of the current position
    direction = directions[(index + 1) % 4]; // Update the direction by 90 degrees for each turn
}

// Returns true if the next cell is open
function peek(nextRow, nextCol) {
    if (nextRow >= 0 && nextRow < map.length && nextCol >= 0 && nextCol < map[nextRow].length) { 
        let result = map[nextRow][nextCol] != WALL;
        return result;
    }
    return false;
}

// Returns true if the current cell is the goal cell
function atGoal() {
    if (playerPos.row == goalPos[0] && playerPos.col == goalPos[1]) { // Checks if the position is at the same as the goal position
        return true;
    }
    return false;
}

// Checks if the path has the goal
function goalPath(row, col) {
    return row == goalPos[0] && col == goalPos[1];
}