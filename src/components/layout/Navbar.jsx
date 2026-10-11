import { Link, NavLink } from 'react-router';
import { Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export function Navbar() {
  const { favorites } = useFavorites();

  return (
    <header className="bg-[#0a0a0a] border-b border-[#1a1a1a] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col">
          <div className="flex items-center italic">
            <span className="text-white font-bold text-3xl font-goldman">
              Football
            </span>
            <span className="text-yellow-500 font-bold text-3xl font-goldman">
              DB
            </span>
          </div>
        </Link>

        {/* Right side: Favorit (Star icon) */}
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              isActive
                ? 'bg-yellow-600 text-white border-yellow-600 shadow-sm'
                : 'bg-[#151515] text-gray-300 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
            }`
          }
        >
          <Star
            size={16}
            className={
              favorites.length > 0
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-400'
            }
          />
          <span>Favorit</span>
          {favorites.length > 0 && (
            <span className="min-w-5 h-4 px-1 flex items-center justify-center rounded-full bg-yellow-500 text-white text-[10px] font-bold">
              {favorites.length}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
