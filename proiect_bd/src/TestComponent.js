import React, { useState, useEffect } from 'react';

const TestComponent = () => {
    const [responseData, setResponseData] = useState(null);
  
    useEffect(() => {
      const fetchTestData = async () => {
        try {
          const response = await fetch(`${process.env.API_URL}/test`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setResponseData(data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      };
  
      fetchTestData();
    }, []);
  
    return (
      <div>
        {responseData && (
          <div>
            <p>Test data received from backend:</p>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
  
  export default TestComponent;