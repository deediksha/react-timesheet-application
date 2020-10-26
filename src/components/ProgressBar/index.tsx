import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';

interface ITaskListProps {
    entries: IEntry[];
}

export const ProgressBar: React.FC<ITaskListProps> = (props: ITaskListProps) => {
  const { entries } = props;
  
  
  let totalMinutes= 0;
  entries.forEach((entry)=>{
    const hours=parseInt(entry.hours);
    const minutes=parseInt(entry.minutes);
    if(!isNaN(hours))
      totalMinutes += hours*60;
    if(!isNaN(minutes))
      totalMinutes += minutes;
  });
  const progressWidth= ((totalMinutes/60)/8)*100 > 100 ? 100 : ((totalMinutes/60)/8)*100;
  
  let progressColor='';
  if(progressWidth>= 100){
  progressColor="green";
  }
  else if(progressWidth>=50) 
  progressColor="orange";
  else
  progressColor="red";
  
  return (
  <div className="progressbar">
    <div className="fill-progress" style={{ width: `${progressWidth}%`, backgroundColor: `${progressColor}` }}></div>
  </div>
  );
}