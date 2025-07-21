import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0', '#FF6666'];

const IncomeChart = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  // Grupujemy przychody wg kategorii
  const incomes = transactions.filter(t => t.type === 'income');

  const data = incomes.reduce((acc, { category, amount }) => {
    const found = acc.find(item => item.name === category);
    if (found) {
      found.value += Number(amount);
    } else {
      acc.push({ name: category, value: Number(amount) });
    }
    return acc;
  }, []);

  if (data.length === 0) {
    return <p>Brak przychodów do wyświetlenia.</p>;
  }

  return (
    <div>
      <h2>Przychody wg kategorii</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default IncomeChart;
