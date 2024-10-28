import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const WardOrderChart = () => {
  const [receivedOrders, setReceivedOrders] = useState(20);
  const [totalOrders, setTotalOrders] = useState(25);
  const pendingOrders = totalOrders - receivedOrders;

  const data = [
    { name: 'Received', value: receivedOrders },
    { name: 'Pending', value: pendingOrders },
  ];

  const COLORS = ['#FFBB28', '#E0E0E0'];

  return (
    <div>
      <h3>Ward Order Updates</h3>
      <p>{receivedOrders} of the {totalOrders} ward orders have been received</p>
     
     <br>
     </br>
      <div style={{ position: 'fixed', width: '100%', height: 200 }}>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            innerRadius={68}
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
             label={({ name, value }) => (name === 'Received' ? `${value}` : null)}
             startAngle={90}
             endAngle={-270}
             
             cornerRadius={10}
             strokeWidth={2} 
             stroke="fff"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          color: '#004080',
          fontWeight: 'bold'
        }}>
          {totalOrders} {/* This will show "10" as the pending orders */}
        </div>
      </div>
    </div>
  );
};

export default WardOrderChart;
