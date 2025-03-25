import React, { useEffect } from 'react';
import axios from "axios"; 


export default function Data() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/portfolios?id=1"); 
        const data = JSON.stringify(response.data)
        localStorage.setItem("data",data)
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };

    fetchData(); 
  }, []); 
}
