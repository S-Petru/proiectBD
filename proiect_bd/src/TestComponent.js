import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/test`);
        if (response.ok) {
          const data = await response.json();
          setResponseData(data);
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
