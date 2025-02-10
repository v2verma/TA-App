import type { Node, BuiltInNode } from '@xyflow/react';

export type TaskInNode = Node<{ label: string, taskName: string, assignee: string, date: string }, 'task'>;
export type ConditionInNode = Node<{ label: string }, 'condition'>;
export type NotificationInNode = Node<{ label: string }, 'notification'>;
export type NodeCreaterInNode = Node<{ label?: string }, 'nodecreater'>;
export type AppNode = BuiltInNode | TaskInNode | ConditionInNode | NotificationInNode | NodeCreaterInNode;
