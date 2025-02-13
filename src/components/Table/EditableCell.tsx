import React, { useEffect, useState } from "react";

export const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState<string>(initialValue);

  const handleOnBlur = () =>{
	table.options?.meta?.updateData(row.index, column.id, value)
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <input
		type="text"
		className="form-control form-control-sm"
		disabled={false}
		style={{ width: "95px" }}
		value={value}
		onChange={(e) => setValue(e.target.value)}
		onBlur={handleOnBlur}
    />
  );
};
