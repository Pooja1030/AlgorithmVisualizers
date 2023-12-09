
// import React from 'react';
// import { Link } from 'react-router-dom';

// class Sorting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedViz: 'Bubble',                           // Defaultly selected visualization
//     };
//   }

// //  const Sorting = () => {
//   render() {
//     return (
//       <nav id="topbar">
//         <span id="title">
//           <Link to="/sorting/Bubble" className={this.state.selectedViz === 'Bubble' ? 'selected-viz' : ''}>
//             Bubble
//           </Link>
//           <Link to="/sorting/Selection" className={this.state.selectedViz === 'Selection' ? 'selected-viz' : ''}>
//             Selection
//           </Link>
//           <Link to="/sorting/Insert" className={this.state.selectedViz === 'Insertion' ? 'selected-viz' : ''}>
//             Insertion
//           </Link>
//           <Link to="/sorting/Merge" className={this.state.selectedViz === 'Merge' ? 'selected-viz' : ''}>
//             Merge
//           </Link>
//           <Link to="/sorting/Quick" className={this.state.selectedViz === 'Quick' ? 'selected-viz' : ''}>
//             Quick
//           </Link>
//           {/* Add more links for other visualization titles */}
//         </span>
//       </nav>
//     );
//     }
// }

// // 
// export default Sorting;



// import React from 'react';
// import { Link } from 'react-router-dom';

// class Sorting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedViz: 'Bubble', // Defaultly selected visualization
//       array: [8, 4, 2, 10, 5, 7, 1, 3, 6, 9], // Example array to sort
//     };
//   }

//   bubbleSort = () => {
//     // Implementation of Bubble Sort
//     // Modify this function to sort the 'array' state
//     const arrayCopy = [...this.state.array];
//     // Your Bubble Sort logic here
    
//     this.setState({ array: arrayCopy });
//   };

//   selectionSort = () => {
//     // Implementation of Selection Sort
//     // Modify this function to sort the 'array' state
//     const arrayCopy = [...this.state.array];
//     // Your Selection Sort logic here

//     this.setState({ array: arrayCopy });
//   };

//   insertionSort = () => {
//     // Implementation of Insertion Sort
//     // Modify this function to sort the 'array' state
//     const arrayCopy = [...this.state.array];
//     // Your Insertion Sort logic here

//     this.setState({ array: arrayCopy });
//   };

//   mergeSort = () => {
//     // Implementation of Merge Sort
//     // Modify this function to sort the 'array' state
//     const arrayCopy = [...this.state.array];
//     // Your Merge Sort logic here
  
//     this.setState({ array: arrayCopy });
//   };

//   quickSort = () => {
//     // Implementation of Quick Sort
//     // Modify this function to sort the 'array' state
//     const arrayCopy = [...this.state.array];
//     // Your Quick Sort logic here

//     this.setState({ array: arrayCopy });
//   };

//   render() {
//     return (
//       <div>
//         <nav id="topbar">
//           <span id="title">
//             <Link
//               to="/sorting/Bubble"
//               className={this.state.selectedViz === 'Bubble' ? 'selected-viz' : ''}
//               onClick={this.bubbleSort}
//             >
//               Bubble
//             </Link>
//             <Link
//               to="/sorting/Selection"
//               className={this.state.selectedViz === 'Selection' ? 'selected-viz' : ''}
//               onClick={this.selectionSort}
//             >
//               Selection
//             </Link>
//             <Link
//               to="/sorting/Insert"
//               className={this.state.selectedViz === 'Insertion' ? 'selected-viz' : ''}
//               onClick={this.insertionSort}
//             >
//               Insertion
//             </Link>
//             <Link
//               to="/sorting/Merge"
//               className={this.state.selectedViz === 'Merge' ? 'selected-viz' : ''}
//               onClick={this.mergeSort}
//             >
//               Merge
//             </Link>
//             <Link
//               to="/sorting/Quick"
//               className={this.state.selectedViz === 'Quick' ? 'selected-viz' : ''}
//               onClick={this.quickSort}
//             >
//               Quick
//             </Link>
//             {/* Add more links for other visualization titles */}
//           </span>
//         </nav>
//         <div>
//           {/* Display the sorted array or any visualization here */}
//           <div>{JSON.stringify(this.state.array)}</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Sorting;





// import React from 'react';
// import { Link } from 'react-router-dom';
// import { getMergeSortAnimations } from '../SortingAlgorithms/SortingAlgorithms.js';
// import '../SortingVisualizer/SortingVisualizer.css';

