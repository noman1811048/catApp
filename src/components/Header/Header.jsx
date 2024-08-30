import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex justify-between items-center py-4 border-b border-gray-200">
            <div className="flex items-center">
                <span className="font-bold text-xl">TheCatAPI</span>
            </div>
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <nav className={`lg:flex space-x-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>
                <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">PRICING</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">DOCUMENTATION</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">MORE APIS</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">SHOWCASE</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
