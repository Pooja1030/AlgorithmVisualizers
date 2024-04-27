import { Outlet, Link } from "react-router-dom";


import pathfinder from "../Images/pathfinder.gif"
import sorting from "../Images/sorting.gif"
import convexHull from "../Images/convexHull.gif"
import recursiveSort from "../Images/recursiveSort.gif"
import recursionTree from "../Images/recursionTree.gif"
import queen from "../Images/queen.gif"
import puzzle from "../Images/15puzzle.png"



import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const algorithms = {
    "sorting": ["Bubble", "Insertion", "Selection", "Quick"],
    "pathfinding": ["Dijkstra's ", "A*", "Breadth-first", "Depth-first"],
    "recursiveSort": ["Merge", "Heap", "Quick"],
    "convexHull": ["Graham Scan"],
    "recursionTree": ["Fibonacci", "Binomial Coefficient", "Derangement", "Bigmod"],
    "queen":["Backtracking"],
    "stack":["Push", "Pop", "Peek", "isEmpty", "Size"],
    "queue":["Enqueue", "Dequeue", "Peek", "isEmpty", "Size"],
    "linkedlist":["SinglyLinkedList", "DoublyLinkedList", "CircularLinkedList"],
    "binarytree":["Preorder","Inorder","Postorder"],
    "binarysearch":["Search"],
    "minimumspanningtree":["Prim's","Kruskal"],
};


const getAlgoList = (title) => {
    return algorithms[title].map((item) => <li className="algo-tag">{item}</li>)
};

const VizItem = ({ id, title, description, link, algorithm, img }) => (
    <li id={id} className="viz">
        <div className="li-wrapper">
            {/* <Link to={link} className="thumbnail" href={link} data-anim={id}>

                <img src={img} alt={title} height={"200px"} /> */}

            {/* <div className="static" style={{ backgroundImage: 'url(../images/sorting.png)' }}></div> */}
            {/* <div className="static" style={{ background-image: 'url()' }}></div> */}

            {/* </Link> */}

            <Link to={link} className="thumbnail" href={link} data-anim={id}>
                <img src={img} alt={title} height={"200px"} />
            </Link>

            <div className="info">
                <Accordion className="accordion">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className="title"><Link to={link}>{title}</Link></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{description}</Typography>
                    </AccordionDetails>
                </Accordion>

                <ul className="algo-tags">{algorithm}</ul>

            </div>
        </div>
    </li>
);


