import { createContext, Dispatch, SetStateAction } from 'react';

export interface NodeProperties {
  id?: string,
  nodeId?: string,
  nodeType?: string,
  isOpen: boolean
}

interface StateContextType {
    openNode: NodeProperties;
    setOpenNode: Dispatch<SetStateAction<NodeProperties>>;
  }

const NodeStateContext = createContext<StateContextType>({
    openNode: { isOpen: false},
    setOpenNode: () => {}
});
export default NodeStateContext;
