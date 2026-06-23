import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { CATEGORIES, COLORS } from '@/constants';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CategoryChart({ expenses }) {
  const { theme } = useTheme();

  if (!expenses || expenses.length === 0) {
    return <p className="empty-state">📊 চার্ট দেখানোর জন্য ডেটা নেই</p>;
  }

  const isDark = theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#0f172a';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  const data = {
    labels: CATEGORIES,
    datasets: [
      {
        label: 'খরচ (টাকা)',
        data: CATEGORIES.map((cat) =>
          expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0)
        ),
        backgroundColor: COLORS,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}