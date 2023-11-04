import React, { useState, useEffect } from 'react';
require('dotenv').config();

const TestComponent = () => {
    const [responseData, setResponseData] = useState(null);
  
    useEffect(() => {
console.log(`${process.env.API_URL}/test`)

      const fetchTestData = async () => {

        fetch(`${process.env.API_URL}/test`)
.then(response => response.json())
.then(data => {
  console.log('Received JSON:', data);
})
.catch(error => console.error('Error fetching data:', error));

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