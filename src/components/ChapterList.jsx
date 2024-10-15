import React from 'react';
import { Link } from 'react-router-dom';

const ChapterList = ({ chapters }) => {
    return (
        <ul className="space-y-2">
            {chapters.map(chapter => (
                <li key={chapter.id} className="p-4 bg-white rounded shadow">
                    <Link to={`/chapter/${chapter.id}`}>
                        {chapter.name} ({chapter.translation})
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ChapterList;
