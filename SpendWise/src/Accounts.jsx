import { useState } from "react";

const money = (n) => {
  const value = Number(n) || 0;
  const formatter = Math.abs(value)
    .toLocaleString("en-ZA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(/\u0000/g, "");

  return value < 0 ? `-Rs${formatter}` : formatter;
};

const Account_Types = [
    {value: 'savings', label : 'Savings Account'},
    {value: 'credit' , label : 'Credit Account'},
    {value: 'cash', label : 'Cash Account'},
    {value: 'investment', label : 'Investment Account'}
];

const typeLabel = (value) => Account_Types.find((type) => type.value === value)?.label || "Unknown";

const initialAccounts = [
  { id: 1, name: "Savings Account", type: "savings", balance: 1000 },
  { id: 2, name: "Credit Account", type: "credit", balance: -500 },
  { id: 3, name: "Cash Account", type: "cash", balance: 200 },
];

const emptyForm = { name: "", type: "savings", balance: 0 };

const create =async (a) => {
  const res =await AddAccount(a);
  if (res.ok) {setNotice (`"${a.name}" was added.`); setError(''); }
  return res; 
};