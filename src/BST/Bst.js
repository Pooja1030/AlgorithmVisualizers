import React, { Component } from 'react';
import Navbar from "../Components/navbar";
import SidePanel from "../Components/sidepanel";
import DiscreteSlider from '../Components/slider';
import Canvas from './canvas'; // Updated name
import {
  addNodeToBST,
  searchBST,
  deleteNodeFromBST,
  generateRandomBST,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  findNode,
  findMinValue,
  findParentNode,
  steps,
} from './treeUtils';
import { gsap } from 'gsap';

class BinaryTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: null,
      nodeValue: '',
      searchValue: '',
      deleteValue: '',
      traversalType: 'inorder', // Default traversal type
      animationSpeed: 50,
      resultText: '',
      isAnimating: false, // Flag to track animation state,
      sidePanelOpen: false, // State variable to manage side panel visibility
      algorithmSteps: [],
      timeComplexity: "O(n)", // Default time complexity
      spaceComplexity: "O(n)", // Default space complexity
    };
    this.animationTimeline = gsap.timeline({ paused: true }); // Initialize GSAP timeline
  }

  componentDidMount() {
    this.generateRandomTree(); // Generate a random tree on page load
  }

  // Define the method to set the animation speed
  setAnimationSpeed = (value) => {
    this.setState({ animationSpeed: value });
  }

  generateRandomTree = () => {
    const randomTree = generateRandomBST(10, 100); // 10 nodes, values up to 100
    this.setState({ tree: randomTree, resultText: "" });
  }

  // Method to reset the tree
  resetTree = () => {
    this.setState({ tree: null, nodeValue: '', resultText: "" });
  }

  // Method to handle input change
  handleInputChange = (event) => {
    this.setState({ nodeValue: event.target.value });
  }


  // Method to handle search input change
  handleSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  // Method to handle delete input change
  handleDeleteInputChange = (event) => {
    this.setState({ deleteValue: event.target.value });
  }

  // Method to handle traversal type change
  handleTraversalTypeChange = (event) => {
    const { traversalType } = this.state;
    const newTraversalType = event.target.value;
  
    // Reset algorithm steps if a different traversal type is selected
    if (newTraversalType !== traversalType) {
      this.setState({ traversalType: newTraversalType, algorithmSteps: [] });
    } else {
      // Reset algorithm steps if the same traversal type is selected again
      this.setState({ algorithmSteps: [] });
    }
  };


  // Function to estimate the memory usage of the BST in bytes
   // Function to estimate the memory usage of the BST in bytes
  estimateSpaceComplexity = (node) => {
    if (!node) return 0;

    const nodeSize = this.sizeof(node); // Estimate size of a single node
    const leftSize = this.estimateSpaceComplexity(node.left);
    const rightSize = this.estimateSpaceComplexity(node.right);

    return nodeSize + leftSize + rightSize;
  }

  sizeof = (node) => {
    // Approximate size of each node in bytes
    const objectOverhead = 16;
    const pointerSize = 8;
    const valueSize = 4;
    return objectOverhead + 2 * pointerSize + valueSize; // object overhead + left pointer + right pointer + value
  }




  traverse = () => {
    const { tree, traversalType, animationSpeed } = this.state;

    if (!tree) {
      this.setState({ resultText: 'Tree is empty. Please add nodes.' });
      return;
    }

    let traversalResult = [];
    let algorithmSteps = [];
    const startTime = performance.now(); // Start measuring time

    switch (traversalType) {
      case 'inorder':
        traversalResult = inorderTraversal(tree);
        algorithmSteps = steps("inorderTraversal");
        break;
      case 'preorder':
        traversalResult = preorderTraversal(tree);
        algorithmSteps = steps("preorderTraversal");
        break;
      case 'postorder':
        traversalResult = postorderTraversal(tree);
        algorithmSteps = steps("postorderTraversal");
        break;
      default:
        break;
    }
    const endTime = performance.now(); // Stop measuring time
    const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
    const timeComplexity = `O(n) - ${executionTime} ms`;; // Display execution time
   // Calculate space complexity
   const spaceComplexity = `O(n) - ${this.estimateSpaceComplexity(tree)} bytes`;

    this.setState({ algorithmSteps, timeComplexity, spaceComplexity });
    // Perform traversal animation
    this.performTraversalAnimation(traversalResult, animationSpeed);
  }

  performTraversalAnimation = (traversalResult, animationSpeed) => {
    if (this.isAnimating) return;
    this.setState({ resultText: "" });
    const animationTimeline = gsap.timeline();

    // Function to animate visiting a node
    const visitNode = (node) => {
      return new Promise(resolve => {
        const nodeElement = document.querySelector(`#node-${node.id}`);
        const animationDuration = 0.5;
        const delay = (50 - animationSpeed) / 100;
        animationTimeline.to(nodeElement, {
          duration: animationDuration * 2,
          fill: '#c3439f',
          delay: delay,
        });
        animationTimeline.to(nodeElement, {
          duration: 0.5,
          fill: 'blue',
          onComplete: () => {
            this.setState(prevState => ({
              resultText: [...prevState.resultText, " " + node.value.toString(),]
            }), resolve);
          }
        });
      });
    };

    // Perform traversal animation based on traversal result
    traversalResult.reduce((promise, node) => {
      return promise.then(() => {
        return visitNode(node);
      });
    }, Promise.resolve());
  }

  // Method to add a node to the tree
  addNode = async () => {
    const { nodeValue, tree, animationSpeed } = this.state;
    const value = parseInt(nodeValue, 10);

    if (!isNaN(value)) {
      const algorithmSteps = steps("addNodeToBST");
      this.setState({ algorithmSteps, sidePanelOpen: true });

      const findPosition = await searchBST(tree, value, (resultText) => this.setState({ resultText }), animationSpeed);

      const startTime = performance.now(); // Start measuring time
      const updatedTree = addNodeToBST(tree, value);
      const endTime = performance.now(); // Stop measuring time

      const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
      const timeComplexity = `O(n) - ${executionTime} ms`; // Display execution time

      // Calculate space complexity
      const spaceComplexity = `O(n) - ${this.estimateSpaceComplexity(updatedTree)} bytes`;


      this.setState({ tree: updatedTree, nodeValue: '', timeComplexity, spaceComplexity, sidePanelOpen: true });

      new Promise(resolve => setTimeout(resolve, 500));

      const parentNode = findParentNode(updatedTree, value);
      const newNode = findNode(updatedTree, value);

      // Highlight the newly inserted node and the edge connecting it to its parent
      if (newNode) {
        const nodeElement = document.querySelector(`#node-${newNode.id}`);
        const edgeId = parentNode ? `#edge-${parentNode.id}-${newNode.id}` : null;
        const edgeElement = edgeId ? document.querySelector(edgeId) : null;

        if (nodeElement) {
          gsap.to(nodeElement, {
            duration: 1,
            fill: 'maroon',
            r: 20,
          });
          gsap.to(nodeElement, {
            duration: 1,
            fill: 'blue',
            r: 15,
            delay: 1
          });
        }

        if (edgeElement) {
          gsap.to(edgeElement, {
            duration: 1,
            stroke: 'transparent',
          });
          gsap.to(edgeElement, {
            duration: 1,
            stroke: 'maroon',
            delay: 1
          });
          gsap.to(edgeElement, {
            duration: 1,
            stroke: 'black',
            delay: 1.5 // Delay the animation to start after the node animation completes
          });
        }
      }
    }
  }

  // Method to search for a node in the tree
  searchNode = async () => {
    const { searchValue, tree, animationSpeed } = this.state;
    const value = parseInt(searchValue, 10);
    if (!isNaN(value)) {
      const algorithmSteps = steps("searchBST");
      const timeComplexity = ""; // Display execution time
       // Calculate space complexity
       const spaceComplexity = `o(n) - ${this.estimateSpaceComplexity(tree)} bytes`;
      this.setState({ resultText: [], algorithmSteps, timeComplexity, spaceComplexity, sidePanelOpen: true  }); // Clear previous search results

      const found = await searchBST(tree, value, (resultText) => this.setState({ resultText }), animationSpeed);
      if (!found) {
        this.setState({ resultText: ['Node not found'] });
      }
      // this.setState({ resultText: ['Node found'] });
    }
  }

  deleteNode = async () => {
    const { deleteValue, tree, animationSpeed } = this.state;
    const value = parseInt(deleteValue, 10);
  
    if (!isNaN(value)) {
      const algorithmSteps = steps("deleteNodeFromBST");
      this.setState({ algorithmSteps,sidePanelOpen: true });
  
      const found = await searchBST(tree, value, (resultText) => this.setState({ resultText }), animationSpeed);
      if (!found) {
        this.setState({ resultText: ['Node not found'] });
        return;
      }
  
      // Find the parent node and the node to be deleted
      const parentNode = findParentNode(tree, value);
      const nodeToDelete = findNode(tree, value);
  
      // Animate the removal of the node and the edge connecting it to its parent
      if (nodeToDelete) {
        const nodeElement = document.querySelector(`#node-${nodeToDelete.id}`);
        const edgeId = parentNode ? `#edge-${parentNode.id}-${nodeToDelete.id}` : null;
        const edgeElement = edgeId ? document.querySelector(edgeId) : null;
  
        if (nodeElement) {
          gsap.to(nodeElement, {
            duration: 0.5,
            fill: 'red',
            r: 10,
            delay: 1,
            onComplete: () => {
              // Remove the node from the DOM after the animation completes
              nodeElement.remove();
            }
          });
        }
  
        // If the node has a single child or no children, handle the simple case
        if (!nodeToDelete.left || !nodeToDelete.right) {
          const childNode = nodeToDelete.left || nodeToDelete.right;
  
          if (childNode) {
            const newNodeElement = document.querySelector(`#node-${childNode.id}`);
            if (newNodeElement) {
              // Animate the new node to the deleted node's position
              gsap.to(newNodeElement, {
                duration: 2,
                fill: "#fb21d3",
                delay: 1,
                onComplete: async () => {
                  await new Promise(resolve => setTimeout(resolve, 4000));
                  // Update the tree structure after the animation completes
                  const startTime = performance.now(); // Start measuring time
                  const updatedTree = deleteNodeFromBST(tree, value);
                  const endTime = performance.now(); // Stop measuring time
  
                  const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
                  const timeComplexity = `O(n) - ${executionTime} ms`; // Display execution time
                  // Calculate space complexity
                  const spaceComplexity = `O(n) - ${this.estimateSpaceComplexity(updatedTree)} bytes`;
  
                  this.setState({ tree: updatedTree, resultText: `Node ${value} deleted!`, deleteValue: '', timeComplexity, spaceComplexity });
                }
              });
            }
          } else {
            if (edgeElement) {
              gsap.to(edgeElement, {
                duration: 1,
                stroke: 'transparent',
                onComplete: () => {
                  // Remove the edge from the DOM after the animation completes
                  edgeElement.remove();
                }
              });
            }
  
            await new Promise(resolve => setTimeout(resolve, 3000));
            const startTime = performance.now(); // Start measuring time
            // Update the tree structure after the animation completes
            const updatedTree = deleteNodeFromBST(tree, value);
            const endTime = performance.now(); // Stop measuring time
  
            const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
            const timeComplexity = `O(n) - ${executionTime} ms`; // Display execution time
            // Calculate space complexity
            const spaceComplexity = `O(n) - ${this.estimateSpaceComplexity(updatedTree)} bytes`;
  
            this.setState({ tree: updatedTree, resultText: `Node ${value} deleted!`, deleteValue: '', timeComplexity, spaceComplexity });
          }
        } else {
          // If the node has two children, find the successor
          const successor = findMinValue(nodeToDelete.right);
          const newSuccessor = findNode(tree, successor.value);
          await searchBST(nodeToDelete.right, successor.value, (resultText) => this.setState({ resultText }), animationSpeed);
  
          const newNodeElement = document.querySelector(`#node-${newSuccessor.id}`);
  
          if (newNodeElement) {
            // Animate the new node to the deleted node's position
            gsap.to(newNodeElement, {
              duration: 2,
              fill: "#fb21d3",
              delay: 1,
              onComplete: async () => {
                await new Promise(resolve => setTimeout(resolve, 4000));
                const startTime = performance.now(); // Start measuring time
                const updatedTree = deleteNodeFromBST(tree, value);
                const endTime = performance.now(); // Stop measuring time
  
                const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
                const timeComplexity = `${executionTime} ms`; // Display execution time
                // Calculate space complexity
                const spaceComplexity = `${this.estimateSpaceComplexity(updatedTree)} bytes`;
  
                this.setState({ tree: updatedTree, resultText: `Node ${value} deleted!`, deleteValue: '', timeComplexity, spaceComplexity });
              }
            });
          } else {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const startTime = performance.now(); // Start measuring time
            const updatedTree = deleteNodeFromBST(tree, value);
            const endTime = performance.now(); // Stop measuring time
  
            const executionTime = (endTime - startTime).toFixed(2); // Calculate execution time in milliseconds
            const timeComplexity = `${executionTime} ms`; // Display execution time
            // Calculate space complexity
            const spaceComplexity = `${this.estimateSpaceComplexity(updatedTree)} bytes`;
  
            this.setState({ tree: updatedTree, resultText: `Node ${value} deleted!`, deleteValue: '', timeComplexity, spaceComplexity });
          }
        }
      }
    }
  }
  
  toggleSidePanel = () => {
    // Reset algorithm steps when closing the side panel
    if (!this.state.sidePanelOpen) {
      this.setState({ algorithmSteps: [] });
    }
    this.setState((prevState) => ({ sidePanelOpen: !prevState.sidePanelOpen }));
  };

  render() {
    const { tree, nodeValue, searchValue, deleteValue, traversalType, resultText } = this.state;
    const { algorithmSteps, sidePanelOpen, animationSpeed, timeComplexity, spaceComplexity } = this.state;

    return (
      <div>
        <Navbar currentPage="Binary Search Tree" />
        <button className="side-panel-toggle" onClick={this.toggleSidePanel}>→</button>
        <SidePanel isOpen={sidePanelOpen} onClose={this.toggleSidePanel} /> {/* Render the side panel component */}
        <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />
        <div className='menu'>
          <DiscreteSlider
            title='Speed'
            default={animationSpeed}
            onCountChange={this.setAnimationSpeed}
            step={5}
            min={10}
            max={100}
          />
          {/* Select dropdown for traversal type */}
          <div>
            <select value={traversalType} onChange={this.handleTraversalTypeChange}>
              <option value="inorder">Inorder Traversal</option>
              <option value="preorder">Preorder Traversal</option>
              <option value="postorder">Postorder Traversal</option>
            </select>

            {/* Button to perform traversal */}
            <button className='traverse-btn' onClick={this.traverse}>Traverse</button>
          </div>

          <div>
            <button className='generate-random-btn' onClick={this.generateRandomTree}>Generate Random Tree</button>
            <button className='reset-btn' onClick={this.resetTree}>Reset</button>
          </div>
        </div>
        <div>
          <input
            type='number'
            value={nodeValue}
            onChange={this.handleInputChange}
            placeholder='Node value'
          />
          <button className='add-node-btn' onClick={this.addNode}>Insert</button>
          <input
            type='number'
            value={searchValue}
            onChange={this.handleSearchInputChange}
            placeholder='Search node'
          />
          <button className='search-node-btn' onClick={this.searchNode}>Search</button>
          <input
            type='number'
            value={deleteValue}
            onChange={this.handleDeleteInputChange}
            placeholder='Delete node'
          />
          <button className='delete-node-btn' onClick={this.deleteNode}>Delete</button>
        </div>
        <div className="result">{`${resultText}`}</div>
        <Canvas tree={tree} animationSpeed={animationSpeed} />
        <div className="complexity-analysis">
          <div className="analysis-title">Time Complexity:</div>
          <div className="analysis-result">{timeComplexity}</div>
          <div className="analysis-title">Space Complexity:</div>
          <div className="analysis-result">{spaceComplexity}</div>
        </div>

      </div>
    );
  }
}

export default BinaryTree;