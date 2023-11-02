import React from "react";

export interface DataItem {
  title: string | React.JSX.Element;
  value: string | React.JSX.Element[];
}

interface Props {
  data: DataItem[];
}

export function ResponsiveTable({ data }: Props): React.JSX.Element {
  return (
    <div className="responsive-table">
      {data.map((item, index) => (
        <div key={index} className="table-row">
          <div className={`title-table`}>{item.title}</div>
          <div className="table-column">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
