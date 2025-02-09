import { useReactFlow } from "@xyflow/react";

const NODE_CREATERS = [
  { type: "task", name: "Task", style: "btn btn-sm btn-primary" },
  { type: "condition", name: "Condition", style: "btn btn-sm btn-info" },
  {
    type: "notification",
    name: "Notification",
    style: "btn btn-sm btn-success",
  },
];

export default function NodeCreater() {
  const { setNodes } = useReactFlow();

  const onProviderClick = ({ name, code }: { name: string; code: string }) => {
    const location = Math.random() * 200;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: { label: name },
        type: code,
        position: { x: location, y: -location },
      },
    ]);
  };

  return (
    <div
      className="btn-group btn-group-sm"
      role="group"
      aria-label="create node type"
    >
      {NODE_CREATERS.map((item) => {
        return (
          <button
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
