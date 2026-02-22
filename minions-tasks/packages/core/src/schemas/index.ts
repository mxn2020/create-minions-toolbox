/**
 * @module @minions-tasks/sdk/schemas
 * Custom MinionType schemas for Minions Tasks.
 */

import type { MinionType } from 'minions-sdk';

export const taskType: MinionType = {
  id: 'tasks-task',
  name: 'Task',
  slug: 'task',
  description: 'A unit of work to be executed.',
  icon: '⚡',
  schema: [
    { name: 'title', type: 'string', label: 'title' },
    { name: 'status', type: 'select', label: 'status' },
    { name: 'completed', type: 'boolean', label: 'completed' },
  ],
};

export const projectType: MinionType = {
  id: 'tasks-project',
  name: 'Project',
  slug: 'project',
  description: 'A project grouping multiple tasks.',
  icon: '📁',
  schema: [
    { name: 'name', type: 'string', label: 'name' },
    { name: 'owner', type: 'string', label: 'owner' },
    { name: 'deadline', type: 'string', label: 'deadline' },
  ],
};

export const customTypes: MinionType[] = [
  taskType,
  projectType,
];

