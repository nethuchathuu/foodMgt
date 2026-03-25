import React from 'react';
import { ShoppingBag, ArrowLeft, Clock, MapPin, Phone, CheckCircle, Info } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SidebarUser from '../slidebarUser';
import NavbarUser from '../navbarUser';

const mockFoods = {
  1: {
    id: 1,
    name: 'Vegetable Rice Pack',
    restaurant: 'Green Cafe',
    category: 'Rice',
    location: 'Colombo',
    contact: '0771234567',
    quantity: 5,
    expiresIn: '2 hours',
    description: 'Freshly packed vegetable rice with soya meat curry, beans, and papadam. Perfectly nutritious and healthy meal salvaged from today\'s excess.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ingredients: ['Rice', 'Soya meat', 'Beans', 'Spices'],
    dietary: ['Vegetarian', 'Vegan']
  }
};

export default function DisplayFoodPage() {
  const { id } = useParams();
  const food = mockFoods[id] || mockFoods[1]; // Fallback for mockup

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#F8F8F6' }}>
      <SidebarUser />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NavbarUser />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Back Navigation */}
            <Link 
              to="/receiver/foods" 
              className="inline-flex items-center gap-2 mb-6 font-medium hover:underline transition-all"
              style={{ color: '#1F5E2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Food Listings
            </Link>

            {/* Main Content Card */}
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: '#D8C3A5' }}>
              
              {/* Top Image Banner */}
              <div className="h-64 md:h-80 w-full relative">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-bold shadow-md" style={{ color: '#E9A38E' }}>
                  {food.category}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* Left Column: Food Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F5E2A' }}>{food.name}</h1>
                        <p className="text-xl font-medium" style={{ color: '#D67A5C' }}>{food.quantity} packs available</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-bold p-3 rounded-xl bg-orange-50 w-fit mb-6" style={{ color: '#E9A38E' }}>
                      <Clock className="w-5 h-5" />
                      Expires in: {food.expiresIn}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: '#1F5E2A' }}>
                        <Info className="w-5 h-5 text-gray-400" />
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {food.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {food.ingredients && (
                        <div>
                           <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Ingredients</h4>
                           <ul className="text-gray-600 list-disc list-inside pl-1">
                             {food.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
                           </ul>
                        </div>
                      )}
                      {food.dietary && (
                        <div>
                           <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Dietary Info</h4>
                           <div className="flex flex-wrap gap-2">
                             {food.dietary.map((item, idx) => (
                               <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                 {item}
                               </span>
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Restaurant Info & Action */}
                  <div className="w-full md:w-80 flex flex-col gap-6">
                    
                    {/* Restaurant Card */}
                    <div className="bg-[#F8F8F6] rounded-2xl p-6 border" style={{ borderColor: '#D8C3A5' }}>
                      <h3 className="font-bold text-lg mb-4" style={{ color: '#1F5E2A' }}>Restaurant Info</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Name</p>
                          <p className="font-bold text-lg" style={{ color: '#1F5E2A' }}>{food.restaurant}</p>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Location</p>
                            <p className="font-bold" style={{ color: '#1F5E2A' }}>{food.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 mt-0.5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Contact</p>
                            <p className="font-bold" style={{ color: '#1F5E2A' }}>{food.contact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Button */}
                    <Link 
                      to={`/receiver/order/${food.id}`}
                      className="w-full py-4 rounded-xl font-bold text-xl text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-1"
                      style={{ backgroundColor: '#E9A38E' }}
                    >
                      <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Order Now
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
