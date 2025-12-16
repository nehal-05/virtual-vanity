// import React, { useEffect, useRef, useState } from "react";
// import { getProductsByDrawer, addProduct, deleteProduct } from "../api/api";
// import AddItemForm from "./AddItemForm";

// export default function DrawerView() {
//     const [items, setItems] = useState({
//         makeup: [],
//         skincare: [],
//         haircare: []
//     });

//     const [openDrawer, setOpenDrawer] = useState(null);
//     const [tilt, setTilt] = useState({ x: 0, y: 0 });
//     const [cameraOn, setCameraOn] = useState(false);

//     const videoRef = useRef(null);

//     useEffect(() => {
//         loadItems();
//     }, []);

//     async function loadItems() {
//         setItems({
//             makeup: await getProductsByDrawer("makeup"),
//             skincare: await getProductsByDrawer("skincare"),
//             haircare: await getProductsByDrawer("haircare")
//         });
//     }

//     async function handleAdd(product) {
//         await addProduct(product);
//         await loadItems();
//     }

//     async function handleDelete(name) {
//         if (!window.confirm(`Remove ${name}?`)) return;
//         await deleteProduct(name);
//         await loadItems();
//     }

//     const drawers = ["makeup", "skincare", "haircare"];

//     function handleMouseMove(e) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = (e.clientX - rect.left) / rect.width - 0.5;
//         const y = (e.clientY - rect.top) / rect.height - 0.5;
//         setTilt({ x: x * 8, y: y * -8 });
//     }

//     async function toggleCamera() {
//         if (!cameraOn) {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play();
//                 setCameraOn(true);
//             } catch (err) {
//                 alert("Camera access denied or unavailable.");
//             }
//         } else {
//             let tracks = videoRef.current.srcObject.getTracks();
//             tracks.forEach((t) => t.stop());
//             videoRef.current.srcObject = null;
//             setCameraOn(false);
//         }
//     }

//     return (
//         <div
//             className="
//                 relative p-10 min-h-screen overflow-hidden flex flex-col items-center
//                 bg-gradient-to-b from-[#1a1a1e] to-[#0e0f18]
//             "
//         >
//             <div
//                 className="
//                     absolute top-0 left-1/2 -translate-x-1/2
//                     w-[900px] h-[900px]
//                     bg-[radial-gradient(circle,#3b3f52aa,transparent_70%)]
//                     pointer-events-none
//                 "
//             ></div>

//             <div className="pointer-events-none absolute inset-0 overflow-hidden">
//                 {[...Array(25)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute w-1.5 h-1.5 bg-white/40 rounded-full blur-sm animate-ping"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 4}s`,
//                             animationDuration: `${5 + Math.random() * 4}s`
//                         }}
//                     />
//                 ))}
//             </div>

//             <h1 className="text-5xl font-extrabold mb-10 text-gray-200 tracking-wide drop-shadow-xl text-center">
//                 My Vanity
//             </h1>

//             <div className="w-full flex justify-center">
//                 <div
//                     className="transition-transform duration-150 ease-out"
//                     onMouseMove={handleMouseMove}
//                     style={{
//                         transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
//                     }}
//                 >
//                     {/* WIDER VANITY CONTAINER */}
//                     <div className="w-[650px] md:w-[750px] flex flex-col items-center">

//                         {/* ======================= */}
//                         {/*     MIRROR WITH LEDS     */}
//                         {/* ======================= */}
//                         <div
//                             className="
//                                 relative w-96 h-96 rounded-full
//                                 bg-gradient-to-b from-gray-200 to-gray-300
//                                 shadow-[0_25px_60px_rgba(0,0,0,0.6)]
//                                 border-[14px] border-[#1a1f32]
//                                 overflow-hidden mb-16
//                             "
//                         >
//                             {[...Array(18)].map((_, i) => (
//                                 <div
//                                     key={i}
//                                     className="
//                                         absolute w-6 h-6 rounded-full bg-white 
//                                         shadow-[0_0_12px_4px_rgba(255,255,255,0.9)]
//                                         border border-gray-300
//                                         animate-pulse
//                                     "
//                                     style={{
//                                         left: `${50 + 42 * Math.cos((i / 18) * 2 * Math.PI)}%`,
//                                         top: `${50 + 42 * Math.sin((i / 18) * 2 * Math.PI)}%`,
//                                         transform: "translate(-50%, -50%)",
//                                         animationDelay: `${i * 0.1}s`
//                                     }}
//                                 />
//                             ))}