// const ANIMATION_SPEED_MS = 5;
// const NUMBER_OF_ARRAY_BARS = 10;
// const PRIMARY_COLOR = 'turquoise';
// const SECONDARY_COLOR = 'red';

// export default class SortingVisualizer extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       array: [],
//     };
//   }

//   componentDidMount() {
//     this.resetArray();
//   }

//   resetArray() {
//     const array = [];
//     for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
//       array.push(randomIntFromInterval(5, 730));
//     }
//     this.setState({ array });
//   }

//   mergeSort() {
//     const animations = getMergeSortAnimations(this.state.array.slice());
//     for (let i = 0; i < animations.length; i++) {
//       const arrayBars = document.getElementsByClassName('array-bar');
//       const isColorChange = i % 3 !== 2;
//       if (isColorChange) {
//         const [barOneIdx, barTwoIdx] = animations[i];
//         const barOneStyle = arrayBars[barOneIdx].style;
//         const barTwoStyle = arrayBars[barTwoIdx].style;
//         const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
//         setTimeout(() => {
//           barOneStyle.backgroundColor = color;
//           barTwoStyle.backgroundColor = color;
//         }, i * ANIMATION_SPEED_MS);
//       } else {
//         setTimeout(() => {
//           const [barOneIdx, newHeight] = animations[i];
//           const barOneStyle = arrayBars[barOneIdx].style;
//           barOneStyle.height = `${newHeight * 0.9}px`;
//         }, i * ANIMATION_SPEED_MS);
//       }
//     }
//   }

//   quickSort() {
//     // Implement Quick Sort logic and animations
//   }

//   heapSort() {
//     // Implement Heap Sort logic and animations
//   }

//   bubbleSort() {
//     // Implement Bubble Sort logic and animations
//   }

//   testSortingAlgorithms() {
//     // Implement testing logic for sorting algorithms
//   }

//   render() {
//     const { array } = this.state;

//     return (
//       <div>
//         <nav id="topbar">
//           <span id="title">
//             <Link to="/sorting/Bubble" className={this.state.selectedViz === 'Bubble' ? 'selected-viz' : ''}>
//               Bubble
//             </Link>
//             <Link to="/sorting/Selection" className={this.state.selectedViz === 'Selection' ? 'selected-viz' : ''}>
//               Selection
//             </Link>
//             <Link to="/sorting/Insert" className={this.state.selectedViz === 'Insertion' ? 'selected-viz' : ''}>
//               Insertion
//             </Link>
//             <Link to="/sorting/Merge" className={this.state.selectedViz === 'Merge' ? 'selected-viz' : ''}>
//               Merge
//             </Link>
//             <Link to="/sorting/Quick" className={this.state.selectedViz === 'Quick' ? 'selected-viz' : ''}>
//               Quick
//             </Link>
//             {/* Add more links for other visualization titles */}
//           </span>
//         </nav>
//         <div className="array-container">
//           {array.map((value, idx) => (
//             <div
//               className="array-bar"
//               key={idx}
//               style={{
//                 backgroundColor: PRIMARY_COLOR,
//                 height: `${value * 0.9}px`,
//                 width: '30px',
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// function randomIntFromInterval(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// // Sorting Algorithms
// const bubbleSort = (array) => {
//   const n = array.length;

//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       // Compare adjacent elements
//       if (array[j] > array[j + 1]) {
//         // Swap if they are in the wrong order
//         const temp = array[j];
//         array[j] = array[j + 1];
//         array[j + 1] = temp;
//       }
//     }
//   }

//   return array;
// };

// // Example usage:
// // const unsortedArray = [8, 4, 2, 10, 5, 7, 1, 3, 6, 9];
// // const sortedArray = bubbleSort(unsortedArray);
// // console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const selectionSort = (array) => {
//   const n = array.length;

//   for (let i = 0; i < n - 1; i++) {
//     // Assume the current index is the minimum
//     let minIndex = i;

//     // Find the index of the minimum element in the unsorted part of the array
//     for (let j = i + 1; j < n; j++) {
//       if (array[j] < array[minIndex]) {
//         minIndex = j;
//       }
//     }

//     // Swap the found minimum element with the first element
//     const temp = array[minIndex];
//     array[minIndex] = array[i];
//     array[i] = temp;
//   }

//   return array;
// };

// // Example usage:
// // const unsortedArray = [8, 4, 2, 10, 5, 7, 1, 3, 6, 9];
// // const sortedArray = selectionSort(unsortedArray);

// // console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// const insertionSort = (array) => {
//   const n = array.length;

//   for (let i = 1; i < n; i++) {
//     // Store the current element to be compared
//     const currentElement = array[i];

