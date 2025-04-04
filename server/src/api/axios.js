import axiosInstance from './api/axios';  // Adjust the path based on where your components are located

// Example usage
axiosInstance.get('/users') // Make a GET request to http://localhost:3002/api/users
  .then(response => console.log(response))
  .catch(error => console.error(error));
