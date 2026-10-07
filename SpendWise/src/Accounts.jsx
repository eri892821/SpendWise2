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