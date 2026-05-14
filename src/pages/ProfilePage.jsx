import { useState } from "react";
import  useAuthStore  from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

//? =========================== PROFILE COMPONENT =========================== PROFILE COMPONENT
const ProfilePage = () => {
  const { authUser, isUpadatingProfile, updatProfile } = useAuthStore();
  const [selectedImage , setSelectedImage] = useState(null)


  const handleImageUpload = (e) => {
    
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async ()=>{
      const base64Image = reader.result 
      setSelectedImage(base64Image)
      await updatProfile({ profilePic : base64Image})
    }

  };

  //? =========================== JSX =========================== JSX
  return (
    <div className=" max-h-screen pt-15">
      <div className=" max-w-2xl mx-auto p-4 py-8">
        <div className=" bg-base-300 rounded-xl p-6 space-y-8">
          <div className=" text-center mb-1.5">
            <h1 className=" text-2xl font-semibold">Profile</h1>
            <p className=" mt-2">Your Profile information</p>
          </div>

          {/* ================== AVATAR UPLOAD SECTION */}
          <div className=" flex flex-col items-center gap-4 mb-0">
            <div className=" relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar2.png"}
                // src="https://res.cloudinary.com/ddoh8ufzd/image/upload/v1777440294/s1_ht0r6w.png"
                alt="profile"
                className=" size-32 rounded-full aspect-square border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpadatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className=" w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className=" hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpadatingProfile}
                />
              </label>
            </div>
            <p className=" text-sm text-zinc-400">
              {isUpadatingProfile
                ? "uploading•••"
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className=" space-y-6 mb-0 px-6">
            <div className=" space-y-1.5">
              <div className=" text-sm text-zinc-400 flex items-center gap-2">
                <User className=" w-4 h-4" />
                Full Name
              </div>
              <p className=" px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className=" space-y-1.5">
              <div className=" text-sm text-zinc-400 flex items-center gap-2">
                <Mail className=" w-4 h-4" />
                Email Address
              </div>
              <p className=" px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className=" bg-base-300 rounded-xl p-6 pb-0">
            <h2 className=" text-lg font-medium mb-4">Account Information</h2>
            <div className=" space-y-3 text-sm mb-0">
              <div className=" flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>

              <div className=" flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className=" text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
