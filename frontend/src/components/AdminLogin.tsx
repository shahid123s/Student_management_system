import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../utils/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, login } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(token)  navigate('/admin');
    },[navigate])

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast('Please fill in all fields');
                return;
            }
            const response = await adminAxiosInstance.post('/login', { email, password });

            const { accessToken, role, id } = response.data.data;
            if (role !== 'admin') {
                toast('Access denied: Admin credentials required');
                return;
            }
            login(accessToken, role, id);
            navigate('/admin');
        } catch (error) {
            console.error('Admin login failed', error);
            toast('Admin login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg animate-fade-in">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Login</h2>
                    <p className="text-sm text-gray-500">Sign in to your admin account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors"
                                placeholder="Enter your admin email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors"
                                placeholder="Enter your admin password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                    >
                        Sign in as Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;