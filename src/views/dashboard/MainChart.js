import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { dotWave } from "ldrs";

dotWave.register();

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  ChartDataLabels
);

const MainChart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartLabels, setChartLabels] = useState([]);
  const [chartColors, setChartColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Error fetching ${url}:`, errorData);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorData}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalRegistrations = await fetchWithAuth(
          "http://197.232.170.121:8594/api/registrations/fullyapproved"
        );
        
        const totalFemales = totalRegistrations.filter(member => member.gender === "Female").length;
        const totalMales = totalRegistrations.filter(member => member.gender === "Male").length;
        const totalChildren = await fetchWithAuth("http://197.232.170.121:8594/api/registrations/holyCommunion");
        const totalCommunicants = await fetchWithAuth("http://197.232.170.121:8594/api/registrations/holyCommunion");

        const labels = [
          "Total Registrations",
          "Females",
          "Males",
          "Communicants",
          "Children",
        ];

        const dataValues = [
          totalRegistrations.length,
          totalFemales,
          totalMales,
          totalChildren.length,
          totalCommunicants,
        ];

        const colors = ["green", "blue", "#FFD300", "maroon", "purple"];

        setChartLabels(labels);
        setChartColors(colors);

        setBarChartData({
          labels,
          datasets: [
            {
              label: "Statistics",
              backgroundColor: colors,
              data: dataValues,
            },
          ],
        });

        setDoughnutChartData({
          labels,
          datasets: [
            {
              backgroundColor: colors,
              data: dataValues,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#000",
        },
      },
    },
    maintainAspectRatio: false,
  };

  const doughnutChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: "50px" }}>
        <l-dot-wave size="100" speed="1" color="blue" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", width: "65%" }}>
        <h3 style={{ textAlign: "center" }}>Bar Chart: Statistics Overview</h3>
        <div style={{ width: "100%", height: "400px" }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      <div style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", width: "30%" }}>
        <h3 style={{ textAlign: "center" }}>Section Breakdown</h3>
        <div style={{ width: "100%", height: "300px" }}>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h4>Key</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {chartLabels.map((label, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "15px", height: "15px", backgroundColor: chartColors[index], borderRadius: "50%" }}></span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainChart;
