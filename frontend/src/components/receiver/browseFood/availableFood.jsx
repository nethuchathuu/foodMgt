import React from 'react';
import { MapPin, Clock, Info, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AvailableFood({ foods }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map(food => (
        <div 
          key={food.id} 
          className="bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col"
          style={{ borderColor: '#D8C3A5' }}
        >
          {/* Image */}
          <div className="h-48 w-full relative">
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: '#E9A38E' }}>
              {food.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold truncate pr-2" style={{ color: '#1F5E2A' }}>{food.name}</h3>
            </div>
            
            <p className="text-sm font-medium mb-4" style={{ color: '#D67A5C' }}>
              <span className="opacity-80">Qty:</span> {food.quantity} available
            </p>

            <div className="space-y-2 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-70" />
                <span>{food.restaurant}</span>
              </div>
              <div className="flex items-center gap-2 font-medium" style={{ color: '#E9A38E' }}>
                <Clock className="w-4 h-4" />
                <span>Expires in: {food.expiresIn}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <Link 
                to={`/receiver/food/${food.id}`}
                className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#9BC7D8', color: '#FFFFFF' }}
              >
                <Info className="w-4 h-4" />
                Details
              </Link>
              <Link 
                to={`/receiver/order/${food.id}`}
                className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#E9A38E', color: '#FFFFFF' }}
              >
                <ShoppingCart className="w-4 h-4" />
                Order
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {foods.length === 0 && (
        <div className="col-span-full py-12 text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#1F5E2A' }}>No food items found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
