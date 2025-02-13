import type { NodeTypes } from '@xyflow/react';
import { AppNode } from './types';
import NodeCreator from './NodeCreator';
import { CustomNode } from './CustomNode';

export const initialNodes: AppNode[] = [
  {
    id: "0",
    data: {},
    position: { x: 500, y: -600 },
    type: "nodecreator"
  },
  { id: "1",
    position: { x: 100, y: -200 },
    data: { nodeID: '1', nodeType: 'task', assignee: 'xyz', duedate: '2025-02-10', nodename: 'Task' } ,
    type: 'task',
  },
  { id: "2",
    position: { x: 200, y: -100 },
    data: { nodeID: '1', nodeType: 'condition', assignee: 'abc', duedate: '', nodename: 'Condition' } ,
    type: 'condition',
  },
  { id: "3",
    position: { x: 300, y: -300 },
    data: { nodeID: '1', nodeType: 'notification', assignee: 'pqr', duedate: '', nodename: 'Notification' } ,
    type: 'notification',
  },
];

export const nodeTypes = {
  'task': CustomNode,
  'condition': CustomNode,
  'notification': CustomNode,
  'nodecreator': NodeCreator
} satisfies NodeTypes;
