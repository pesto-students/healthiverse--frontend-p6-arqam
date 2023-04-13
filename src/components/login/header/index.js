import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}) {
    return (
        <div className="flex flex-col justify-left">
            <div className="flex justify-left">
                <div >
                    <p className='text-2xl font-bold'>Welcome to</p>
                    <p className='text-3xl font-bold'>HealthiVerse</p>
                </div>
            </div>
            <h2 className="mt-2 text-left text-xl font-bold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-left text-sm text-gray-600">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}
