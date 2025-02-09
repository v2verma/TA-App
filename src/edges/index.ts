import type { Edge, EdgeTypes } from '@xyflow/react';
// import CustomEdge from './Cus';
import CEdge from './CEdge';

export const initialEdges: Edge[] = [];

export const edgeTypes = {
  'customEdge': CEdge
} satisfies EdgeTypes;
