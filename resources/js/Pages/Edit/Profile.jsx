import React, { useRef, useState, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Layout from "../../layouts/Layout";
import { NavbarMinimalColored } from "../../layouts/mantine/sidebar.jsx";
import PijiHeader from "../../layouts/components/Header.jsx";
import PijiHeader2 from "../../layouts/components/Header2.jsx";
import { IconArrowBack, IconDeviceFloppy } from "@tabler/icons-react";

export default function EditProfile() {
  const { user, flash } = usePage().props;
  const fileInputRef = useRef();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [localErrors, setLocalErrors] = useState({});

  const { data, setData, post, errors, processing, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    avatar: null,
    password: "",
    password_confirmation: "",
    _method: "put",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

    if (file && !allowedTypes.includes(file.type)) {
      alert("Please upload an image of type JPG, PNG, WEBP, or GIF.");
      e.target.value = null;
      return;
    }

    setData("avatar", file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    } else {
      setAvatarPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset local error
    setLocalErrors({});

    if (data.password && data.password !== data.password_confirmation) {
      setLocalErrors({
        password_confirmation: "Passwords do not match.",
      });
      return;
    }

    post("/profile/update", {
      forceFormData: true,
      onSuccess: () => {
        reset("password", "password_confirmation", "avatar");
        setAvatarPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      },
    });
  };

  return (
    <div className="flex h-screen bg-amber-50 overflow-hidden">
      <NavbarMinimalColored />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="Edit Profile" />

        <div className="max-w-3xl mx-auto my-10 px-6">
          <div className="bg-white rounded-3xl shadow p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Edit Your Profile
            </h1>

            {flash?.status && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">
                {flash.status}
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className={`w-full border px-3 py-2 rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  readOnly
                  disabled
                  className="w-full border border-gray-300 bg-gray-100 text-gray-500 px-3 py-2 rounded cursor-not-allowed"
                />
              </div>

              {/* Avatar Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <label htmlFor="avatar-upload" className="relative group cursor-pointer">
                    <img
                      src={avatarPreview || user.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full border object-cover group-hover:opacity-80 transition"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="text-white text-xs">Change</span>
                    </div>
                    <input
                      id="avatar-upload"
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <span className="text-sm text-gray-500">
                    {avatarPreview ? "New Avatar" : "Current Avatar"}
                  </span>
                </div>
                {errors.avatar && <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>}
              </div>

              <hr className="my-6" />

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className={`w-full border px-3 py-2 rounded ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  autoComplete="new-password"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className={`w-full border px-3 py-2 rounded ${
                    errors.password_confirmation || localErrors.password_confirmation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  autoComplete="new-password"
                />
                {(errors.password_confirmation || localErrors.password_confirmation) && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password_confirmation || localErrors.password_confirmation}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <IconDeviceFloppy size={18} />
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => router.visit("/profile")}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  <IconArrowBack size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditProfile.layout = (page) => <Layout>{page}</Layout>;
