import { useCallback, useState } from "react";
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
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import EditFormForNode from "./components/NodeForm";
import NodeStateContext, { NodeProperties } from "./context/node-state.context";
import NodeDataGrid from "./components/NodeDataGrid";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [openNode, setOpenNode] = useState<NodeProperties>({
    isOpen: false,
    nodeId: "1",
    nodeType: "task",
  });

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        id: `${edges.length} + 1`,
        type: "customEdge",
      };
      setEdges((prevEdges: unknown) => addEdge(edge, prevEdges));
    },
    [edges.length, setEdges]
  );

  return (
    <div className="container">
      <div className="row">
      <ReactFlowProvider>
        <div className="col-md-7 col-sm-12">
          <div
            className="shadow p-3 mb-5 bg-body rounded"
            style={{ height: "90vh" }}
          >
            <NodeStateContext.Provider value={{ openNode, setOpenNode }}>
              <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={edges}
                edgeTypes={edgeTypes}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                maxZoom={0.8}
              >
                <Background />
                {/* <MiniMap /> */}
                <Controls />
                {openNode.isOpen && <EditFormForNode />}
              </ReactFlow>
            </NodeStateContext.Provider>
          </div>
        </div>
        <div className="col-md-5">
          <div
            className="shadow p-3 mb-5 bg-body rounded"
            style={{ height: "90vh" }}
          >
            
              <NodeDataGrid nodes={nodes?.filter((node)=> node.type !== "nodecreator")} />
          </div>
        </div>
      </ReactFlowProvider>
      </div>
    </div>
  );
}
