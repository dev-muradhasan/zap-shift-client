// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import 'leaflet/dist/leaflet.css'
// import { useLoaderData } from "react-router";


// const Coverage = () => {
//     const position = [23.8103, 90.4125]
//     const serviceCenters = useLoaderData();

//     return (
//         <div>
//             coverage
//             <div className="w-full mx-auto h-150">
//                 <MapContainer center={position} zoom={8} scrollWheelZoom={false} className="h-150">
//                     <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />

//                    {
//                         serviceCenters.map((serviceCenter, index) => <Marker  key={index}
//                         position={[serviceCenter.latitude, serviceCenter.longitude]}>
//                             <Popup>
//                                 <strong className="font-bold text-lg text-primary">{serviceCenter.district}</strong> <br />
//                                 <span className="font-semibold text-primary">Service area: </span>{serviceCenter.covered_area.join(', ')}
//                             </Popup>
//                         </Marker>)
//                    }
//                 </MapContainer>
//             </div>
//         </div>
//     );
// };

// export default Coverage;


import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import { toast } from "react-toastify";

const Coverage = () => {
    const position = [23.8103, 90.4125];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null)
  
    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(c=>c.district.toLowerCase().includes(location.toLowerCase()))
       if(district){
            const coord = [district.latitude, district.longitude];
            // go to the location
            mapRef.current.flyTo(coord, 12)
       } else {
           toast.error("District not found");
       }
    };

    return (
        <section className="bg-[#eef0f1] py-5">
            <div className="mx-auto">
                {/* Main White Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl md:text-5xl font-bold text-primary">
                        We are available in {serviceCenters.length} districts
                    </h2>
                    <form
                        onSubmit={handleSearch}
                        className="
                            flex
                            items-center
                            w-full
                            max-w-sm
                            mt-6
                            bg-[#eef1f3]
                            rounded-full
                            overflow-hidden
                        "
                    >
                        {/* Search Icon */}
                        <div className="pl-4 text-primary">
                            <FaSearch size={12} />
                        </div>
                        {/* Input */}
                        <input
                            type="text"
                            name="location"
                            placeholder="Search here"
                            className="
                                flex-1
                                bg-transparent
                                outline-none
                                border-none
                                px-2
                                py-2.5
                                text-xs
                                text-primary
                                placeholder:text-secondary
                            "
                        />
                        {/* Button */}
                        <button
                            type="submit"
                            className="
                                bg-accent-content
                                text-primary
                                font-semibold
                                text-xs
                                px-6
                                py-2.5
                                rounded-full
                                cursor-pointer
                                hover:bg-[#b8e936]
                                transition
                            "
                        >
                            Search
                        </button>
                    </form>
                    {/* ================= DIVIDER ================= */}
                    <div className="border-t border-gray-200 mt-6 mb-6"></div>
                    <h3 className=" md:text-lg font-bold text-primary mb-4">
                        We deliver almost all over Bangladesh
                    </h3>
                    {/* ================= MAP ================= */}
                    <div className="
                        w-full
                        h-75
                        md:h-100
                        rounded-none
                        overflow-hidden
                    ">
                        <MapContainer
                            center={position}
                            zoom={7}
                            scrollWheelZoom={false}
                            ref={mapRef}
                            className="w-full h-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {serviceCenters.map(
                                (serviceCenter, index) => (
                                    <Marker
                                        key={index}
                                        position={[
                                            serviceCenter.latitude,
                                            serviceCenter.longitude,
                                        ]}
                                    >
                                        <Popup>
                                            <div className="min-w-45">
                                                <h3 className="font-bold text-primary text-base">
                                                    {serviceCenter.district}
                                                </h3>
                                                <p className="text-xs">
                                                    <span className="font-semibold">
                                                        Service area:
                                                    </span>{" "}
                                                    {serviceCenter.covered_area.join(
                                                        ", "
                                                    )}
                                                </p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )
                            )}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Coverage;