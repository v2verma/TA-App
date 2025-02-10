import { useContext, useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { TaskInNode } from "./types";
import NodeStateContext from "../context/node-state.context";

export function TaskNode({ data: { label }, id, type }: NodeProps<TaskInNode>) {
  const { getNode, setNodes } = useReactFlow();
  const {openNode, setOpenNode} = useContext(NodeStateContext);

  const handleNode = () => {
    setOpenNode({isOpen: true, nodeId: id, nodeType: 'task'});
  }

  return (
        <><div className="test" style={{border: '1px solid #3244be', borderRadius: '23px'}}>
          <div style={{display: 'flex'}}>
            <button className="btn btn-default" title="click here to update" onClick={handleNode}>
              <i className="bi bi-pencil text-info"></i>
            </button>
            <div style={{width: '74px', padding: '5%'}}>{label}</div>
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
