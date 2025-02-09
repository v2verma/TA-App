import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";

import { NotificationInNode } from "./types";

export function NotificationNode({ data: { label }, id }: NodeProps<NotificationInNode>) {
  const { setNodes } = useReactFlow();
  return (
    <>
    <div className="test" style={{border: '1px solid', borderRadius: '1%'}}>
      <div style={{display: 'flex'}} title="click here for update">
        <div style={{width: '84px', padding: '5%'}}>{label}</div>
          <button className="btn btn-default" title="click here for delete"
            onClick={() =>
              setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
            }>
            <i className="bi bi-x text-danger"></i>
          </button>
      </div>
    </div>
  <Handle type="source" position={Position.Right} />
  <Handle type="target" position={Position.Left} />
</>
  );
}
