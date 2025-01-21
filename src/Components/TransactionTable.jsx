import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid"; // Correct icons
import TransactionForm from "./TransactionForm";
import axios from "axios";

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5001/api/transactions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Add or Edit Transaction
  const handleTransactionSubmit = async (transaction) => {
    try {
      const token = localStorage.getItem("token");
      if (editTransaction) {
        // Edit Transaction
        await axios.put(
          `http://localhost:5001/api/transactions/${editTransaction._id}`,
          transaction,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add Transaction
        await axios.post(
          "http://localhost:5001/api/transactions",
          transaction,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setShowModal(false);
      setEditTransaction(null);
      fetchTransactions();
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  // Delete Transaction
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Open Edit Modal
  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setShowModal(true);
  };

  // Calculate Summary
  const calculateSummary = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  };

  const { income, expenses, balance } = calculateSummary();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Transaction Manager
      </h1>

      {/* Summary Section with Icons */}
      <div className="flex justify-around mb-8 bg-gray-100 p-4 rounded shadow">
        <div className="text-center">
          <CurrencyDollarIcon className="h-8 w-8 text-green-600 mb-2 inline-block" />
          <h2 className="text-lg font-semibold text-green-600">Total Income</h2>
          <p className="text-2xl font-bold">₹{income.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <MinusCircleIcon className="h-8 w-8 text-red-600 mb-2 inline-block" />
          <h2 className="text-lg font-semibold text-red-600">Total Expenses</h2>
          <p className="text-2xl font-bold">₹{expenses.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mb-2 inline-block" />
          <h2 className="text-lg font-semibold text-blue-600">Balance</h2>
          <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => {
            setEditTransaction(null);
            setShowModal(true);
          }}
        >
          <PlusIcon className="h-5 w-5 text-white inline-block mr-2" />
          Add Transaction
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.type}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ₹{transaction.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                {/* Edit Button with Icon */}
                <button
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mr-2"
                  onClick={() => handleEdit(transaction)}
                >
                  <PencilIcon className="h-5 w-5 text-white" />
                </button>

                {/* Delete Button with Icon */}
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(transaction._id)}
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for TransactionForm */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <TransactionForm
              onSubmit={handleTransactionSubmit}
              defaultValues={editTransaction}
            />
            <button
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDashboard;
