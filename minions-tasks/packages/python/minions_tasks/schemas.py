"""
Minions Tasks SDK — Type Schemas
Custom MinionType schemas for Minions Tasks.
"""

from minions.types import FieldDefinition, FieldValidation, MinionType

task_type = MinionType(
    id="tasks-task",
    name="Task",
    slug="task",
    description="A unit of work to be executed.",
    icon="⚡",
    schema=[
        FieldDefinition(name="title", type="string", label="title"),
        FieldDefinition(name="status", type="select", label="status"),
        FieldDefinition(name="completed", type="boolean", label="completed"),
    ],
)

project_type = MinionType(
    id="tasks-project",
    name="Project",
    slug="project",
    description="A project grouping multiple tasks.",
    icon="📁",
    schema=[
        FieldDefinition(name="name", type="string", label="name"),
        FieldDefinition(name="owner", type="string", label="owner"),
        FieldDefinition(name="deadline", type="string", label="deadline"),
    ],
)

custom_types: list[MinionType] = [
    task_type,
    project_type,
]

