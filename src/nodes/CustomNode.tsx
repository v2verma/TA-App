import { useContext } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { TaskInNode } from "./types";
import NodeStateContext from "../context/node-state.context";

export function CustomNode({ data: { nodeID, nodeType, nodename }, id }: NodeProps<TaskInNode>) {
  const { setNodes } = useReactFlow();
  const { setOpenNode } = useContext(NodeStateContext);

  const handleNode = () => {
    setOpenNode({isOpen: true, nodeId: id, nodeType: nodeType, id: `${nodeID}`});
  }
  const nodeColorPalate: {task: string, condition: string, notification: string} = {
    'task': '#3244be',
    'condition': '#12a5b8',
    'notification': '#00c106'
  }
  const nodeStyle: {border: string, borderRadius: string} = {
    border:`1px solid${nodeColorPalate[nodeType]}`,
    borderRadius: '23px'
  }

  return (
        <><div className="test" style={nodeStyle}>
          <div style={{display: 'flex'}}>
            <button className="btn btn-default" title="click here to update" onClick={handleNode}>
              <i className="bi bi-pencil text-info"></i>
            </button>
            <div style={{width: '74px', padding: '5%'}}>{nodename}</div>
              <button className="btn btn-default" title="click here to delete"
                onClick={() =>
                  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
                }>
                <i className="bi bi-x text-danger"></i>
              </button>
          </div>
        </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} /></>
  );
}
