import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VotingTab from '../VotingTab/VotingTab';
import BreedsTab from '../BreedsTab/BreedsTab';
import FavsTab from '../FavsTab/FavsTab';


const TabContent = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Voting');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/${tab.toLowerCase()}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between p-4 border-b border-gray-200">
                <button
                    className={`flex items-center ${activeTab === 'Voting' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                    onClick={() => handleTabChange('Voting')}
                >
                    Voting
                </button>
                <button
                    className={`flex items-center ${activeTab === 'Breeds' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                    onClick={() => handleTabChange('Breeds')}
                >
                    Breeds
                </button>
                <button
                    className={`flex items-center ${activeTab === 'Favs' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                    onClick={() => handleTabChange('Favs')}
                >
                    Favs
                </button>
            </div>
            {activeTab === 'Voting' && <VotingTab />}
            {activeTab === 'Breeds' && <BreedsTab />}
            {activeTab === 'Favs' && <FavsTab />}
        </div>
    );
};

export default TabContent;