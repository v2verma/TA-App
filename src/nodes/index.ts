import type { NodeTypes } from '@xyflow/react';
import { AppNode } from './types';
import { TaskNode } from './TaskNode';
import { ConditionNode } from './ConditionNode';
import { NotificationNode } from './NotificationNode';
import NodeCreater from './NodeCreater';

export const initialNodes: AppNode[] = [
  {
    id: "0",
    data: {},
    position: { x: 500, y: -600 },
    type: "nodecreater"
  },
  { id: "1",
    position: { x: 100, y: -200 },
    data: { label: 'Task', assignee: '', date: '', taskName: '' } ,
    type: 'task',
  },
  { id: "2",
    position: { x: 200, y: -100 },
    data: { label: 'Condition' } ,
    type: 'condition',
  },
  { id: "3",
    position: { x: 300, y: -300 },
    data: { label: 'Notification' } ,
    type: 'notification',
  },
];

export const nodeTypes = {
  'task': TaskNode,
  'condition': ConditionNode,
  'notification': NotificationNode,
  'nodecreater': NodeCreater
} satisfies NodeTypes;
