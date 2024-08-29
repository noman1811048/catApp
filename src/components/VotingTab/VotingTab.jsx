import { useEffect, useState } from 'react';
import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const VotingTab = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cat-images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleFavorite = async () => {
        if (images.length > 0 && images[currentImageIndex]) {
            setLoading(true);
            const currentImage = images[currentImageIndex];
            const urlParts = currentImage.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const imageId = fileName.split('.')[0];

            try {
                const response = await axios.post('http://localhost:8080/api/favorites', {
                    image_id: imageId,
                    sub_id: 'user-123'
                });
                if (response.status === 200) {
                    handleNextImage();
                }
            } catch (error) {
                console.error('Error adding to favorites:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleVote = async (value) => {
        if (images.length > 0 && images[currentImageIndex]) {
            setLoading(true);
            const currentImage = images[currentImageIndex];
            const urlParts = currentImage.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const imageId = fileName.split('.')[0];

            const voteData = {
                image_id: imageId,
                sub_id: 'user-123',
                value: value
            };

            try {
                const response = await axios.post('http://localhost:8080/api/votes', voteData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 201) {
                    setVotes(prev => ({ ...prev, [imageId]: value }));
                    handleNextImage();
                }
            } catch (error) {
                console.error('Error voting:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="p-4">
            <div className="relative w-full h-96">
                {loading || images.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <BeatLoader color="#F97316" size={15} />
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <img
                            src={images[currentImageIndex].url}
                            alt="Random cat"
                            className="absolute w-full h-full object-cover rounded-md"
                        />
                        <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                            {images[currentImageIndex].id}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center px-2 mt-4">
                <Heart
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    size={24}
                    onClick={handleFavorite}
                />
                <div className="flex space-x-4">
                    <ThumbsUp
                        className="text-gray-400 hover:text-green-500 cursor-pointer"
                        size={24}
                        onClick={() => handleVote(1)}
                    />
                    <ThumbsDown
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                        size={24}
                        onClick={() => handleVote(-1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default VotingTab;