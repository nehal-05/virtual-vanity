// import React, { useState } from "react";
// export default function ProductCard({ item, onDelete }) {
//     return (
//         <div className="bg-white rounded-2xl p-4 shadow-md border border-pink-200">
//             <h3 className="text-xl font-bold text-pink-700">{item.name}</h3>

//             <p className="text-pink-600 mt-2 capitalize">{item.category}</p>
//             <p className="text-gray-600 text-sm">Expires: {item.expiry}</p>

//             <button
//                 onClick={onDelete}
//                 className="mt-4 text-red-400 font-bold hover:text-red-600"
//             >
//                 ✦ Remove
//             </button>
//         </div>
//     );
// }

import React from "react";

export default function ProductCard({ item, onDelete }) {
    // --- Expiry logic ---
    const today = new Date();
    const expiryDate = new Date(item.expiry);
    const diffTime = expiryDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let statusText = "Safe";
    let statusColor = "green";
    let borderColor = "border-green-300";
    let badgeBg = "bg-green-100 text-green-700";

    if (daysLeft < 0) {
        statusText = "Expired";
        statusColor = "red";
        borderColor = "border-red-300";
        badgeBg = "bg-red-100 text-red-700";
    } else if (daysLeft <= 30) {
        statusText = "Expiring Soon";
        statusColor = "yellow";
        borderColor = "border-yellow-300";
        badgeBg = "bg-yellow-100 text-yellow-700";
    }

    return (
        <div
            className={`bg-white rounded-2xl p-4 shadow-md border-2 ${borderColor} relative`}
        >
            {/* Status Badge */}
            <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeBg}`}
            >
                {statusText}
            </span>

            <h3 className="text-xl font-bold text-pink-700">{item.name}</h3>

            <p className="text-pink-600 mt-2 capitalize">{item.category}</p>

            <p className="text-gray-600 text-sm mt-1">
                Expires: {item.expiry}
            </p>

            {/* Days left text */}
            <p className={`text-sm mt-1 text-${statusColor}-600`}>
                {daysLeft < 0
                    ? "Expired"
                    : `Expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`}
            </p>

            <button
                onClick={onDelete}
                className="mt-4 text-red-400 font-bold hover:text-red-600"
            >
                ✦ Remove
            </button>
        </div>
    );
}
