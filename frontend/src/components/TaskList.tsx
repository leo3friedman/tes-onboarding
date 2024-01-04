import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then((result) => {
      if (result.success) {
        setTasks(Array.isArray(result?.data) ? result?.data : []);
      } else {
        alert(result.error);
      }
    });
  }, []);

  return (
    <div className={styles.listContainer}>
      <span className={styles.title}>{title}</span>
      <div className={styles.list}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
