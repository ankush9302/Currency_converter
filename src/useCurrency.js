import { useState, useEffect } from 'react';

function useCurrency(currency) {
  const [data, setData] = useState(null); // Initialize data as null to represent no data yet
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Define the async function to fetch currency data
    async function fetchCurrencyData() {
      try {
        setLoading(true); // Set loading to true before fetching data
        let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`;
        let response = await fetch(url); // Use await to fetch data
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
        let jsonData = await response.json(); // Convert response to JSON
        setData(jsonData[currency]); // Set the fetched data in state
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching currency data:', error); // Log any errors
        setError(error.message); // Set the error state
        setData(null); // Clear data if there's an error
      } finally {
        setLoading(false); // Set loading to false after fetching data or an error occurs
      }
    }

    fetchCurrencyData(); // Call the async function

  }, [currency]); // Run this effect whenever the currency changes

  return [data, loading, error]; // Return the fetched data, loading state, and any error
}

export default useCurrency;
