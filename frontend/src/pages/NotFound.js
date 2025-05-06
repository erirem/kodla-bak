import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-2 mb-6">Oops! Sayfa bulunamadı.</p>
            <Link to="/" className="text-indigo-600 hover:underline">
                Ana sayfaya dön
            </Link>
        </div>
    );
};

export default NotFound;
