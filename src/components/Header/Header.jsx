

const Header = () => {
    return (
        <header className="flex justify-between items-center py-4 border-b border-gray-200">
            <div className="flex items-center">
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
    );
};

export default Header;