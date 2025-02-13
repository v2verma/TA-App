import { useEffect, useState } from 'react'

export const NodeIdCell = ({ getValue, row }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<string>(initialValue);
  
    useEffect(() => {
        let finalValue = initialValue;
        if(row?.original?.type === 'task'){
            finalValue = `t${finalValue}`
        } else if(row?.original?.type === 'condition') {
            finalValue = `c${finalValue}`
        } else {
            finalValue = `n${finalValue}`
        }
      setValue(finalValue);
    }, [initialValue, row]);
    return (
      <div style={{width: '65px'}}>{value}</div>
    );
}
