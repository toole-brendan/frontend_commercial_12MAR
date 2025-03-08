import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const AddItemSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  itemCode: z.string().min(2, { message: 'Item code is required' }),
  description: z.string().optional(),
  quantity: z.string().min(1, { message: 'Quantity is required' }),
  unit: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
});

type AddItemFormData = z.infer<typeof AddItemSchema>;

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  categories: string[];
  locations: string[];
}

export default function AddItemModal({ 
  isOpen, 
  onClose,
  onSuccess,
  categories,
  locations
}: AddItemModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<AddItemFormData>({
    resolver: zodResolver(AddItemSchema),
    defaultValues: {
      name: '',
      itemCode: '',
      description: '',
      quantity: '',
      unit: '',
      category: categories[0] || '',
      location: locations[0] || '',
    }
  });

  const onSubmit = async (data: AddItemFormData) => {
    setIsSubmitting(true);
    
    try {
      // Format the data according to the API expectations
      const inventoryItem = {
        id: data.itemCode,
        name: data.name,
        description: data.description || '',
        category: data.category,
        location: data.location,
        quantity: data.quantity,
        unit: data.unit || 'pcs',
        status: "In Stock",
        lastUpdated: new Date().toISOString()
      };
      
      // Use the second parameter overload of apiRequest that accepts options
      await apiRequest<any>('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventoryItem)
      } as RequestInit);
      
      toast({
        title: 'Success',
        description: 'Item has been added to inventory',
      });
      
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error adding inventory item:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to inventory',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="p-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Inventory</div>
            <h2 className="text-xl font-light text-gray-900 dark:text-white">Add New Item</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div className="space-y-4">
            {/* Item Name */}
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Item Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter item name"
              />
              {errors.name && (
                <div className="mt-1 flex items-center text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.name.message}</span>
                </div>
              )}
            </div>
            
            {/* Item Code */}
            <div>
              <label htmlFor="itemCode" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Item Code
              </label>
              <input
                id="itemCode"
                type="text"
                {...register('itemCode')}
                className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                placeholder="Enter item code"
              />
              {errors.itemCode && (
                <div className="mt-1 flex items-center text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.itemCode.message}</span>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 min-h-[80px] resize-y"
                placeholder="Enter item description"
              />
            </div>
            
            {/* Quantity and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  {...register('quantity')}
                  className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                  placeholder="0"
                />
                {errors.quantity && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>{errors.quantity.message}</span>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="unit" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  {...register('unit')}
                  className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 font-mono"
                  placeholder="pcs"
                />
              </div>
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Category
              </label>
              <select
                id="category"
                {...register('category')}
                className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <div className="mt-1 flex items-center text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.category.message}</span>
                </div>
              )}
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Location
              </label>
              <select
                id="location"
                {...register('location')}
                className="block w-full py-2 px-3 border border-gray-300 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
                <option value="other">Other</option>
              </select>
              {errors.location && (
                <div className="mt-1 flex items-center text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.location.message}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 border border-purple-600 text-white hover:bg-purple-700 transition-colors text-sm flex items-center"
            >
              {isSubmitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></span>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}