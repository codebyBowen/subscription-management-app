'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Subscription } from '@/components/calendar/SubscriptionCalendar';

interface AddSubscriptionModalProps {
  onClose: () => void;
  onAdd: (subscription: Subscription) => void;
}

interface FormData {
  name: string;
  price: string;
  startDate: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  logo: string | null;
}

export default function AddSubscriptionModal({ onClose, onAdd }: AddSubscriptionModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    startDate: new Date().toISOString().split('T')[0],
    frequency: 'monthly',
    logo: null
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 创建一个临时URL用于预览
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      
      // 在实际应用中，这里可能需要上传到服务器或转换为base64
      // 简化起见，我们直接使用预览URL
      setFormData({
        ...formData,
        logo: previewUrl
      });
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 创建新的订阅对象
    const newSubscription: Subscription = {
      id: Date.now().toString(), // 临时ID
      name: formData.name,
      price: `$${formData.price}`,
      startDate: formData.startDate,
      frequency: formData.frequency,
      logo: formData.logo
    };
    
    onAdd(newSubscription);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Subscription</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Subscription Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="frequency">
              Billing Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="logo-upload">
              Logo (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <label 
                htmlFor="logo-upload"
                className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                Choose File
              </label>
              
              {logoPreview && (
                <div className="relative w-10 h-10">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 