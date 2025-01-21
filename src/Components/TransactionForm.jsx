import { useState } from "react";

const TransactionForm = ({ onSubmit, defaultValues }) => {
  const [type, setType] = useState(defaultValues?.type || "income");
  const [amount, setAmount] = useState(defaultValues?.amount || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ type, amount: parseFloat(amount), description });
      }}
      className="p-4 sm:p-6 md:p-8 lg:p-10 bg-white shadow-md rounded w-full max-w-lg mx-auto"
    >
      {/* Type Field */}
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-bold mb-2">
          Type:
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      {/* Amount Field */}
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-bold mb-2">
          Amount:
        </label>
        <input
          type="number"
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the amount"
        />
      </div>
      {/* Description Field */}
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-bold mb-2">
          Description:
        </label>
        <textarea
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring focus:ring-green-300 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          rows={3}
        ></textarea>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white text-sm sm:text-base md:text-lg p-2 sm:p-3 rounded hover:bg-green-600 transition"
      >
        {defaultValues ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
