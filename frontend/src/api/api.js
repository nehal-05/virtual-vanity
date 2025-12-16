// src/api/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export async function getProductsByDrawer(drawer) {
    try {
        const res = await axios.get(`${API_URL}/drawer/${drawer}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching drawer items:", err);
        throw err;
    }
}

export async function addProduct(product) {
    try {
        const res = await axios.post(`${API_URL}/add`, product);
        return res.data;
    } catch (err) {
        console.error("Error adding product:", err);
        throw err;
    }
}
export async function deleteProduct(name) {
    const response = await fetch(`http://127.0.0.1:5000/delete/${encodeURIComponent(name)}`, {
        method: "DELETE"
    });
    return response.json();
}
