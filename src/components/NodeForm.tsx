import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import NodeContext from "../context/node-state.context";
import { useReactFlow } from "@xyflow/react";


const NodeForm = () => {
  const {openNode, setOpenNode} = useContext(NodeContext);
  const { nodeId, nodeType } = openNode;
  const { register, handleSubmit, setValue } = useForm();
  const { getNode, setNodes } = useReactFlow();

  const onSubmit = (data: any) => {
    setNodes((prevNodes) => prevNodes.map((node)=> node.id === nodeId ? {
        ...node,
        data: {label: node.data.label , ...data}
    }: node));
    setOpenNode({isOpen: false})
  };

  useEffect(()=> {
    setValue('taskname', getNode(nodeId || "10")?.data.taskname)
    setValue('assignee', getNode(nodeId || "10")?.data.assignee)
    setValue('date', getNode(nodeId || "10")?.data.date)
  }, [getNode, nodeId, setValue])

  return (
    <><div className="modal" style={{display: 'block'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update {nodeType?.toUpperCase()} #{nodeId}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>setOpenNode({isOpen: false})}
            ></button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Task Name</label>
              <input {...register("taskname")} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Assigne</label>
              <input {...register("assignee")} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Due Date</label>
              <input {...register("date")} className="form-control" />
            </div>
            <input type="submit" className="btn btn-primary"/>
          </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NodeForm;
