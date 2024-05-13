// Performs A* algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function aStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes, finishNode);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
  }
}

// Steps for A* Algorithm
aStar.steps = [
  { code: " Step 1: Initialize the start node and the open set." },
  { code: " Step 2: Loop until the open set is empty." },
  { code: " Step 3: Select the node with the lowest f score from the open set." },
  { code: " Step 4: If the selected node is the finish node, reconstruct the path." },
  { code: " Step 5: Generate the neighbors of the selected node." },
  { code: " Step 6: For each neighbor, calculate tentative g score and add it to the open set." },
  { code: " Step 7: Repeat the loop." }
];

function sortNodesByDistance(unvisitedNodes, finishNode) {
  unvisitedNodes.sort((nodeA, nodeB) => (nodeA.distance + Math.abs(finishNode.row - nodeA.row) + Math.abs(finishNode.col - nodeA.col))
      - (nodeB.distance + Math.abs(finishNode.row - nodeB.row) + Math.abs(finishNode.col - nodeB.col)));
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
      for (const node of row) {
          nodes.push(node);
      }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the algorithm method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
