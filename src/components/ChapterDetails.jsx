import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChapterDetails = ({ language }) => {
    const { id } = useParams();
    const [chapter, setChapter] = useState(null);
    const [audioUrl, setAudioUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chapterUrl = `/json/chapters/${language}/${id}.json`;
                console.log(`Fetching chapter data from: ${chapterUrl}`);
                const chapterResponse = await fetch(chapterUrl);
                if (!chapterResponse.ok) throw new Error('Chapter data not found');
                const chapterData = await chapterResponse.json();
                setChapter(chapterData);

                const audioUrl = `http://api.alquran.cloud/v1/surah/${id}/ar.alafasy`;
                console.log(`Fetching audio data from: ${audioUrl}`);
                const audioResponse = await fetch(audioUrl);
                if (!audioResponse.ok) throw new Error('Audio data not found');
                const audioData = await audioResponse.json();
                setAudioUrl(audioData.data.audio);

                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, language]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{chapter.name} ({chapter.translation})</h2>
            <audio controls className="w-full mb-4">
                <source src={audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <div className="prose max-w-none">
                {chapter.verses.map(verse => (
                    <div key={verse.id} className="p-4 bg-gray-100 rounded mb-4">
                        <h3 className="text-lg font-semibold">Verse {verse.id}</h3>
                        <p>{verse.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChapterDetails;
