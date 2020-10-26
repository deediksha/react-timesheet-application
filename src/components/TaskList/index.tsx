/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';

interface ITaskListProps {
    entries: IEntry[];
    onDeleteTask: (id: number)=>void;
    key: number;
}
interface ITaskCardProps {
    entry: IEntry;
    onDeleteTask: (id: number)=>void;
    key: number;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { entries, onDeleteTask, key} = props;
    
    return (
        <div className="task-list">
            {entries.map((entry: IEntry) => (
                <TaskCard entry={entry} onDeleteTask={onDeleteTask} key={key}/>
            ))}
        </div>
    );
};

const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
  
    const {
        entry,
        onDeleteTask,
        key
    } = props;
    
    const {id, task, hours, minutes, remark}= entry;
    return (
        <div className="task-card" key={key}>
          <button className="delete-task-btn" onClick={()=>onDeleteTask(id)} ><img src="/static/media/cross-icon.3aaac615.svg" alt="close" className="delete-icon"></img></button>
          <div className="task-header">
            <div className="task-title">{task}</div>
            <div className="task-time">{`${hours}h ${minutes}m`}</div>
          </div>
          <div className="task-content">
            <p>{remark}</p>
          </div>
        </div>
    );
};
