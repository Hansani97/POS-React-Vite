import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
// defaults.responsive=true;
defaults.plugins.title.display = true;

const DefaultChart = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: 'Data',
                data: [65, 59, 80, 81, 56, 55, 40, 54, 34, 23, 87, 15],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1, // Adjust this for curve smoothness
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line
                data={data}
                options={options}
            />
        </div>
    );
};

export default DefaultChart;
