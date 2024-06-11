import Navbar from '../../Components/navbar';

const RecursiveSortInfo = () => {
    return (
        <>
            <Navbar
                currentPage="Recursive Sort Algorithms"
                visualizer="recursiveSort"
            />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Recursive Sort Algorithms</h2>
                    <p>
                        Recursive sorting algorithms are algorithms that use recursion to break down problems into smaller subproblems, sulve them, and combine the results. Some of the most common recursive sort algorithms include Merge Sort, Heap Sort, and Quick Sort.
                    </p>
                </div>
                <div className="info-section">
                    <h2>Merge Sort</h2>
                    <p>
                        Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves to produce the final sorted array.
                    </p>
                    <ul>
                        <li>- Divide the array into two halves.</li>
                        <li>- Recursively sort each half.</li>
                        <li>- Merge the two sorted halves.</li>
                    </ul>
                    <p><strong>Time Complexity:</strong> O(n log n)</p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Merge_sort" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
                <div className="info-section">
                    <h2>Heap Sort</h2>
                    <p>
                        Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to create a sorted array. It invulves building a max heap from the input data, then repeatedly extracting the maximum element from the heap and rebuilding the heap.
                    </p>
                    <ul>
                        <li>- Build a max heap from the input array.</li>
                        <li>- Swap the root of the heap with the last element.</li>
                        <li>- Reduce the size of the heap by one and heapify the root element.</li>
                        <li>- Repeat until the heap is empty.</li>
                    </ul>
                    <p><strong>Time Complexity:</strong> O(n log n)</p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Heapsort" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
                <div className="info-section">
                    <h2>Quick Sort</h2>
                    <p>
                        Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
                    </p>
                    <ul>
                        <li>- Choose a pivot element from the array.</li>
                        <li>- Partition the array into elements less than and greater than the pivot.</li>
                        <li>- Recursively apply the above steps to the sub-arrays.</li>
                    </ul>
                    <p><strong>Time Complexity:</strong> Average case O(n log n), Worst case O(n^2)</p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Quicksort" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecursiveSortInfo;
