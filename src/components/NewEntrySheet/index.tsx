/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * NewEntrySheet Component - Renders action sheet for adding new entry.
 */
import * as React from 'react';
import './styles.scss';
import crossIcon from '../../assets/cross-icon.svg';
import { Button } from '../Button';
import { taskTypes } from '../../constants/constants';

interface INewEntrySheet {
    onClose: () => void;
    onAdd: (entry: IEntry) => void;
}

export interface IEntry {
    task: string;
    hours: string;
    minutes: string;
    remark: string;
    id: number;
}

export const NewEntrySheet: React.FC<INewEntrySheet> = (props: INewEntrySheet) => {
    const [task, setTask] = React.useState(taskTypes[0]);
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [remark, setRemark] = React.useState('');
    const [btnColor, setBtnColor]= React.useState('disabled');
    // const [id, setId]= React.useState(0);

    const onTaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTask(event.target.value);
    };

    const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.value)
      setBtnColor('primary');
      else
      setBtnColor('disabled');
        setHours(event.target.value);
    };

    const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.value)
      setBtnColor('primary');
      else
      setBtnColor('disabled');
        setMinutes(event.target.value);
    };
    
    const onRemarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRemark(event.target.value);
    }
    // Added Key
    const onAddEntry = () => {
        // setKey(key+1);
        if(task && 
          ((!isNaN(parseInt(hours)) && parseInt(hours)>=0 && parseInt(hours)<=24) || (!isNaN(parseInt(minutes)) && parseInt(minutes)>=0 && parseInt(minutes)<=60)) &&
        (parseInt(minutes) || parseInt(hours))){
          // setId(Date.now());
          let id=Date.now();
          const entry: IEntry = { id, task, hours, minutes, remark };
          props.onAdd(entry);
        }
    };

    return (
        <div className="new-entry-sheet">
            <div className="sheet-header">
                <div className="sheet-title">
                    <span className="title">Add New Entry</span>
                </div>
                <button className="close-sheet-btn" onClick={props.onClose} autoFocus>
                    <img src={crossIcon} alt="close" className="close-icon" />
                </button>
            </div>
            <div className="sheet-body">
                <div className="row">
                    <label className="task-input">
                        Task Type
                        <select className="task-select" onChange={onTaskChange} value={task}>
                            {taskTypes.map((task: string, index) => (
                                <option value={task} key={index}>{task}</option>
                            ))}
                        </select>
                    </label>
                    <label className="time-input">
                        Time Spent
                        <div className="time-input-fields">
                          <div className="hour-field">
                                <input
                                    type="number"
                                    placeholder="hours"
                                    className="hour-input"
                                    onChange={onHoursChange}
                                    value={hours}
                                />
                                <span className="time-indicator">h</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="minutes"
                                    className="minute-input"
                                    onChange={onMinutesChange}
                                    value={minutes}
                                />
                                <span className="time-indicator">m</span>
                            </div>
                        </div>
                    </label>
                  </div>
                  <div className="column">
                    <label className="remark-input">
                      Remarks:
                        <input 
                        type="textarea" 
                        className="remark-input-field" 
                        onChange={onRemarkChange}
                        value={remark}
                        />
                    </label>
                  </div>
                    
                
            </div>
            <div className="sheet-footer">
                <div className="action-group">
                    <Button id="submit-task-button" color={btnColor} onClick={onAddEntry}>
                        Add Entry
                    </Button>
                </div>
            </div>
        </div>
    );
};