//                             {!cameraOn && (
//                                 <div
//                                     className="
//                                         absolute inset-0 bg-gradient-to-tr 
//                                         from-white/40 to-transparent 
//                                         rotate-12 opacity-50
//                                     "
//                                 />
//                             )}

//                             <video
//                                 ref={videoRef}
//                                 className={`
//                                     absolute inset-0 w-full h-full object-cover 
//                                     transition-opacity duration-700
//                                     ${cameraOn ? "opacity-100" : "opacity-0"}
//                                 `}
//                             />

//                             <button
//                                 onClick={toggleCamera}
//                                 className="
//                                     absolute bottom-4 left-1/2 -translate-x-1/2 
//                                     bg-[#1a1f32] text-white px-4 py-2 text-sm rounded-full
//                                     shadow-xl hover:bg-[#2c344f] transition
//                                 "
//                             >
//                                 {cameraOn ? "Turn Off Mirror Camera" : "Turn On Mirror Camera"}
//                             </button>
//                         </div>

//                         {/* VANITY DRAWERS (WIDER + BIGGER) */}
//                         <div
//                             className="
//                                 w-full 
//                                 rounded-2xl 
//                                 shadow-[0_30px_60px_rgba(0,0,0,0.5)]
//                                 border-t-4 border-indigo-700 
//                                 p-10 
//                                 relative
//                                 bg-[linear-gradient(135deg,#0c1544,#152a72,#0c1544)]
//                                 bg-[length:250%_250%]
//                                 animate-[woodgrain_8s_ease_infinite]
//                             "
//                         >
//                             {drawers.map((drawer) => (
//                                 <div key={drawer} className="relative w-full my-5">

//                                     <div
//                                         onClick={() =>
//                                             setOpenDrawer(openDrawer === drawer ? null : drawer)
//                                         }
//                                         className="
//                                             cursor-pointer 
//                                             bg-indigo-800 text-white text-xl font-semibold 
//                                             px-10 py-8 rounded-xl shadow-2xl
//                                             flex items-center justify-between
//                                             transition-all duration-500 
//                                             hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
//                                             hover:-translate-y-1
//                                             hover:brightness-110
//                                             border border-indigo-600
//                                             backdrop-blur-sm
//                                             hover:shadow-pink-400/60
//                                         "
//                                         style={{
//                                             transform:
//                                                 openDrawer === drawer
//                                                     ? "translateZ(40px) translateY(-4px) rotateX(-3deg)"
//                                                     : "translateZ(0px)"
//                                         }}
//                                     >
//                                         <span className="drop-shadow-lg tracking-wide">
//                                             {drawer.charAt(0).toUpperCase() + drawer.slice(1)}
//                                         </span>

//                                         <div className="
//                                             w-8 h-8 rounded-full bg-[#E8D9B5]
//                                             shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.45),_3px_3px_4px_rgba(255,255,255,0.6)]
//                                             border border-[#b8a780]
//                                         "></div>
//                                     </div>

//                                     <div
//                                         className={`
//                                             bg-white rounded-xl border border-indigo-200
//                                             overflow-hidden shadow-xl 
//                                             transition-all duration-700 origin-top
//                                             ${openDrawer === drawer ? "max-h-96 mt-3" : "max-h-0"}
//                                         `}
//                                         style={{
//                                             transform:
//                                                 openDrawer === drawer
//                                                     ? "translateZ(35px)"
//                                                     : "translateZ(0)"
//                                         }}
//                                     >
//                                         <ul className="p-8 flex flex-col gap-6">
//                                             {items[drawer].map((i) => (
//                                                 <li
//                                                     key={i._id}
//                                                     className="flex justify-between items-center border-b pb-3 text-indigo-900"
//                                                 >
//                                                     <div>
//                                                         <span className="font-semibold">{i.name}</span> — {i.category} —
//                                                         <span className="text-gray-600 text-sm"> {i.expiry}</span>
//                                                     </div>

//                                                     <button
//                                                         onClick={() => handleDelete(i.name)}
//                                                         className="text-red-600 hover:text-red-800 text-2xl font-bold"
//                                                     >
//                                                         ✕
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             <div className="w-full max-w-md mt-12">
//                 <AddItemForm onAdd={handleAdd} />
//             </div>
//         </div>
//     );
// }
