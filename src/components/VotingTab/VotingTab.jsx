import { useEffect, useState } from 'react';
import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';

const VotingTab = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [votes, setVotes] = useState({});

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cat-images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleFavorite = async () => {
        if (images.length > 0 && images[currentImageIndex]) {
            const currentImage = images[currentImageIndex];
            console.log('Current image:', currentImage); 

            // Extract the image ID from the URL
            const urlParts = currentImage.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const imageId = fileName.split('.')[0]; 

            try {
                const response = await axios.post('http://localhost:8080/api/favorites', {
                    image_id: imageId,
                    sub_id: 'user-123' // Replace with actual user ID or authentication method
                });
                console.log("Response:", response);
                if (response.status === 200) {
                    alert('Added to favorites!');
                } else {
                    alert('Failed to add to favorites. Server responded with an error.');
                }
            } catch (error) {
                console.error('Error adding to favorites:', error.response?.data || error.message);
                alert('Failed to add to favorites. Please try again.');
            }
        } else {
            alert('No image available to favorite');
        }
    };


    const handleVote = async (value) => {
        if (images.length > 0 && images[currentImageIndex]) {
            const currentImage = images[currentImageIndex];
            const urlParts = currentImage.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const imageId = fileName.split('.')[0];

            const voteData = {
                image_id: imageId,
                sub_id: 'user-123',
                value: value
            };

            console.log('Sending vote data:', voteData);

            try {
                const response = await axios.post('http://localhost:8080/api/votes', voteData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Vote response:", response);
                if (response.status === 201) {
                    setVotes(prev => ({ ...prev, [imageId]: value }));
                    console.log(votes)
                    alert(value === 1 ? 'Upvoted!' : 'Downvoted!');
                } else {
                    alert('Failed to vote. Server responded with an error.');
                }
            } catch (error) {
                console.error('Error voting:', error.response?.data || error.message);
                alert('Failed to vote. Please try again.');
            }
        } else {
            alert('No image available to vote on');
        }
    };

    return (
        <div className="p-4">
            {images.length > 0 ? (
                <div>
                    <img
                        src={images[currentImageIndex].url}
                        alt="Random cat"
                        className="w-full rounded-md mb-4"
                    />
                    <p>{images[currentImageIndex].id}</p>
                </div>
            ) : (
                <p>Loading images...</p>
            )}
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