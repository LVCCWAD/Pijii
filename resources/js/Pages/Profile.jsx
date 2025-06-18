import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Layout from "../layouts/Layout";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function Profile() {
  const { user } = usePage().props;

  const handleDelete = (e) => {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      router.delete("/profile/delete");
    }
  };

  return (
    <div className="flex h-screen piji-green overflow-hidden">
      <NavbarMinimalColored />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="My Profile" />

        <div className="max-w-4xl w-full mx-auto mt-10 mb-16 px-10 py-12 bg-white rounded-3xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            My Profile
          </h1>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Avatar + Basic Info */}
            <div className="flex flex-col items-center">
              <img
                src={user?.avatar} 
                alt="Avatar"
                className="w-36 h-36 rounded-full object-cover border-4 border-amber-200 shadow"
              />
              <p className="text-2xl font-semibold text-gray-900 mt-4">
                {user.name}
              </p>
              <p className="text-gray-600">{user.email}</p>

              {user.email_verified_at ? (
                <p className="text-green-600 font-medium mt-2 text-sm">
                  ✅ Verified on{" "}
                  {new Date(user.email_verified_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              ) : (
                <p className="text-red-500 font-medium mt-2 text-sm">
                  ❌ Email not verified
                </p>
              )}
            </div>

            {/* Account Info */}
            <div className="flex-1 w-full space-y-4">
              <div className="bg-amber-100/50 rounded-xl px-6 py-4">
                <p className="text-gray-700 font-medium">
                  <strong>Joined:</strong>{" "}
                  {new Date(user.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-cyan-100/50 rounded-xl px-6 py-4">
                <p className="text-gray-700 font-medium">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(user.updated_at).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/profile/edit"
                  className="flex items-center justify-center gap-2 bg-blue-100 text-blue-800 font-semibold px-5 py-3 rounded-xl hover:bg-blue-200 transition w-full"
                >
                  <IconEdit size={20} />
                  Edit Profile
                </Link>

                <form onSubmit={handleDelete} className="w-full">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-red-100 text-red-700 font-semibold px-5 py-3 rounded-xl hover:bg-red-200 transition w-full"
                  >
                    <IconTrash size={20} />
                    Delete Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.layout = (page) => <Layout>{page}</Layout>;
