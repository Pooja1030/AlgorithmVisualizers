import { Outlet, Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';


const list = [
  {
    "title": "Sorting Algorithms",
    "link": "sort",
    "description": "Sorting is a technique to rearrange the elements of an array or a list in a specific order.",
    "algorithms": ["Bubble", "Insertion", "Selection", "Quick"],
    "img": ""
  },

  {
    "title": "Pathfinding Algorithms",
    "link": "pathfinder",
    "description": "Pathfinding algorithms are methods of finding the shortest path between two points in a graph, such as a map, a maze, or a network.",
    "algorithms": ["Dijkstra's ", "A*", "Breadth-first", "Depth-first"],
    "img": ""
  },

  {
    "title": "Recursive Sort",
    "link": "recursiveSort",
    "description": "Recursive sort refers to a sorting algorithm that uses the concept of recursion to sort a list of elements.",
    "algorithms": ["Merge", "Heap", "Quick"],
    "img": ""
  },

  {
    "title": "Convex Hull",
    "link": "convexHull",
    "description": "The convex hull of a set of points in a plane is the smallest convex polygon that contains all the points within it.",
    "algorithms": ["Graham Scan"],
    "img": ""
  },

  {
    "title": "Recursion Tree",
    "link": "graph",
    "description": "A recursion tree is useful for visualizing the tree of recursive calls and the amount of work done at each call.",
    "algorithms": ["Fibonacci", "Binomial Coefficient", "Derangement", "Bigmod"],
    "img": ""
  },

  {
    "title": "N-queens Problem",
    "link": "queen",
    "description": "The objective of queens problem is to place eight chess queens on an 8×8 chessboard so that no two queens threaten each other.",
    "algorithms": ["Backtracking"],
    "img": ""
  },

];


const search_tags = ["linked list", "array", "graph", "stack", "queue"];

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


export default function HomeDraft() {
  return (
    <>

      <div className="hero-container">
        <div className="nav-logo">
          <h3 className="logo-text">Algorithm Visualizer</h3>
        </div>

        <section className="hero-section">

          <div className="hero-text-content">
            <h1 className="hero-text-content-h1">Explore Algorithms:<br></br> Learn, Visualize, and Master</h1>

            <h2 className="hero-text-content-h2">
            Algorithm Visualizer is your interactive gateway to understanding and mastering essential algorithms used in computer science.
            </h2>

          </div>


          <div className="search-input-hero search-input-with-dropdown">
            <SearchIcon className="search-icon"></SearchIcon>

            <form action="/search" className="search-input-form" method="get">
              <label for="search" className="accessibility-text">Search</label>
              <input id="search" type="search" name="q" placeholder="Search keywords..." value="" className="search-input">
              </input>
            </form>
          </div>

          <ul className="search-suggestions-hero search-results-suggestions">
            <li className="search-results-suggestion search-results-suggestion-heading">Trending searches</li>

            {search_tags.map((item, itemId) =>
              <li className="search-results-suggestion">
                <a href="/search/landing%20page">{item}</a>
              </li>
            )}
          </ul>

        </section>
</div>

<div className="container">

        <section className="dashboard-section">
          {/* <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Explore all algorithms</h2>
          </div> */}
          <div className="cards-grid">

            {list.map((item, itemId) =>

              <Link to={item.link} className="algo-card" key={itemId}>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">{item.description}</Typography>
                      </React.Fragment>
                    }>
                    <Button><InfoIcon color="action"></InfoIcon></Button>
                  </HtmlTooltip>
                </div>

                <ul className="card-tags">
                  {item.algorithms.map((algo) => <li className="card-tag">{algo}</li>)}
                </ul>

                <img className="card-logo" src="https://hrcdn.net/s3_pub/hr-assets/dashboard/ProblemSolving.svg" alt="{item.title}"></img>
              </Link>
            )}

          </div>
        </section>

      </div>
      <Outlet />
    </>
  );
};

// export default HomeDraft;
