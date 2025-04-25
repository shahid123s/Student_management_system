

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Student } from '../types';
import { axiosInstance } from '../utils/axios';

const StudentDashboard = () => {
  const { token, userId, logout } = useAuth();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>({
    id: '1',
    name: 'Shahid Noushad', 
    email: 'shahid@example.com',
    className: '12A',
    rollNo: '101',
    marks: 87,
    dob: '2002-05-14'
  });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchStudent();
    }
  }, [token, navigate]);

  const fetchStudent = async () => {
    try {
      const response = await axiosInstance.get(`/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(response.data.data);
      setFormData({ ...formData, email: response.data.email });
    } catch (error) {
      console.error('Failed to fetch student', error);
      // logout();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/student/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Updated successfully');
      setShowModal(false);
      fetchStudent();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  if (!student) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 border rounded">
            <p className="font-medium">Name: {student.name}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="font-medium">Email: {student.email}</p>
          </div>
          
          <div className="p-4 border rounded">
            <p className="font-medium">Class: {student.className}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="font-medium">Roll Number: {student.rollNo}</p>
          </div>
          <div className="p-4 border rounded">
            <p className="font-medium">Marks: {student.marks}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Credentials
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Credentials</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">New Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
