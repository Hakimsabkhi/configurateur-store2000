import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface OrderSummaryStatisticsProps {
  orders: {
    _id: string;
    selectedAddress: {
      name: String;
      surname: String;
    };
    orderNumber: string;
    totalAmount: number;
    status:
      | "en cours de traitement"
      | "expédiée"
      | "livrée"
      | "annulée"
      | "remboursée";
    selectedMethod: string;
    createdAt: string;
    deliveryCost: number;
  }[];
}

const OrderSummaryStatistics: React.FC<OrderSummaryStatisticsProps> = ({
  orders,
}) => {
  const [filter, setFilter] = useState<"day" | "month" | "year">("day");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handler for date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      switch (filter) {
        case "day":
          return (
            orderDate.getDate() === selectedDate.getDate() &&
            orderDate.getMonth() === selectedDate.getMonth() &&
            orderDate.getFullYear() === selectedDate.getFullYear()
          );
        case "month":
          return (
            orderDate.getMonth() === selectedDate.getMonth() &&
            orderDate.getFullYear() === selectedDate.getFullYear()
          );
        case "year":
          return orderDate.getFullYear() === selectedDate.getFullYear();
        default:
          return true;
      }
    });
  }, [orders, filter, selectedDate]);

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce(
      (total, order) => total + order.totalAmount + order.deliveryCost,
      0
    );
  }, [filteredOrders]);

  // Format the date to display it as a label
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Data for the Line Chart
  const chartData = {
    labels: filteredOrders.map((order) => formatDate(order.createdAt)), // Label each point with date
    datasets: [
      {
        label: "Revenue (€)",
        data: filteredOrders.map((order) => order.totalAmount + order.deliveryCost), // Data for each point
        borderColor: "rgba(54, 162, 235, 0.8)", // Line color
        backgroundColor: "rgba(54, 162, 235, 0.1)", // Area under the curve
        fill: true,
        tension: 0.3, // To smoothen the curve
        pointRadius: 4,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Revenu Filtré par ${filter}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (€)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Revenue</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("day")}
            className={`py-2 px-4 rounded-lg transition ${
              filter === "day"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Par Jour
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`py-2 px-4 rounded-lg transition ${
              filter === "month"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Par Mois
          </button>
          <button
            onClick={() => setFilter("year")}
            className={`py-2 px-4 rounded-lg transition ${
              filter === "year"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Par Année
          </button>
        </div>
      </div>

      <div className="mt-4">
        {filter === "day" && (
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500 transition"
          />
        )}
        {filter === "month" && (
          <input
            type="month"
            value={`${selectedDate.getFullYear()}-${(
              selectedDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`}
            onChange={handleDateChange}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500 transition"
          />
        )}
        {filter === "year" && (
          <input
            type="number"
            value={selectedDate.getFullYear()}
            min="2000"
            max={new Date().getFullYear()}
            onChange={handleDateChange}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border-indigo-500 transition"
          />
        )}

        <div className="mt-6">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Updated Revenue Display */}
        <p className="text-3xl font-bold text-indigo-600 mt-6">
          {totalRevenue.toFixed(2)}€ <span className="text-lg font-medium">Revenue</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummaryStatistics;
