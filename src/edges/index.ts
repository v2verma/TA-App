import type { Edge, EdgeTypes } from '@xyflow/react';
import CustomEdge from './CustomEdge';

export const initialEdges: Edge[] = [];

export const edgeTypes = {
  'customEdge': CustomEdge
} satisfies EdgeTypes;
