function prim(vertices) {
    const mstEdges = [];
    const visitedEdges = [];
    const visitedVertices = new Set();

    // Start with the first vertex
    visitedVertices.add(vertices[0]);

    while (visitedVertices.size < vertices.length) {
        let minEdge = null;
        let minDistance = Infinity;

        for (const visitedVertex of visitedVertices) {
            for (const vertex of vertices) {
                if (!visitedVertices.has(vertex)) {

                    const distance = calculateDistance(visitedVertex, vertex);
                    if (distance < minDistance) {
                        const edgeId = `${Math.min(visitedVertex.id, vertex.id)}-${Math.max(visitedVertex.id, vertex.id)}`;
                        let edge = { from: visitedVertex, to: vertex, id: edgeId };
                        visitedEdges.push(edge);
                        minDistance = distance;
                        minEdge = { from: visitedVertex, to: vertex, id: edgeId };
                    }
                }
            }
        }

        mstEdges.push(minEdge);
        visitedVertices.add(minEdge.to);
    }

    return { mstEdges, visitedEdges };
}


function calculateDistance(vertex1, vertex2) {
    const dx = vertex1.x - vertex2.x;
    const dy = vertex1.y - vertex2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export default prim;
