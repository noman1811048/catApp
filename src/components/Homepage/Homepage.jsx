import { useState } from 'react';
import { Search, Heart, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';

const CatAPIHomepage = () => {
  const [activeTab, setActiveTab] = useState('Voting');
  const [selectedBreed, setSelectedBreed] = useState('Abyssinian');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const breeds = ['Abyssinian', 'Maine Coon', 'Siamese', 'Persian', 'Bengal'];

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
    setIsDropdownOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Voting':
        return (
          <div className="p-4">
            <img src="https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_640.jpg" alt="Cat tail on gravel" className="w-full rounded-md mb-4" />
            <div className="flex justify-between items-center px-2">
              <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" size={24} />
              <div className="flex space-x-4">
                <ThumbsUp className="text-gray-400 hover:text-green-500 cursor-pointer" size={24} />
                <ThumbsDown className="text-gray-400 hover:text-red-500 cursor-pointer" size={24} />
              </div>
            </div>
          </div>
        );
      case 'Breeds':
        return (
          <div className="p-4">
            <div className="relative">
              <button
                className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between mb-4"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedBreed}</span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                  {breeds.map((breed) => (
                    <button
                      key={breed}
                      className="w-full text-left p-2 hover:bg-gray-100"
                      onClick={() => handleBreedSelect(breed)}
                    >
                      {breed}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <img src="https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_640.jpg" alt={`${selectedBreed} cat`} className="w-full rounded-md mb-4" />
            <div>
              <h3 className="font-bold">{selectedBreed} <span className="font-normal text-gray-500">(Origin) code</span></h3>
              <p className="mt-2 text-gray-700">Description of the {selectedBreed} breed goes here.</p>
              <a href="#" className="text-orange-500 mt-2 block uppercase text-sm font-semibold">Wikipedia</a>
            </div>
          </div>
        );
      case 'Favs':
        return (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_640.jpg" alt="Cat in denim" className="w-full rounded-md" />
              <img src="https://cdn.pixabay.com/photo/2024/03/08/09/47/ai-generated-8620359_960_720.png" alt="Cat on wicker chair" className="w-full rounded-md" />
              <img src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg" alt="Cat on red chair" className="w-full rounded-md" />
              <img src="https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_640.jpg" alt="Cats playing" className="w-full rounded-md" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center">
            {/* <img src="/api/placeholder/24/24" alt="Cat API Logo" className="mr-2" /> */}
            <span className="font-bold text-xl">TheCatAPI</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">PRICING</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">DOCUMENTATION</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">MORE APIS</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">SHOWCASE</a></li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex py-8">
          {/* Left Column */}
          <div className="w-1/2 pr-8">
            <h1 className="text-6xl font-bold mb-4">
              The Cat API
              <br />
              <span className="text-orange-500">Cats as a service.</span>
            </h1>
            <p className="text-2xl mb-4">Because everyday is a Caturday.</p>
            <p className="mb-4">An API all about cat.<br />60k+ Images. Breeds. Facts.</p>
            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded">GET YOUR API KEY</button>
              <button className="border border-black px-4 py-2 rounded">READ OUR GUIDES</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between p-4 border-b border-gray-200">
                <button
                  className={`flex items-center ${activeTab === 'Voting' ? 'text-orange-500' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('Voting')}
                >
                  <span className="mr-2">⇧⇩</span>
                  <span>Voting</span>
                </button>
                <button
                  className={`flex items-center ${activeTab === 'Breeds' ? 'text-orange-500' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('Breeds')}
                >
                  <Search className="mr-2" size={18} />
                  <span>Breeds</span>
                </button>
                <button
                  className={`flex items-center ${activeTab === 'Favs' ? 'text-orange-500' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('Favs')}
                >
                  <Heart className="mr-2" size={18} />
                  <span>Favs</span>
                </button>
              </div>
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CatAPIHomepage;