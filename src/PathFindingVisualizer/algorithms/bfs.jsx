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
