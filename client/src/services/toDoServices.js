import axios from 'axios';
import { getUserDetails } from '../util/GetUser';  // Import getUserDetails

const SERVER_URL = 'http://localhost:5000/api/todo';

// Helper function to get token and attach it to headers
const authHeaders = () => {
  let userToken = getUserDetails()?.token; // Use getUserDetails to fetch the token
  return { headers: { Authorization: `Bearer ${userToken}` } };  // Add 'Bearer ' prefix to token
};

// Create a new ToDo task
const createToDo = (data) => {
  return axios.post(`${SERVER_URL}/create-to-do`, data, authHeaders());
};

// Fetch all ToDo tasks for a specific user
const getAllToDo = (userId) => {
  return axios.get(`${SERVER_URL}/get-all-to-do/${userId}`, authHeaders());
};

// Delete a specific ToDo task
const deleteToDo = (id) => {
  return axios.delete(`${SERVER_URL}/delete-to-do/${id}`, authHeaders());
};

// Update a specific ToDo task
const updateToDo = (id, data) => {
  return axios.patch(`${SERVER_URL}/update-to-do/${id}`, data, authHeaders());
};

// Export all ToDo service functions
const ToDoServices = {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;
