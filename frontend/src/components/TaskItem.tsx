import React, { useState } from "react";
import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import { updateTask } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    if (isLoading) return;
    setLoading(true);
    const newTask = { ...task, isChecked: !task?.isChecked };
    updateTask(newTask).then((result) => {
      if (result.success) {
        setTask(result.data);
      } else {
        alert(result.error);
      }
      setLoading(false);
    });
  };

  return (
    <div className={styles.item}>
      <CheckButton checked={task?.isChecked} onPress={handleToggleCheck} />
      <div
        className={
          task?.isChecked ? styles.textContainer + " " + styles.checked : styles.textContainer
        }
      >
        <span className={styles.title}>{task?.title}</span>
        {task?.description && <span>{task.description}</span>}
      </div>
    </div>
  );
}
