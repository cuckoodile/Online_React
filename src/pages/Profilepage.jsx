import { useState } from "react";

export default function Profilepage(){
    const [profile, setProfile] = useState({
        fullName: "Ryan Delos Santos",
        email: "ryanrinon0913@gmail.com",
        mobile: "09** *** ****",
        birthday: "March 25 2006",
        gender: "Male",
        shippingAddress: {
            fullName: "Ryan Delos Santos",
            address: "140 west bank road",
            postcode: "Metro Manila~Pasig,Pasig City~Maybunga",
            phoneNumber: "09** *** ****"
        }
    });

    const [showAllPrev, setShowAllPrev] = useState(false);
    const [showAllRec, setShowAllRec] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Save the updated profile details
        console.log("Profile saved", profile);
    };

    const toggleShowAllPrev = () => {
        setShowAllPrev(!showAllPrev);
    };

    const toggleShowAllRec = () => {
        setShowAllRec(!showAllRec);
    };

    return(
        <main className="h-screen w-screen p-0 m-0 flex-col bg-gray-400 text-black">
            <nav className="h-[10%] w-screen bg-white border-black border-4">
                {/* nav here */}
            </nav>
            <div className="flex h-[90%] w-screen bg-black p-2">
                {/* User Profile/Details */}
                <div className="flex-col h-full w-[25%] bg-white m-1 p-4 justify-items-center">
                    {/* Profile Picture */}
                    <div className=" h-[30%] w-[55%]  border-black border-4 rounded-s-full rounded-e-full justify-items-center">
                        <img className="h-full w-full rounded-s-full rounded-e-full" src="../../IMG_2218.JPG" alt="Profile" />
                    </div>
                    <div className="h-[70%] w-full m-3 flex-col border-black border-2">
                        <div className="p-1 m-1">
                            <h1 className="text-black">Full Name</h1>
                            <input 
                                className="text-black" 
                                name="fullName" 
                                value={profile.fullName} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="p-1 m-1">
                            <h1 className="text-black">Email Address</h1>
                            <input 
                                className="text-black" 
                                name="email" 
                                value={profile.email} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="p-1 m-1">
                            <h1 className="text-black">Mobile Number</h1>
                            <input 
                                className="text-black" 
                                name="mobile" 
                                value={profile.mobile} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="p-1 m-1">
                            <h1 className="text-black">Birthday</h1>
                            <input 
                                className="text-black" 
                                name="birthday" 
                                value={profile.birthday} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="p-1 m-1">
                            <h1 className="text-black">Gender</h1>
                            <input 
                                className="text-black" 
                                name="gender" 
                                value={profile.gender} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="p-1 m-1">
                            <button className="bg-blue-500 text-white p-2" onClick={handleSave}>Save</button>
                        </div>
                        <div className="p-1 m-1">
                            <h1 className="text-black font-light">Default Shipping Address</h1>
                            <h1 className="text-black font-light">Full Name</h1>
                            <input 
                                className="text-black" 
                                name="shippingFullName" 
                                value={profile.shippingAddress.fullName} 
                                onChange={(e) => setProfile({
                                    ...profile,
                                    shippingAddress: {
                                        ...profile.shippingAddress,
                                        fullName: e.target.value
                                    }
                                })} 
                            />
                            <h1 className="text-black font-light">Address</h1>
                            <input 
                                className="text-black" 
                                name="shippingAddress" 
                                value={profile.shippingAddress.address} 
                                onChange={(e) => setProfile({
                                    ...profile,
                                    shippingAddress: {
                                        ...profile.shippingAddress,
                                        address: e.target.value
                                    }
                                })} 
                            />
                            <h1 className="text-black font-light">PostCode</h1>
                            <input 
                                className="text-black" 
                                name="postcode" 
                                value={profile.shippingAddress.postcode} 
                                onChange={(e) => setProfile({
                                    ...profile,
                                    shippingAddress: {
                                        ...profile.shippingAddress,
                                        postcode: e.target.value
                                    }
                                })} 
                            />
                            <h1 className="text-black font-light">Phone Number</h1>
                            <input 
                                className="text-black" 
                                name="shippingPhoneNumber" 
                                value={profile.shippingAddress.phoneNumber} 
                                onChange={(e) => setProfile({
                                    ...profile,
                                    shippingAddress: {
                                        ...profile.shippingAddress,
                                        phoneNumber: e.target.value
                                    }
                                })} 
                            />
                        </div>
                    </div>
                </div>
                {/* Prev Purchase/Recommended Products */}
                <div className="h-full w-[75%] bg-gray-300 m-1 p-2 overflow-hidden">
                    <div className="h-[50%] w-full m-1 p-2">
                        <h1 className="font-bold text-black text-4xl">Prev Purchase</h1>
                        <button className="text-blue-400" onClick={toggleShowAllPrev}>{showAllPrev ? "view less" : "view more"}</button>
                        <div className={`flex h-full w-full overflow-hidden ${showAllPrev ? "overflow-auto" : "overflow-hidden"}`}>
                            <div className="p-0 m-1 bg-white h-[210px] w-[200px]">
                                <img className="h-full w-full z-10" src="../../../IMG_2218.JPG" alt="" />
                                <h1 className="z-20 bg-white text-black">Product Name</h1>
                                <h3 className="z-20 bg-white text-black">Price: $$$$$$</h3>
                                <p className="z-20 bg-white text-black"> Description</p>
                                <p className="z-20 bg-white text-yellow-400">⭐⭐⭐⭐⭐</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[50%] w-full m-1">
                        <h1 className="font-bold text-black text-4xl">Recommended Purchase</h1>
                        <button className="text-blue-400" onClick={toggleShowAllRec}>{showAllRec ? "view less" : "view more"}</button>
                        <div className={`flex h-full w-full overflow-hidden ${showAllRec ? "overflow-auto" : "overflow-hidden"}`}>
                            <div className="p-0 m-1 bg-white h-[210px] w-[200px]">
                                <img className="h-full w-full z-10" src="../../../IMG_2218.JPG" alt="" />
                                <h1 className="z-20 bg-white text-black">Product Name</h1>
                                <h3 className="z-20 bg-white text-black">Price: $$$$$$</h3>
                                <p className="z-20 bg-white text-black"> Description</p>
                                <p className="z-20 bg-white text-yellow-400">⭐⭐⭐</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
