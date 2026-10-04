import {useState} from "react"

const money = (n) =>
    new Intl.NumberFormat ('en-ZA', { style : 'currency' , currency : 'ZAR'}) . format(n)
const ICONS = { 

    checking: "fa-solid fa-wallet", 
    savings: "fa-solid fa-piggy-bank", 
    credit: "fa-solid fa-credit-card"
 }
