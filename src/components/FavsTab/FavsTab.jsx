import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

const FavsTab = () => {
  const [favoriteCats, setFavoriteCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/favorites', {
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
      await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`);
      await fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Cats</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BeatLoader color="#F97316" size={15} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default FavsTab;