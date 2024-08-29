import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

const BreedsTab = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [catImage, setCatImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      fetchCatImageByBreed(selectedBreed.id);
    }
  }, [selectedBreed]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/breeds`);
      if (!response.ok) throw new Error('Failed to fetch breeds');
      const data = await response.json();
      setBreeds(data);
      if (data.length > 0) setSelectedBreed(data[0]);
    } catch (err) {
      setError('Failed to load breeds. Please try again later.', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCatImageByBreed = async (breedId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/cat-images/by-breed?breed_id=${breedId}`);
      if (!response.ok) throw new Error('Failed to fetch cat image');
      const data = await response.json();
      if (data.length > 0) setCatImage(data[0]);
    } catch (err) {
      setError('Failed to load cat image. Please try again later.', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
    setIsDropdownOpen(false);
  };

  if (isLoading && breeds.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="relative">
        <button
          className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between mb-4"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedBreed ? selectedBreed.name : 'Select a breed'}</span>
          <ChevronDown size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
            {breeds.map((breed) => (
              <button
                key={breed.id}
                className="w-full text-left p-2 hover:bg-gray-100"
                onClick={() => handleBreedSelect(breed)}
              >
                {breed.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {isLoading ? (
        <div>Loading cat image...</div>
      ) : catImage ? (
        <img src={catImage.url} alt={`${selectedBreed.name} cat`} className="w-full rounded-md mb-4" />
      ) : (
        <div>No image available for this breed</div>
      )}
      {selectedBreed && (
        <div>
          <h3 className="font-bold">
            {selectedBreed.name} <span className="font-normal text-gray-500">({selectedBreed.origin})</span>
          </h3>
          <p className="mt-2 text-gray-700">{selectedBreed.description}</p>
          <a href={`https://en.wikipedia.org/wiki/${selectedBreed.name}_cat`} target="_blank" rel="noopener noreferrer" className="text-orange-500 mt-2 block uppercase text-sm font-semibold">
            Wikipedia
          </a>
        </div>
      )}
    </div>
  );
};

export default BreedsTab;