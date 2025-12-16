// import React, { useState } from "react";
// export default function AddItemModal({ drawer, onClose, onAdd }) {
//     const [name, setName] = useState("");
//     const [expiry, setExpiry] = useState("");

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
//             <div className="bg-white rounded-3xl p-8 w-96 shadow-xl border border-pink-200">
//                 <h3 className="text-2xl font-bold text-pink-700 mb-4">
//                     Add to {drawer}
//                 </h3>

//                 <input
//                     className="w-full border border-pink-300 rounded-xl p-2 mb-3"
//                     placeholder="Product name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />

//                 <input
//                     type="date"
//                     className="w-full border border-pink-300 rounded-xl p-2 mb-4"
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value)}
//                 />

//                 <div className="flex justify-between">
//                     <button onClick={onClose} className="text-gray-500">Cancel</button>

//                     <button
//                         onClick={() => onAdd({ name, expiry, drawer })}
//                         className="px-4 py-2 bg-pink-500 text-white rounded-xl"
//                     >
//                         Add
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";

export default function AddItemModal({ drawer, onClose, onAdd }) {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [error, setError] = useState("");

    // --- Validate expiry date ---
    useEffect(() => {
        if (!expiry) {
            setError("");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(expiry);

        if (selectedDate < today) {
            setError("Expiry date cannot be in the past.");
        } else {
            setError("");
        }
    }, [expiry]);

    const handleAdd = () => {
        if (!name || !expiry || error) return;

        onAdd({ name, expiry, drawer });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 w-96 shadow-xl border border-pink-200">
                <h3 className="text-2xl font-bold text-pink-700 mb-4">
                    Add to {drawer}
                </h3>

                <input
                    className="w-full border border-pink-300 rounded-xl p-2 mb-3"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full border border-pink-300 rounded-xl p-2"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <div className="flex justify-between mt-6">
                    <button onClick={onClose} className="text-gray-500">
                        Cancel
                    </button>

                    <button
                        onClick={handleAdd}
                        disabled={!name || !expiry || error}
                        className={`px-4 py-2 rounded-xl text-white ${!name || !expiry || error
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-pink-500 hover:bg-pink-600"
                            }`}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
