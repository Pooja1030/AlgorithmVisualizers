function kruskal(vertices, edges) {
    // Create a disjoint-set data structure to track connected components
    const parent = new Map();
    const mstEdges = [];
    const visitedEdges = new Set();

    // Create disjoint-set data structure
    for (const vertex of vertices) {
        parent.set(vertex, vertex);
    }

    const find = (v) => {
        if (parent.get(v) === v) return v;
        return find(parent.get(v));
    };

    const union = (v1, v2) => {
        const root1 = find(v1);
        const root2 = find(v2);
        parent.set(root1, root2);
    };

    // Sort edges by weight in non-decreasing order
    edges.sort((a, b) => a.weight - b.weight);

    // Add edges to MST if they don't form a cycle
    for (const edge of edges) {
        const root1 = find(edge.from);
        const root2 = find(edge.to);
        visitedEdges.add(edge);

        if (root1 !== root2) {
            mstEdges.push(edge);
            union(root1, root2);
        }
    }

    return { mstEdges, visitedEdges };
}


export default kruskal;