//     // Start comparing with the previous elements and move them to the right
//     let j = i - 1;
//     while (j >= 0 && array[j] > currentElement) {
//       array[j + 1] = array[j];
//       j--;
//     }

//     // Place the current element in its correct position
//     array[j + 1] = currentElement;
//   }

//   return array;
// };

// // Example usage:
// // const unsortedArray = [8, 4, 2, 10, 5, 7, 1, 3, 6, 9];
// // const sortedArray = insertionSort(unsortedArray);

// // console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const mergeSort = (array) => {
//   if (array.length <= 1) {
//     return array;
//   }

//   // Split the array into two halves
//   const middle = Math.floor(array.length / 2);
//   const leftHalf = array.slice(0, middle);
//   const rightHalf = array.slice(middle);

//   // Recursively sort each half
//   const sortedLeft = mergeSort(leftHalf);
//   const sortedRight = mergeSort(rightHalf);

//   // Merge the sorted halves
//   return merge(sortedLeft, sortedRight);
// };

// const merge = (left, right) => {
//   let result = [];
//   let leftIndex = 0;
//   let rightIndex = 0;

//   // Compare elements from both arrays and merge them in sorted order
//   while (leftIndex < left.length && rightIndex < right.length) {
//     if (left[leftIndex] < right[rightIndex]) {
//       result.push(left[leftIndex]);
//       leftIndex++;
//     } else {
//       result.push(right[rightIndex]);
//       rightIndex++;
//     }
//   }

//   // Concatenate the remaining elements (if any)
//   return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
// };

// // Example usage:
// // const unsortedArray = [8, 4, 2, 10, 5, 7, 1, 3, 6, 9];
// // const sortedArray = mergeSort(unsortedArray);

// // console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// const quickSort = (array) => {
//   if (array.length <= 1) {
//     return array;
//   }

//   // Choose a pivot element
//   const pivot = array[Math.floor(Math.random() * array.length)];

//   // Partition the array into two halves
//   const left = array.filter((element) => element < pivot);
//   const equal = array.filter((element) => element === pivot);
//   const right = array.filter((element) => element > pivot);

//   // Recursively sort the left and right halves
//   return quickSort(left).concat(equal).concat(quickSort(right));
// };

// // Example usage:
// // const unsortedArray = [8, 4, 2, 10, 5, 7, 1, 3, 6, 9];
// // const sortedArray = quickSort(unsortedArray);

// // console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// // Sorting Page
// class Sorting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedViz: 'Bubble', // Defaultly selected visualization
//       array: [8, 4, 2, 10, 5, 7, 1, 3, 6, 9], // Example array to sort
//     };
//   }

//   handleSort = (sortFunction) => {
//     const arrayCopy = [...this.state.array];
//     const sortedArray = sortFunction(arrayCopy);
//     this.setState({ array: sortedArray, selectedViz: sortFunction.name });
//   };

//   render() {
//     return (
//       <div>
//         <nav id="topbar">
//           <span id="title">
//             <Link to="/" className={this.state.selectedViz === 'Bubble' ? 'selected-viz' : ''}>
//               Bubble
//             </Link>
//             <Link to="/selection" className={this.state.selectedViz === 'Selection' ? 'selected-viz' : ''}>
//               Selection
//             </Link>
//             <Link to="/insertion" className={this.state.selectedViz === 'Insertion' ? 'selected-viz' : ''}>
//               Insertion
//             </Link>
//             <Link to="/merge" className={this.state.selectedViz === 'Merge' ? 'selected-viz' : ''}>
//               Merge
//             </Link>
//             <Link to="/quick" className={this.state.selectedViz === 'Quick' ? 'selected-viz' : ''}>
//               Quick
//             </Link>
//           </span>
//         </nav>
//         <div>
//           {/* Display the sorted array or any visualization here */}
//           <div>{JSON.stringify(this.state.array)}</div>
//         </div>

//         <Routes>
//           <Route path="/bubble" render={() => <SortingAlgorithmPage algorithm={bubbleSort} />} />
//           <Route path="/selection" render={() => <SortingAlgorithmPage algorithm={selectionSort} />} />
//           <Route path="/insertion" render={() => <SortingAlgorithmPage algorithm={insertionSort} />} />
//           <Route path="/merge" render={() => <SortingAlgorithmPage algorithm={mergeSort} />} />
//           <Route path="/quick" render={() => <SortingAlgorithmPage algorithm={quickSort} />} />
//         </Routes>
//       </div>
//     );
//   }
// }

