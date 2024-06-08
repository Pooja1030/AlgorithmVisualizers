import React from 'react';
import Navbar from '../../Components/navbar';

const ConvexHullInfo = () => {
    return (
        <>
            <Navbar currentPage="Convex Hull" visualizer="convexhull" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Convex Hull Problem</h2>
                    <p>
                        The convex hull of a set of points in a plane is the smallest convex polygon that encloses all the points. The convex hull problem involves finding this polygon efficiently.
                    </p>
                    <p>
                        Convex hulls have applications in various fields, including computer graphics, geographical information systems (GIS), pattern recognition, and computational geometry.
                    </p>
                    <button>
                    <a href="https://en.wikipedia.org/wiki/Convex_hull" target="_blank" rel="noopener noreferrer">Learn more</a>
                    </button>
                </div>
                <div className="info-section">
                    <h2>Graham Scan Algorithm</h2>
                    <p>
                        The Graham scan algorithm is a popular method for finding the convex hull of a set of points. It works by sorting the points based on their polar angle with respect to a reference point (usually the point with the lowest y-coordinate) and then traversing the sorted points to construct the convex hull.
                    </p>
                    <p>
                        The steps of the Graham scan algorithm are as follows:
                    </p>
                    <ul>
                        <li>- Choose the point with the lowest y-coordinate (and the leftmost one in case of a tie) as the reference point.</li>
                        <li>- Sort the remaining points based on their polar angle with respect to the reference point.</li>
                        <li>- Traverse the sorted points and add them to the convex hull while ensuring that the hull remains convex.</li>
                    </ul>
                    <p>
                        The Graham scan algorithm has a time complexity of O(n log n), where n is the number of input points, making it efficient for practical purposes.
                    </p>
                    <br />
                    <button>
                    <a href="https://en.wikipedia.org/wiki/Graham_scan" target="_blank" rel="noopener noreferrer">Learn more</a>
                    </button> </div>
            </div>
        </>
    );
};

export default ConvexHullInfo;
