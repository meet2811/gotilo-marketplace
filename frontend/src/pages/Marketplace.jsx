import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import useAuthStore from '../store';

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('listings/');
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Filter listings based on the search bar input
  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper for determining active sidebar links
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#eaf4f4] overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR (Matching the "NEXUS HOMES" layout) */}
      <aside className="w-72 bg-white h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-10">
        <div className="p-8 pb-12">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            GOTILO
            <span className="block text-sm font-medium text-slate-500 tracking-widest mt-1">
              ACCOUNTS
            </span>
          </h1>
        </div>

        <nav className="flex-1 px-6 space-y-4">
          <Link 
            to="/profile" 
            className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${isActive('/profile') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <span className="font-semibold text-lg">Profile</span>
          </Link>

          <Link 
            to="/messages" 
            className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${isActive('/messages') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className="relative w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            <span className="font-semibold text-lg">Messages</span>
          </Link>

          <Link 
            to="/create-listing" 
            className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${isActive('/create-listing') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <span className="font-semibold text-lg">Create Listing</span>
          </Link>

          <Link 
            to="/marketplace" 
            className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors ${isActive('/marketplace') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <span className="font-semibold text-lg">Main Home Page</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 font-medium transition-colors flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 relative">
          <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            className="w-full bg-white rounded-full py-4 pl-8 pr-14 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-none focus:ring-2 focus:ring-teal-500 text-lg outline-none text-slate-700 placeholder-slate-400"
            placeholder="Search accounts, ranks, or games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Listings Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-slate-800 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">Listings</span>
          </div>

          {loading ? (
            <div className="text-center text-slate-500 py-20">Loading marketplace...</div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center text-slate-500 py-20">No accounts found matching your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full cursor-pointer" onClick={() => navigate(`/chat/${listing.id}`)}>
                  
                  {/* Card Image */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    {listing.image ? (
                      <img 
                        src={`http://localhost:8000${listing.image}`} 
                        alt={listing.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-teal-600">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="px-2 flex-1 flex flex-col">
                    <span className="text-xl font-bold text-teal-600 mb-1">${listing.price}</span>
                    <h2 className="text-slate-800 font-bold text-lg leading-tight mb-2 line-clamp-2">{listing.title}</h2>
                    
                    <div className="mt-auto flex items-center text-slate-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {listing.category_name}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}