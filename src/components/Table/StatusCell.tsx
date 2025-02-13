import { useEffect, useState } from 'react'
import './Status.css'

export const StatusCell = ({ getValue, row }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<string>(initialValue);

    const getStatus = (date: string) => {
        if(date){
            const dateArr = date.split("-");
            const inputDate = new Date('"' + dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2] + '"').setHours(0, 0, 0, 0);
            
            const toDay = new Date().setHours(0, 0, 0, 0);
            
            if(inputDate > toDay){
                return "In Progress"
            }else{
                return "Past Due"
            }
        } else {
            return ""
        }
    }
  
    useEffect(() => {
        const finalValue = getStatus(initialValue);
        setValue(finalValue);
    }, [initialValue, row]);
    return (
      <div className={`${value?.split(" ")[1]?.toLowerCase()}-status`}>{value}</div>
    );
}