// // Sorting Algorithm Page
// const SortingAlgorithmPage = ({ algorithm }) => {
//   return (
//     <div>
//       <h1>{algorithm.name} Sort Visualization</h1>
//       {/* Visualization code for the algorithm goes here */}

//     </div>
//   );
// };

// export default Sorting;


import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

// Sorting Algorithms
const bubbleSort = (array, setAnimations) => {
  const n = array.length;
  const animations = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      animations.push([j, j + 1, 'compare']);
      if (array[j] > array[j + 1]) {
        // Swap if they are in the wrong order
        animations.push([j, array[j + 1], 'swap']);
        animations.push([j + 1, array[j], 'swap']);
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  setAnimations(animations);
  return array;
};

const selectionSort = (array, setAnimations) => {
  const n = array.length;
  const animations = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([minIndex, j, 'compare']);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    animations.push([i, minIndex, 'swap']);
    const temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }

  setAnimations(animations);
  return array;
};

const insertionSort = (array, setAnimations) => {
  const n = array.length;
  const animations = [];

  for (let i = 1; i < n; i++) {
    const currentElement = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currentElement) {
      animations.push([j, j + 1, 'compare']);
      animations.push([j + 1, array[j], 'swap']);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentElement;
    animations.push([j + 1, currentElement, 'swap']);
  }

  setAnimations(animations);
  return array;
};

const mergeSort = (array, setAnimations) => {
  if (array.length <= 1) {
    return array;
  }

  const animations = [];

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      animations.push([leftIndex, rightIndex, 'compare']);
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const middle = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middle);
  const rightHalf = array.slice(middle);

  const sortedLeft = mergeSort(leftHalf, setAnimations);
  const sortedRight = mergeSort(rightHalf, setAnimations);

  return merge(sortedLeft, sortedRight);
};

const quickSort = (array, setAnimations) => {
  if (array.length <= 1) {
    return array;
  }

  const animations = [];
  const pivot = array[Math.floor(Math.random() * array.length)];

  const left = array.filter((element) => element < pivot);
  const equal = array.filter((element) => element === pivot);
  const right = array.filter((element) => element > pivot);

  setAnimations(animations);
  return quickSort(left, setAnimations).concat(equal, quickSort(right, setAnimations));
};

// Sorting Page
const Sorting = () => {
  const [selectedViz, setSelectedViz] = useState('Bubble');
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);

  const handleSort = (sortFunction) => {
    const arrayCopy = [...array];
    sortFunction(arrayCopy, setAnimations);
  };

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setAnimations([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div>
      <nav id="topbar">
        <span id="title">
          <Link to="/" onClick={() => setSelectedViz('Bubble')} className={selectedViz === 'Bubble' ? 'selected-viz' : ''}>
            Bubble
          </Link>
          <Link to="/selection" onClick={() => setSelectedViz('Selection')} className={selectedViz === 'Selection' ? 'selected-viz' : ''}>
            Selection
          </Link>
          <Link to="/insertion" onClick={() => setSelectedViz('Insertion')} className={selectedViz === 'Insertion' ? 'selected-viz' : ''}>
            Insertion
          </Link>
          <Link to="/merge" onClick={() => setSelectedViz('Merge')} className={selectedViz === 'Merge' ? 'selected-viz' : ''}>
            Merge
          </Link>
          <Link to="/quick" onClick={() => setSelectedViz('Quick')} className={selectedViz === 'Quick' ? 'selected-viz' : ''}>
            Quick
          </Link>
        </span>
      </nav>
      <div>
        {/* Display the sorted array or any visualization here */}
        <div className="array-container">
          {array.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value}px`, backgroundColor: 'turquoise' }}
            ></div>
          ))}
        </div>
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={() => handleSort(bubbleSort)}>Bubble Sort</button>
        <button onClick={() => handleSort(selectionSort)}>Selection Sort</button>
        <button onClick={() => handleSort(insertionSort)}>Insertion Sort</button>
        <button onClick={() => handleSort(mergeSort)}>Merge Sort</button>
        <button onClick={() => handleSort(quickSort)}>Quick Sort</button>
      </div>
    </div>
  );
};

// Sorting Algorithm Page
const SortingAlgorithmPage = () => {
  return (
    <div>
      {/* Visualization code for the algorithm goes here */}
    </div>
  );
};

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Sorting />} />
        <Route path="/selection" element={<SortingAlgorithmPage />} />
        <Route path="/insertion" element={<SortingAlgorithmPage />} />
        <Route path="/merge" element={<SortingAlgorithmPage />} />
        <Route path="/quick" element={<SortingAlgorithmPage />} />
      </Routes>
  );
};

export default App;
