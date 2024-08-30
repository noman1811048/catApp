import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import VotingTab from '../VotingTab/VotingTab';
import BreedsTab from '../BreedsTab/BreedsTab';
import FavsTab from '../FavsTab/FavsTab';
import { Heart, Search } from 'lucide-react';

const Homepage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/breeds') return 'Breeds';
        if (path === '/favs') return 'Favs';
        return 'Voting';
    };

    const activeTab = getActiveTab();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/voting');
        }
    }, [location, navigate]);

    const handleTabChange = (tab) => {
        navigate(`/${tab.toLowerCase()}`);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header />
                <main className="flex py-8">
                    <div className="w-1/2 pr-8">
                        <h1 className="text-6xl font-bold mb-4">
                            The Cat API
                            <br />
                            <span className="text-orange-500">Cats as a service.</span>
                        </h1>
                        <p className="text-2xl mb-4">Because everyday is a Caturday.</p>
                        <p className="mb-4">An API all about cats.<br />60k+ Images. Breeds. Facts.</p>
                        <div className="flex space-x-4">
                            <button className="bg-black text-white px-4 py-2 rounded">GET YOUR API KEY</button>
                            <button className="border border-black px-4 py-2 rounded">READ OUR GUIDES</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-start p-4 border-b border-gray-200">
                                <button
                                    className={`flex items-center mr-4 ${activeTab === 'Voting' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                                    onClick={() => handleTabChange('Voting')}
                                >
                                    <span className="mr-2">⇧⇩</span>
                                    Voting
                                </button>
                                <button
                                    className={`flex items-center mr-4 ${activeTab === 'Breeds' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                                    onClick={() => handleTabChange('Breeds')}
                                >
                                    <Search className="mr-2" size={18} />
                                    Breeds
                                </button>
                                <button
                                    className={`flex items-center ${activeTab === 'Favs' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                                    onClick={() => handleTabChange('Favs')}
                                >
                                    <Heart className="mr-2" size={18} />
                                    Favs
                                </button>
                            </div>

                            {activeTab === 'Voting' && <VotingTab />}
                            {activeTab === 'Breeds' && <BreedsTab />}
                            {activeTab === 'Favs' && <FavsTab />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Homepage;