import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';

function Profile() {
  const userid = localStorage.getItem("userID") || "6617bc2ecf757dfbbdaed2f8";
  const [user, setUser] = useState({});
  const [password_old, setPasswordOld] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    gender: '',
    DOB: ''
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await fetch("https://olumsx-backend-deploy-new.vercel.app/api/user/getuserbyid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ UserID: userid })
      });
      const userData = await response.json();
      setUser(userData);
      setFormData({
        password: '', // Presumably not fetched for security reasons
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        address: userData.address || '',
        gender: userData.gender || '',
        DOB: userData.DOB || ''
      });
      setPasswordOld(userData.password);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedFormData = { ...formData, userID: userid };
      updatedFormData.password = password_old;

      const response = await fetch('https://olumsx-backend-deploy-new.vercel.app/api/user/updateuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });
      const responseData = await response.json();
      if (response.ok) {
        getUserDetails();
        setEditMode(false);
      } else {
        alert(`Failed to update profile: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      //   alert('Failed to update profile. Check console for more information.');
    }
  };

  return (
    <>
      <Navbar />

      <div className='pt-16'></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {editMode ? (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">*First Name:</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">*Last Name:</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">*Address:</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">*Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">*Date of Birth:</label>
                <input type="date" name="DOB" value={formData.DOB} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <button onClick={() => setEditMode(false)} className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Go Back</button>
                <button onClick={handleUpdateProfile} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Save</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2 className="text-2xl font-bold text-gray-900 col-span-full">User Details</h2>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-600">Account Info</h3>
              <div className="flex items-center space-x-2">
                <i className="fas fa-user text-blue-500"></i>
                <strong>Username:</strong>
                <span>{user.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-green-500"></i>
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-600">Personal Details</h3>
              <div className="flex items-center space-x-2">
                <i className="fas fa-signature text-purple-500"></i>
                <strong>First Name:</strong>
                <span>{user.first_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-signature text-purple-500"></i>
                <strong>Last Name:</strong>
                <span>{user.last_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-venus-mars text-red-500"></i>
                <strong>Gender:</strong>
                <span>{user.gender}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-birthday-cake text-yellow-500"></i>
                <strong>Date of Birth:</strong>
                <span>{user.DOB}</span>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-600">Location</h3>
              <div className="flex items-center space-x-2">
                <i className="fas fa-home text-green-500"></i>
                <strong>Address:</strong>
                <span>{user.address}</span>
              </div>
            </div>

            <div className="col-span-full flex justify-end pt-4">
              <button onClick={() => setEditMode(true)} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Update Profile</button>
            </div>
          </div>

        )}
      </div>
    </>

  );
}

export default Profile;
