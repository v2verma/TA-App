import { useState } from "react";
import { useReactFlow } from "@xyflow/react";

const NODE_CREATERS = [
  { type: "task", name: "Task", style: "btn btn-primary" },
  { type: "condition", name: "Condition", style: "btn btn-info" },
  {
    type: "notification",
    name: "Notification",
    style: "btn btn-success",
  },
];

export default function NodeCreator() {
  const { getNodes, setNodes } = useReactFlow();

  const onProviderClick = ({ name, code }: { name: string; code: string }) => {
    const location = Math.random() * 200;
    const specificNode = getNodes().filter(node => node.data.nodeType === code);
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length}`,
        data: { nodeID: specificNode.length+1, nodeType: code, nodename: name },
        type: code,
        position: { x: location, y: -location },
      },
    ]);
  };

  return (
    <div
      className="btn-group btn-group-md"
      role="group"
      aria-label="create node type"
    >
      {NODE_CREATERS.map((item) => {
        return (
          <button
            key={item.type}
            className={item.style}
            title="create task node"
            onClick={() =>
              onProviderClick({ name: `${item.name}`, code: `${item.type}` })
            }
          >
            <i className="bi bi-plus"></i>
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
