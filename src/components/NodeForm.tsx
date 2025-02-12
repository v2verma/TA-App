import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import NodeContext from "../context/node-state.context";
import { useReactFlow } from "@xyflow/react";

const NodeForm = () => {
  const { openNode, setOpenNode } = useContext(NodeContext);
  const { nodeId="1", nodeType, id } = openNode;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { getNode, setNodes } = useReactFlow();

  const onSubmit = (data: any) => {
    // console.log("SUBMIT", data)
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {...node.data, ...data}
            }
          : node
      )
    );
    setOpenNode({ isOpen: false });
  };

  useEffect(() => {
    // console.log("TEST", nodeId, getNode(nodeId))
    setValue("nodename", getNode(nodeId)?.data.nodename);
    setValue("assignee", getNode(nodeId)?.data.assignee);
    setValue("duedate", getNode(nodeId)?.data.duedate);
  }, [getNode, nodeId, setValue]);

  return (
    <>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Update {nodeType?.toUpperCase()} #{id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setOpenNode({ isOpen: false })}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Node Name
                  </label>
                  <input
                    {...register("nodename", {
                      required: "Node Name is required",
                    })}
                    className="form-control"
                  />
                  {errors.nodeName && (
                    <p className="invalid-feedback d-block">
                      {errors.nodeName.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Assigne
                  </label>
                  <input
                    {...register("assignee", {
                      required: "Assignee is required",
                    })}
                    className="form-control"
                  />
                  {errors.assignee && (
                    <p className="invalid-feedback d-block">
                      {errors.assignee.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register("duedate", {
                      required: "Due Date is required",
                      validate: (value) => {
                        // Custom date validation
                        const date = new Date(value);
                        const today = new Date();
                        if (isNaN(date.getTime())) {
                          return "Please enter a valid date";
                        }
                        if (date < today) {
                          return "Due Date cannot be in the past";
                        }
                        return true;
                      },
                    })}
                    className="form-control"
                  />
                  {errors.duedate && (
                    <p className="invalid-feedback d-block">
                      {errors.duedate.message}
                    </p>
                  )}
                </div>
                <input type="submit" className="btn btn-primary" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NodeForm;
