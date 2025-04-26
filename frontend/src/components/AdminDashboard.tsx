

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Student } from '../types';
import { adminAxiosInstance } from '../utils/axios';
import { toast } from 'sonner';

type StudentCreate = Omit<Student, 'id'>;

const AdminDashboard = () => {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();
    const [students, setStudents] = useState<Student[]>([
        {
            id: '1',
            name: 'Shahid Noushad',
            email: 'shahid@example.com', 
            dob: '2002-05-14',
            className: '12A',
            rollNo: '101',
            marks: 87,
            
        },
        {
            id: '2', 
            name: 'Nithu Roban',
            email: 'nithu@example.com',
            dob: '2002-08-21',
            className: '12B',
            rollNo: '102',
            marks: 92,
        },
        {
            id: '3',
            name: 'Arya Krishnan',
            email: 'arya@example.com',
            dob: '2002-03-30',
            className: '12A',
            rollNo: '103',
            marks: 78,
        },
        {
            id: '4',
            name: 'Rahul Dev',
            email: 'rahul@example.com',
            dob: '2002-11-09',
            className: '12C',
            rollNo: '104',
            marks: 95,
        },
    ]);
    const [newStudent, setNewStudent] = useState<StudentCreate>({
        name: '',
        email: '',
        dob: '',
        className: '',
        rollNo: '',
        marks: 0
    });
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        if (!token || role !== 'admin') navigate('/admin/login');
        else fetchStudents();
    }, [token, role, navigate]);

    const fetchStudents = async () => {
        try {
            const response = await adminAxiosInstance.get('/students', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(response.data.data);
        } catch (error) {
            console.error('Failed to fetch students', error);
            logout();
            navigate('/login');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Creating student:', newStudent);
            await adminAxiosInstance.post('/student-create', newStudent, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewStudent({
                name: '',
                email: '',
                dob: '',
                className: '',
                rollNo: '',
                marks: 0,
                password: '',
            });
            setShowCreateModal(false);
            fetchStudents();
        } catch (error) {
            console.error('Create failed', error);
            toast('Create failed');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStudent) return;
        try {
            await adminAxiosInstance.put(`/student-update`, {
                className: editingStudent.className,
                rollNo : editingStudent.rollNo,
                marks: editingStudent.marks,
                id :editingStudent.id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Update failed', error);
            toast('Update failed');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await adminAxiosInstance.delete(`/student-delete/`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { id }
            });
            fetchStudents();
        } catch (error) {
            console.error('Delete failed', error);
            toast('Delete failed');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>

            <button
                onClick={() => setShowCreateModal(true)}
                className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Create New Student
            </button>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Create New Student</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newStudent.email}
                                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={newStudent.dob}
                                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value, password: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                <input
                                    type="text"
                                    value={newStudent.className}
                                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                                <input
                                    type="text"
                                    value={newStudent.rollNo}
                                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                                <input
                                    type="number"
                                    value={newStudent.marks}
                                    onChange={(e) => setNewStudent({ ...newStudent, marks: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">dob</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.className}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.marks}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                    <button
                                        onClick={() => setEditingStudent(student)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingStudent && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input
                                type="text"
                                value={editingStudent.className}
                                onChange={(e) => setEditingStudent({ ...editingStudent, className: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                            <input
                                type="text"
                                value={editingStudent.rollNo}
                                onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                            <input
                                type="number"
                                value={editingStudent.marks}
                                onChange={(e) => setEditingStudent({ ...editingStudent, marks: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2 flex space-x-3">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingStudent(null)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
