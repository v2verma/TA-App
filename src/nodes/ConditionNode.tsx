import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";

import { ConditionInNode } from "./types";

export function ConditionNode({ data: { label }, id }: NodeProps<ConditionInNode>) {
  const { setNodes } = useReactFlow();
  return (
    <>
       <div className="test" style={{border: '1px solid', borderRadius: '1%'}}>
          <div style={{display: 'flex'}} title="click here for update">
            <div style={{width: '74px', padding: '5%'}}>{label}</div>
              <button className="btn btn-default" title="click here for delete"
                onClick={() =>
                  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
                }>
                <i className="bi bi-x text-danger"></i>
              </button>
          </div>
        </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}
