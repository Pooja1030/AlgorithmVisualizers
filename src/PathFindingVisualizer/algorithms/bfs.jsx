function getNeighbours(grid, node) {
    const neighbors = [];
    const { col, row } = node;

    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    // Log the neighbors for debugging
    // console.log("Neighbors:", neighbors);

    return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall));
}


export function bfs(grid, startNode, endNode) {
    var list = [];
    const nodesInOrder = [];
    nodesInOrder.push(startNode);
    list.push(startNode);
    startNode.isVisited = true;

    // Steps for Breadth-first Search (BFS)
bfs.steps = [
    { code: " Step 1: Initialize the queue with the start node." },
    { code: " Step 2: Loop until the queue is empty." },
    { code: " Step 3: Dequeue a node from the queue." },
    { code: " Step 4: If the dequeued node is the finish node, reconstruct the path." },
    { code: " Step 5: Generate the neighbors of the dequeued node." },
    { code: " Step 6: Enqueue unvisited neighbors and mark them as visited." },
    { code: " Step 7: Repeat the loop." }
];

    while (list.length > 0) {
        const currentNode = list.shift();
        nodesInOrder.push(currentNode);

        if (currentNode === endNode) return nodesInOrder;

        const nodesToPush = getNeighbours(grid, currentNode);
        for (const node of nodesToPush) {
            node.isVisited = true;
            node.previousNode = currentNode;
            list.push(node);
        }
    }

    return nodesInOrder;
}


export function dfs(grid, startNode, endNode) {
    var list = [];
    const nodesInOrder = [];
    nodesInOrder.push(startNode);
    list.push(startNode);
    startNode.isVisited = true;

    // Steps for Depth-first Search (DFS)
dfs.steps = [
    { code: " Step 1: Initialize the stack with the start node." },
    { code: " Step 2: Loop until the stack is empty." },
    { code: " Step 3: Pop a node from the stack." },
    { code: " Step 4: If the popped node is the finish node, reconstruct the path." },
    { code: " Step 5: Generate the neighbors of the popped node." },
    { code: " Step 6: Push unvisited neighbors onto the stack and mark them as visited." },
    { code: " Step 7: Repeat the loop." }
];

    while (!!list.length) {
        const currentNode = list.pop();
        nodesInOrder.push(currentNode);
        if (currentNode === endNode) return nodesInOrder;
        currentNode.isVisited = true;
        const nodesToPush = getNeighbours(grid, currentNode);
        for (const node of nodesToPush) {
            node.previousNode = currentNode;
            list.push(node);

        }
    }
    return nodesInOrder;
}


// export function bfsdfs(grid,startNode,endNode,algo){
//     var list = [];
//     const nodesInOrder = [];
//     nodesInOrder.push(startNode);
//     list.push(startNode);
//     startNode.isVisited = true;
//     while(!!list.length){
//         const currentNode = (algo === "bfs" ? list.shift():list.pop());
//         nodesInOrder.push(currentNode);
//         if( currentNode === endNode ) return nodesInOrder;
//         if( algo === "dfs" ) currentNode.isVisited = true;
//         const nodesToPush = getNeighbours(grid,currentNode);
//         for( const node of nodesToPush ){
//             if(algo === "bfs"){
//                 node.isVisited = true;
//             }
//             node.previousNode = currentNode;
//             list.push(node);

//         }
//     }
//     return nodesInOrder;
// }

// function getNeighbours(grid,node){
//     const neighbors = [];
//     const {col, row} = node;
//    // console.log(node);

//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//     return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall ));
// }