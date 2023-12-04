

import { Outlet, Link } from "react-router-dom";

const VizItem = ({ id, title, description, link }) => (
    <li id={id} className="viz">
        <div className="li-wrapper" style={{ backgroundColor: 'lightblue' }}>
            <Link to={link} className="thumbnail" href={link} data-anim={id}>
            </Link>
            <div className="info">
                <h3>
                    <Link to={link}>{title}</Link>
                </h3>
                <p>{description}</p>
            </div>
        </div>
    </li>
);


const Home = () => {
    return (
        <>
            <div id="main">
                <ul className="list">
                    <VizItem
                        id="Sorting"
                        title="Sorting"
                        description="Sorting is a technique to rearrange the elements of an array or a list in a specific order. It can be performed using various algorithms such as bubble sort, selection sort, insertion sort, merge sort, quick sort, etc."
                        link="sort"
                    />
                    <VizItem
                        id="bitmask"
                        title="Bitmask"
                        description="Bitmask is a technique used for bit manipulation, often applied in computer science and algorithms."
                        link=""
                    />
                    <VizItem
                        id="Binary Heap"
                        title="Binary Heap"
                        description="Binary Heap is one possible data structure to model an efficient Priority Queue (PQ) Abstract Data Type (ADT). In a PQ, each element has a priority and an element with higher priority is served before an element with lower priority (ties are either simply resolved arbitrarily or broken with standard First-In First-Out (FIFO) rule as with a normal Queue)."
                        link=""
                    />
                    <VizItem
                        id="LinkedList"
                        title="Linked List"
                        description="Linked List is a data structure consisting of a group of vertices (nodes) which together represent a sequence. Under the simplest form, each vertex is composed of a data and a reference (link) to the next vertex in the sequence"
                        link=""
                    />
                    <VizItem
                        id="Union-Find DS"
                        title="Union-Find DS"
                        description="The Union-Find Disjoint Sets (UFDS) data structure is used to model a collection of disjoint sets, which is able to efficiently (i.e., in nearly constant time) determine which set an item belongs to, test if two items belong to the same set, and union two disjoint sets into one when needed. It can be used to find connected components in an undirected graph, and can hence be used as part of Kruskal's algorithm for the Minimum Spanning Tree (MST) problem."
                        link=""
                    />
                    <VizItem
                        id="Hash Table"
                        title="Hash Table"
                        description="Hash Table is a data structure to map key to values (also called Table or Map Abstract Data Type/ADT). It uses a hash function to map large or even non-Integer keys into a small range of Integer indices (typically [0..hash_table_size-1])."
                        link=""
                    />
                    <VizItem
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
                    />
                    <VizItem
                        id="Fenwich Tree"
                        title="Fenwich Tree"
                        description="A Binary Indexed (Fenwick) Tree is a data structure that provides efficient methods for implementing dynamic cumulative frequency tables.This Fenwick Tree data structure uses many bit manipulation techniques. In this visualization, we will refer to this data structure using the term Fenwick Tree (usually abbreviated as 'FT') as the abbreviation 'BIT' of Binary Indexed Tree is usually associated with the usual bit manipulation."
                        link=""
                    />
                    <VizItem
                        id="Segment Tree"
                        title="Segment Tree"
                        description="A Segment Tree (ST) is a binary tree that is build on top of an (usually integer) array so that we can solve the Range Min/Max/Sum Query as well as any Range Update Query of this array in O(log N) time instead of the naive O(N) time. Given an array A of N (usually integer) elements, we can build the corresponding RMinQ/RMaxQ/RSumQ Segment Tree in O(N) time."
                        link=""
                    />
                    <VizItem
                        id="Graph Traversal"
                        title="Graph Traversal"
                        description="In computer science, graph traversal (also known as graph search) refers to the process of visiting (checking and/or updating) each vertex in a graph. Such traversals are classified by the order in which the vertices are visited. Tree traversal is a special case of graph traversal."
                        link=""
                    />
                    <VizItem
                        id="Recursion Tree"
                        title="Recursion Tree"
                        description="A recursion tree is useful for visualizing what happens when a recurrence is iterated. It diagrams the tree of recursive calls and the amount of work done at each call."
                        link=""
                    />
                    <VizItem
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
                    />
                    <VizItem
                        id="Minimum Spanning Tree"
                        title="Minimum Spanning Tree"
                        description="A Spanning Tree (ST) of a connected undirected weighted graph G is a subgraph of G that is a tree and connects (spans) all vertices of G. A graph G can have many STs (see this or this), each with different total weight (the sum of edge weights in the ST)."
                        link=""
                    />

                </ul>
            </div>
            <Outlet />
        </>

    );
};

export default Home;