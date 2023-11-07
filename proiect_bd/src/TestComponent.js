import React, { useState, useEffect } from 'react';

const TestComponent = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // console.log(`${process.env.REACT_APP_API_URL}/test`);

      const fetchTestData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/test`);
          if (response.ok) {
            const data = await response.json();
            setResponseData(data);
          } else {
            const errorData = await response.text();
            setError(errorData);
          }
        } catch (error) {
          console.log("E bun");
          console.log(error);
          // console.error('Error fetching data:', error);
          // setError('Failed to fetch data.');
        }
      };
  
      fetchTestData();

      console.log();
    }, []);
  
    return (
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : responseData ? (
          <div>
            <p>Test data received from backend:</p>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default TestComponent;