const Home = () => {
    return (
        <>
        
            <div className="title-logo">
                Algorithm Visualizer
            </div>
            <div id="main">

                <ul className="list">
                    <VizItem
                        id="Sorting"
                        title="Sorting"
                        description="Sorting is a technique to rearrange the elements of an array or a list in a specific order."
                        link="sort"
                        algorithm={getAlgoList("sorting")}
                        img={sorting}


                    />
                    <VizItem
                        id="Pathfinding"
                        title="Pathfinding"
                        description="Pathfinding algorithms are methods of finding the shortest path between two points in a graph, such as a map, a maze, or a network."
                        link="pathfinder"
                        algorithm={getAlgoList("pathfinding")}
                        img={pathfinder}
                    />
                    <VizItem
                        id="RecursiveSort"
                        title="Recursive Sort"
                        description="Recursive sort refers to a sorting algorithm that uses the concept of recursion to sort a list of elements."
                        link="recursiveSort"
                        algorithm={getAlgoList("recursiveSort")}
                        img={recursiveSort}


                    />
                    <VizItem
                        id="convexHull"
                        title="Convex Hull"
                        description="The convex hull of a set of points in a plane is the smallest convex polygon that contains all the points within it."
                        link="convexHull"
                        algorithm={getAlgoList("convexHull")}
                        img={convexHull}

                    />
                    <VizItem
                        id="recursionTree"
                        title="Recursion Tree"
                        description="A recursion tree is useful for visualizing the tree of recursive calls and the amount of work done at each call."
                        link="graph"
                        algorithm={getAlgoList("recursionTree")}
                        img={recursionTree}

                    />
                    <VizItem
                        id="Queen"
                        title="N-queens Problem"
                        description="In the queen problem, the objective is to place eight chess queens on an 8×8 chessboard so that no two queens threaten each other."
                        link="queen"
                        algorithm={getAlgoList("queen")}
                        img={queen}
                    />

                    <VizItem
                        id="15Puzzle"
                        title="15 Puzzle"
                        description="The 15 puzzle is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing. The objective is to arrange the tiles in ascending order by making sliding moves that use the empty space."
                        link="puzzle"
                        img={puzzle}
                    />
                    <VizItem
                        id="Binary tree"
                        title="BinaryTree"
                        description="A binary tree is a data structure in which each node has at most two children, referred to as the left child and the right child."
                        algorithm={getAlgoList("binarytree")}
                        link="BinaryTree"
                    />
                    <VizItem
                        id="Stack"
                        title="Stack"
                        // description="Bitmask is a technique used for bit manipulation, often applied in computer science and algorithms."
                        link="Stack"
                        algorithm={getAlgoList("stack")}
                        description="A stack is a Linear data structure. It follows Last in First Out(LIFO). Elements are inserted and deleted from the top of a stack."

                    />
                    <VizItem
                        id="Queue"
                        title="Queue"
                        // description="Bitmask is a technique used for bit manipulation, often applied in computer science and algorithms."
                        link="Queue"
                        algorithm={getAlgoList("queue")}
                        description="A Queue is a Linear data structure. It follows First in First Out(FIFO). Elements are inserted at the end of the Queue and deleted from the beginning of a queue."

                    />
                    <VizItem
                        id="Binary Search"
                        title="Binary Search"
                        description="Binary Search is defined as a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N)."
                        algorithm={getAlgoList("binarysearch")}
                        link="Binarysearch"
                    />
                    <VizItem
                        id="LinkedList"
                        title="Linked List"
                        description="Linked List is a data structure consisting of a group of vertices (nodes) which together represent a sequence. Under the simplest form, each vertex is composed of a data and a reference (link) to the next vertex in the sequence"
                        algorithm={getAlgoList("linkedlist")}
                        link="LinkedList"
                    />
                    <VizItem
                        id="MinimumSpanningTree"
                        title="MinimumSpanningTree"
                        description="A minimum spanning tree (MST) is a subset of the edges of a connected, edge-weighted graph that connects all the vertices together without any cycles and with the minimum possible total edge weight. It is a way of finding the most economical way to connect a set of vertices."
                        algorithm={getAlgoList("minimumspanningtree")}
                        link="MinimumSpanningTree"
                    />
                   
        
                    
                    {/* <VizItem
                        id="Union-Find DS"
                        title="Union-Find DS"
                        description="The Union-Find Disjoint Sets (UFDS) data structure is used to model a collection of disjoint sets, which is able to efficiently (i.e., in nearly constant time) determine which set an item belongs to, test if two items belong to the same set, and union two disjoint sets into one when needed. It can be used to find connected components in an undirected graph, and can hence be used as part of Kruskal's algorithm for the Minimum Spanning Tree (MST) problem."
                        link=""
                    /> */}
                    {/* <VizItem
                        id="Hash Table"
                        title="Hash Table"
                        description="Hash Table is a data structure to map key to values (also called Table or Map Abstract Data Type/ADT). It uses a hash function to map large or even non-Integer keys into a small range of Integer indices (typically [0..hash_Table_size-1])."
                        link=""
                    /> */}
                    {/* <VizItem
                        id="Binary Search Tree"
                        title="Binary Search Tree"
                        description="A Binary Search Tree (BST) is a specialized type of binary tree in which each vertex can have up to two children. This structure adheres to the BST property, stipulating that every vertex in the left subtree of a given vertex must carry a value smaller than that of the given vertex, and every vertex in the right subtree must carry a value larger. This visualization implements 'multiset' property: Although all keys remain distinct integers, information of duplicated integers are stored as a frequency attribute."
                        link=""
                    />
                    <VizItem
                        id="Graph Structure"
                        title="Graph Structure"
                        description="A graph is made up of vertices/nodes and edges/lines that connect those vertices.A graph may be undirected (meaning that there is no distinction between the two vertices associated with each bidirectional edge) or a graph may be directed (meaning that its edges are directed from one vertex to another but not necessarily in the other direction).
                    A graph may be weighted (by assigning a weight to each edge, which represent numerical values associated with that connection) or a graph may be unweighted (either all edges have unit weight 1 or all edges have the same constant weight)."
                        link=""
                    /> */}
                    {/* <VizItem
                        id="Fenwich Tree"
                        title="Fenwich Tree"
                        description="A Binary Indexed (Fenwick) Tree is a data structure that provides efficient methods for implementing dynamic cumulative frequency Tables.This Fenwick Tree data structure uses many bit manipulation techniques. In this visualization, we will refer to this data structure using the term Fenwick Tree (usually abbreviated as 'FT') as the abbreviation 'BIT' of Binary Indexed Tree is usually associated with the usual bit manipulation."
                        link=""
                    />
                    <VizItem
                        id="Segment Tree"
                        title="Segment Tree"
                        description="A Segment Tree (ST) is a binary tree that is build on top of an (usually integer) array so that we can solve the Range Min/Max/Sum Query as well as any Range Update Query of this array in O(log N) time instead of the naive O(N) time. Given an array A of N (usually integer) elements, we can build the corresponding RMinQ/RMaxQ/RSumQ Segment Tree in O(N) time."
                        link=""
                    /> */}
                    {/* <VizItem
                        id="Graph Traversal"
                        title="Graph Traversal"
                        description="In computer science, graph traversal (also known as graph search) refers to the process of visiting (checking and/or updating) each vertex in a graph. Such traversals are classified by the order in which the vertices are visited. Tree traversal is a special case of graph traversal."
                        link=""
                    /> */}
                    {/* <VizItem
                        id="Recursion Tree"
                        title="Recursion Tree"
                        description="A recursion tree is useful for visualizing what happens when a recurrence is iterated. It diagrams the tree of recursive calls and the amount of work done at each call."
                        link=""
                    /> */}
                    {/* <VizItem 
                        id="Cycle Finding"
                        title="Cycle Finding"
                        description="Floyd's cycle-finding algorithm is a pointer algorithm that uses only two pointers, which move through the sequence at different speeds. It is also called the tortoise and the hare algorithm"
                        link=""
                    />
                    <VizItem
                        id="Suffix Tree"
                        title="Suffix Tree"
                        description="A Suffix Tree is a compressed tree containing all the suffixes of the given (usually long) text string T of length n characters (n can be in order of hundred thousands characters).
                    The positions of each suffix in the text string T are recorded as integer indices at the leaves of the Suffix Tree whereas the path labels (concatenation of edge labels starting from the root) of the leaves describe the suffixes.
                    Suffix Tree provides a particularly fast implementation for many important (long) string operations."
                        link=""
                    />
                    <VizItem
                        id="Suffix Array"
                        title="Suffix Array"
                        description="Suffix Array is a sorted array of all suffixes of a given (usually long) text string T of length n characters (n can be in order of hundred thousands characters).
                    Suffix Array is a simple, yet powerful data structure which is used, among others, in full text indices, data compression algorithms, and within the field of bioinformatics."
                        link=""
                    />} */
}
                </ul>
            </div>
            <Outlet />
        </>

    );
};

export default Home;