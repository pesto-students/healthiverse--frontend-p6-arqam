import React from 'react';
import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-2">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-20 w-20 bg-gray-200 shadow-xl rounded-full p-2"
                    src="https://res.cloudinary.com/dhkb0cyyy/image/upload/v1681287043/healthiverse-website-favicon-color_qksmja.png"/>
            </div>
            <h2 className="mt-2 text-center text-2xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
