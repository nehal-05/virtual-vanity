// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getProductsByDrawer, addProduct, deleteProduct } from "../api/api";
// import ProductCard from "../components/ProductCard";
// import AddItemModal from "../components/AddItemModal";

// export default function CategoryPage() {
//     const { drawer } = useParams();
//     const [items, setItems] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     async function loadData() {
//         const data = await getProductsByDrawer(drawer);
//         setItems(data);
//     }

//     useEffect(() => {
//         loadData();
//     }, [drawer]);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
//             <h2 className="text-4xl font-bold text-pink-700 mb-8 text-center capitalize">
//                 {drawer}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
//                 {items.map((item) => (
//                     <ProductCard
//                         key={item._id}
//                         item={item}
//                         // onDelete={() => {
//                         //     deleteProduct(item.name);
//                         //     loadData();
//                         // }}
//                         onDelete={async () => {
//                             await deleteProduct(item.name);
//                             loadData();
//                         }}
//                     />
//                 ))}
//             </div>

//             <button
//                 onClick={() => setShowModal(true)}
//                 className="fixed bottom-6 right-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg text-lg hover:bg-pink-600"
//             >
//                 + Add Item
//             </button>

//             {showModal && (
//                 <AddItemModal
//                     drawer={drawer}
//                     onClose={() => setShowModal(false)}
//                     onAdd={async (product) => {
//                         await addProduct(product);
//                         loadData();
//                         setShowModal(false);
//                     }}
//                 />
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByDrawer, addProduct, deleteProduct } from "../api/api";
import ProductCard from "../components/ProductCard";
import AddItemModal from "../components/AddItemModal";

export default function CategoryPage() {
    const { drawer } = useParams();
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // NEW
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    async function loadData() {
        const data = await getProductsByDrawer(drawer);
        setItems(data);
    }

    useEffect(() => {
        loadData();
    }, [drawer]);

    // --- Expiry helper ---
    const getStatus = (expiry) => {
        const today = new Date();
        const expiryDate = new Date(expiry);
        const daysLeft = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        if (daysLeft < 0) return "expired";
        if (daysLeft <= 30) return "soon";
        return "safe";
    };

    // --- Filtered items ---
    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const status = getStatus(item.expiry);

        const matchesFilter =
            filter === "all" || filter === status;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
            <h2 className="text-4xl font-bold text-pink-700 mb-6 text-center capitalize">
                {drawer}
            </h2>

            {/* 🔍 Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-5xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-pink-300"
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 rounded-xl border border-pink-300"
                >
                    <option value="all">All</option>
                    <option value="expired">Expired</option>
                    <option value="soon">Expiring Soon</option>
                    <option value="safe">Safe</option>
                </select>
            </div>

            {/* 🧴 Products */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {filteredItems.length === 0 ? (
                    <p className="text-center col-span-full text-gray-500">
                        No products match your search.
                    </p>
                ) : (
                    filteredItems.map((item) => (
                        <ProductCard
                            key={item._id}
                            item={item}
                            onDelete={async () => {
                                await deleteProduct(item.name);
                                loadData();
                            }}
                        />
                    ))
                )}
            </div>

            {/* ➕ Add Item */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg text-lg hover:bg-pink-600"
            >
                + Add Item
            </button>

            {showModal && (
                <AddItemModal
                    drawer={drawer}
                    onClose={() => setShowModal(false)}
                    onAdd={async (product) => {
                        await addProduct(product);
                        loadData();
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}
