import React, { Component } from 'react';
import Navbar from "../Components/navbar";
import DiscreteSlider from '../Components/slider';
import Canvas from './canvas'; // Updated name
import {
  addNodeToBST,
  findParentNode,
  searchBST,
  deleteNodeFromBST,
  generateRandomBST,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal
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
      isAnimating: false // Flag to track animation state
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
    this.setState({ traversalType: event.target.value });
  }

  traverse = () => {
    const { tree, traversalType, animationSpeed } = this.state;

    if (!tree) {
      this.setState({ resultText: 'Tree is empty. Please add nodes.' });
      return;
    }

    let traversalResult = [];
    switch (traversalType) {
      case 'inorder':
        traversalResult = inorderTraversal(tree);
        break;
      case 'preorder':
        traversalResult = preorderTraversal(tree);
        break;
      case 'postorder':
        traversalResult = postorderTraversal(tree);
        break;
      default:
        break;
    }

    // Perform traversal animation
    this.performTraversalAnimation(traversalResult, animationSpeed);
  }


  performTraversalAnimation = (traversalResult, animationSpeed) => {
    if (this.isAnimating) return;
    this.setState({ resultText: "" });
    const { tree } = this.state;
    const animationTimeline = gsap.timeline();

    // Function to animate visiting a node
    const visitNode = (node) => {
      return new Promise(resolve => {
        const nodeElement = document.querySelector(`#node-${node.id}`);
        const animationDuration = 0.5;
        const delay = (50 - animationSpeed) / 100;
        animationTimeline.to(nodeElement, {
          duration: animationDuration * 2,
          fill: '#21affb',
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
      const findPosition = await searchBST(tree, value, (resultText) => this.setState({ resultText }), animationSpeed);
      const updatedTree = addNodeToBST(tree, value);
      this.setState({ tree: updatedTree, nodeValue: '' });

      new Promise(resolve => setTimeout(resolve, 500));

      const parentNode = findParentNode(tree, value);
      const newNode = parentNode.left.value === value ? parentNode.left : parentNode.right;

      // Highlight the newly inserted node and the edge connecting it to its parent
      if (newNode) {
        const nodeElement = document.querySelector(`#node-${newNode.id}`);
        const edgeId = parentNode.id ? `#edge-${parentNode.id}-${newNode.id}` : null;
        console.log(edgeId);
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
      this.setState({ resultText: [] }); // Clear previous search results
      const found = await searchBST(tree, value, (resultText) => this.setState({ resultText }), animationSpeed);
      if (!found) {
        this.setState({ resultText: ['Node not found'] });
      }
      // this.setState({ resultText: ['Node found'] });
    }
  }

  // Method to delete a node from the tree
  deleteNode = () => {
    const { deleteValue, tree } = this.state;
    const value = parseInt(deleteValue, 10);

    if (!isNaN(value)) {
      const newTree = deleteNodeFromBST(tree, value);
      if (newTree === tree)
        this.setState({ resultText: `Node ${value} not found!` });
      this.setState({ tree: newTree, deleteValue: '' });
    }

  }


  render() {
    const { tree, nodeValue, searchValue, deleteValue, traversalType, resultText, animationSpeed } = this.state;
    return (
      <div>
        <Navbar currentPage="Binary Search Tree" />
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
      </div>
    );
  }
}

export default BinaryTree;

