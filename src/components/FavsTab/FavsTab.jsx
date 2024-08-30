import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Grid, List } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import config from '../../config/config.json';

const FavsTab = () => {
  const [favoriteCats, setFavoriteCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiBaseURL}/api/favorites`, {
        params: { sub_id: 'user-123' }
      });
      setFavoriteCats(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId) => {
    setLoading(true);
    try {
      await axios.delete(`${config.apiBaseURL}/api/favorites/${favoriteId}`);
      await fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setViewMode('grid')}
            className={`mr-2 p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BeatLoader color="#F97316" size={15} />
        </div>
      ) : (
        <div className={`flex-grow overflow-y-auto ${viewMode === 'grid' ? 'max-h-64' : ''}`}>
          <div
            className={`grid ${
              viewMode === 'grid' ? 'grid-cols-2 gap-4' : 'grid-cols-1'
            } ${viewMode === 'list' ? 'max-h-64 overflow-y-auto' : ''}`}
          >
            {favoriteCats.map((cat, index) => (
              <div
                key={cat.id}
                className={`relative p-2 ${
                  viewMode === 'list' ? 'flex items-center justify-center h-48' : ''
                } ${viewMode === 'list' && index !== favoriteCats.length - 1 ? 'mb-4' : ''}`}
              >
                <img
                  src={cat.image.url}
                  alt={`Favorite cat ${cat.id}`}
                  className={`object-cover rounded-md ${
                    viewMode === 'grid' ? 'w-full h-48' : 'w-96 h-48 rounded-lg'
                  }`}
                />
                <button
                  onClick={() => removeFavorite(cat.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavsTab;