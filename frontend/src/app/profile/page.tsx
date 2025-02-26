'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// This would normally come from an API call
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  orders: [
    {
      id: '1',
      date: '2024-02-26',
      total: 420,
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Oversized Fit Cotton T-shirt',
          price: 190,
          quantity: 1,
          image: '/products/tshirt.jpg',
        },
        {
          id: '2',
          name: 'Button-detail Jacket',
          price: 230,
          quantity: 1,
          image: '/products/jacket.jpg',
        },
      ],
    },
  ],
  addresses: [
    {
      id: '1',
      type: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  const handleSaveProfile = async () => {
    // Here you would normally save the profile data to the backend
    setIsEditing(false);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'addresses'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Addresses
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="mt-10 lg:col-span-9 lg:mt-0">
            {/* Orders */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Order History</h2>
                <div className="mt-6 space-y-8">
                  {userData.orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                    >
                      <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-7">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              Order #{order.id}
                            </h3>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            Status: {order.status}
                          </div>
                          <div className="mt-4 space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="h-20 w-20 flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                  />
                                </div>
                                <div className="ml-4 flex-1">
                                  <div className="font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="mt-1 text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </div>
                                </div>
                                <div className="ml-4 text-sm font-medium text-gray-900">
                                  ${item.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 lg:col-span-5 lg:mt-0">
                          <dl className="grid grid-cols-2 gap-x-6 text-sm">
                            <div>
                              <dt className="font-medium text-gray-900">Total Amount</dt>
                              <dd className="mt-1 text-gray-500">${order.total}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                  >
                    Add New Address
                  </button>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {userData.addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {address.type}
                        </h3>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Edit
                        </button>
                      </div>
                      <div className="mt-4 space-y-1 text-sm text-gray-500">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                <form className="mt-6 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={userData.name}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userData.email}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                  {isEditing && (
                    <div className="flex justify-end gap-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 