/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.scss';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import { storageKey } from './constants/constants';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    
    const [allEntries, setEntries]= React.useState([]);

    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry: IEntry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = [...existingTasks, entry];
            window.localStorage.setItem(storageKey, JSON.stringify(newTasks));
        } else {
            window.localStorage.setItem(storageKey, JSON.stringify([entry]));
        }
        closeEntrySheet();
    };
    
    const onDeleteTask=( id: number)=>{
      const existingTasksString = window.localStorage.getItem(storageKey);
      if (existingTasksString) {
          const existingTasks = JSON.parse(existingTasksString);
          existingTasks.forEach((entry: IEntry, index: number) => {
            if(id === entry.id){
              existingTasks.splice(index, 1);
            }
          });
          window.localStorage.setItem(storageKey, JSON.stringify(existingTasks));
          setEntries(existingTasks);
      } 
    };

    const getTaskEntries = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        return entries;
    };

    const entries = getTaskEntries(); 

    return (
        <div className="app-container">
            <h1>Timesheet</h1>
            {entries.length > 0 ? (
              <div>
              <ProgressBar entries={entries}/>
                <TaskList entries={entries} onDeleteTask={onDeleteTask} key={Date.now()}/>
                </div>
            ) : (
                <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
            )}
            <button id="add-entry-btn" className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
