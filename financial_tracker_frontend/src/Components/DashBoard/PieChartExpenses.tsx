import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import { ChartOptions } from 'chart.js'; // Import ChartOptions
import './PieChartExpenses.css'; // Import the CSS file

Chart.register(ChartDataLabels);

interface Transaction {
    user: number;
    account: number;
    amount: number;
    date: string;
    description: string;
    category_name: string;
    transaction_type_name: string;
}

interface PieChartExpensesProps {
    transactions: Transaction[];
}

const PieChartExpenses: React.FC<PieChartExpensesProps> = ({ transactions }) => {
    // Filter transactions to include only those with transaction_type_name == 'expense'
    const expenseTransactions = transactions.filter(t => t.transaction_type_name === 'expense');
    // Check if transactions are empty
    const isEmpty = expenseTransactions.length === 0;

    const data = {
        labels: isEmpty ? ['No Data'] : expenseTransactions.map(t => t.category_name),
        datasets: isEmpty ? [{
            data: [0], // Ensure data is an array of numbers
            backgroundColor: ['#E0E0E0'] // Use a valid color for grey
        }] : [{
            data: expenseTransactions.map(t => t.amount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    const options: ChartOptions<'doughnut'> = {
        plugins: {
            tooltip: {
                enabled: false, // Disable the default tooltip
                external: function (context) {
                    // Tooltip Element
                    const tooltipEl = document.getElementById('chart-tooltip');

                    // Hide if no tooltip
                    if (context.tooltip.opacity === 0) {
                        tooltipEl.style.display = 'none';
                        return;
                    }

                    // Set Text
                    if (context.tooltip.body) {
                        const tooltipModel = context.tooltip;
                        const dataIndex = tooltipModel.dataPoints[0].dataIndex;
                        const datasetIndex = tooltipModel.dataPoints[0].datasetIndex;
                        const labels = context.chart.data.labels;
                        const datasets = context.chart.data.datasets;
        
                        if (labels && datasets) {
                            const category = labels[dataIndex];
                            const value = datasets[datasetIndex].data[dataIndex];
                            tooltipEl.innerHTML = `<strong>${category}</strong><br>${value}`;
                        }
                    }

                    // Display and position the tooltip
                    const chart = context.chart;
                    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                    tooltipEl.style.display = 'block';
                    tooltipEl.style.left = `${centerX}px`;
                    tooltipEl.style.top = `${centerY}px`;
                    tooltipEl.style.transform = 'translate(-50%, -50%)';
                }
                
            },
            datalabels: {
                display: false // Disable data labels
            }
        },
        cutout: '50%',
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container">
            <Doughnut data={data} options={options} />
            <div id="chart-tooltip"></div>
        </div>
    )
};

export default PieChartExpenses;