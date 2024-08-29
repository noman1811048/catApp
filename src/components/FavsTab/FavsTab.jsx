import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const FavsTab = () => {
  const [favoriteCats, setFavoriteCats] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/favorites', {
        params: { sub_id: 'user-123' } // Replace with actual user ID or authentication method
      });
      setFavoriteCats(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`);
      fetchFavorites(); // Refresh the list after removing
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Cats</h2>
      <div className="grid grid-cols-2 gap-4">
        {favoriteCats.map((cat) => (
          <div key={cat.id} className="relative">
            <img src={cat.image.url} alt={`Favorite cat ${cat.id}`} className="w-full rounded-md" />
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
  );
};

export default FavsTab;