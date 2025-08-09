import React from 'react';
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
];

const SalesChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Sales Overview</h2>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#006FEE" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default SalesChart;