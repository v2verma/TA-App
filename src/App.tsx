import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  // MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const edge = {...connection, id: `${edges.length} + 1`, type: 'customEdge'}
      setEdges((prevEdges: unknown) => addEdge(edge, prevEdges));
    },
    [edges.length, setEdges]
  );

  return (
    <div style={{width: '50%', height: '100%', borderRadius: '1px solid black'}}>
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      maxZoom={1}
    >
      <Background />
      {/* <MiniMap /> */}
      <Controls />
    </ReactFlow>
    </div>
  );
}
