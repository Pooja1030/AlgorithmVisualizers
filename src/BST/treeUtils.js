function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateRandomBST(nodeCount, maxValue) {
  let tree = null;
  for (let i = 0; i < nodeCount; i++) {
    const value = Math.floor(Math.random() * maxValue) + 1;
    tree = addNodeToBST(tree, value);
  }
  return tree;
}

export function addNodeToBST(tree, value) {
  if (!tree) {
    return createNode(value);
  }

  let current = tree;
  while (true) {
    if (value < current.value) {
      if (!current.left) {
        current.left = createNode(value);
        break;
      } else {
        current = current.left;
      }
    } else {
      if (!current.right) {
        current.right = createNode(value);
        break;
      } else {
        current = current.right;
      }
    }
  }

  return tree;
}

export function createNode(value) {
  return {
    id: generateUniqueId(), // Generate a unique identifier using uuidv4
    value,
    left: null,
    right: null
  };
}

export function searchBST(tree, value) {
  let current = tree;
  while (current) {
    if (value === current.value) {
      return true;
    }
    if (value < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}

export function deleteNodeFromBST(tree, value) {
  if (!tree) {
    return null;
  }

  if (value < tree.value) {
    tree.left = deleteNodeFromBST(tree.left, value);
  } else if (value > tree.value) {
    tree.right = deleteNodeFromBST(tree.right, value);
  } else {
    if (!tree.left) {
      return tree.right;
    } else if (!tree.right) {
      return tree.left;
    }

    const minValue = findMinValue(tree.right);
    tree.value = minValue;
    tree.right = deleteNodeFromBST(tree.right, minValue);
  }
  return tree;
}

export function findMinValue(node) {
  let current = node;
  while (current.left) {
    current = current.left;
  }
  return current.value;
}

export function inorderTraversal(node) {
  if (!node) return [];
  return [...inorderTraversal(node.left), node, ...inorderTraversal(node.right)];
}

export function preorderTraversal(node) {
  if (!node) return [];
  return [node, ...preorderTraversal(node.left), ...preorderTraversal(node.right)];
}

export function postorderTraversal(node) {
  if (!node) return [];
  return [...postorderTraversal(node.left), ...postorderTraversal(node.right), node];
}
