import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChapterDetails = ({ language }) => {
    const { id } = useParams();
    const [chapter, setChapter] = useState(null);
    const [audioUrl, setAudioUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chapterResponse = await axios.get(`http://api.alquran.cloud/v1/surah/${id}/bn.alafasy`);
                setChapter(chapterResponse.data.data);

                const audioResponse = await axios.get(`http://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
                setAudioUrl(audioResponse.data.data.audio);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{chapter.name_arabic} ({chapter.translated_name})</h2>
            <audio controls className="w-full mb-4">
                <source src={audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <div className="prose max-w-none">
                {/* Display additional chapter information if available */}
            </div>
        </div>
    );
};

export default ChapterDetails;
