import { useCallback, useContext, useState } from 'react';
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
import EditFormForNode from './components/EditFormForNode';
import NodeStateContext, { NodeProperties } from './context/node-state.context';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openNode, setOpenNode] = useState<NodeProperties>({isOpen: false, nodeId: "1", nodeType: 'task'});

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const edge = {...connection, id: `${edges.length} + 1`, type: 'customEdge'}
      setEdges((prevEdges: unknown) => addEdge(edge, prevEdges));
    },
    [edges.length, setEdges]
  );

  return (
    <NodeStateContext.Provider value={{openNode, setOpenNode}}><div style={{width: '50%', height: '100%', borderRadius: '1px solid black'}}>
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
      {openNode.isOpen && <EditFormForNode />}
    </ReactFlow>
    </div>
    </NodeStateContext.Provider>
  );
}
