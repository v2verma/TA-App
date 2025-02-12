import type { Node, BuiltInNode } from '@xyflow/react';

export type TaskInNode = Node<{ nodeID: string, nodeType: string, nodename: string, assignee: string, duedate: string }, 'task'>;
export type ConditionInNode = Node<{ nodeID: string, nodeType: string, nodename: string, assignee: string, duedate: string }, 'condition'>;
export type NotificationInNode = Node<{ nodeID: string, nodeType: string, nodename: string, assignee: string, duedate: string }, 'notification'>;
export type NodeCreatorInNode = Node<{ label?: string }, 'nodecreator'>;
export type AppNode = BuiltInNode | TaskInNode | ConditionInNode | NotificationInNode | NodeCreatorInNode;
