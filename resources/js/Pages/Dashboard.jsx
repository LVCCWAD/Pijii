import { useState, useEffect } from "react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import Layout from "../layouts/Layout";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import ProjectCard from "../layouts/components/Project_Card.jsx";
import {
  IconCalendar,
  IconFlag,
  IconMessageCircleQuestion,
  IconBell,
  IconCategory,
  IconPlus,
  IconX,
  IconInfoCircle,
} from "@tabler/icons-react";

function timeAgo(dateString) {
  const now = new Date();
  const created = new Date(dateString);
  const diffInSeconds = Math.floor((now - created) / 1000);
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute(s) ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour(s) ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} day(s) ago`;
  return created.toLocaleDateString();
}

export default function Dashboard() {
  const { user, categories, flash, notifications = [] } = usePage().props;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFlash, setShowFlash] = useState(!!flash?.success);
  const form = useForm({ name: "" });

  useEffect(() => {
    if (flash?.success) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash?.success]);

  function submit(e) {
    e.preventDefault();
    form.post("/categories", {
      onSuccess: () => {
        form.reset("name");
        setShowCreateForm(false);
      },
    });
  }

  return (
    <div className="piji-green flex w-screen h-screen bg-amber-50 overflow-hidden">
      <NavbarMinimalColored />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="Dashboard" />

        {/* Greeting + Notifications */}
        <div className="flex flex-col lg:flex-row gap-4 px-4 py-4">
          {/* Greeting Card */}
          <div className="relative flex flex-col bg-white w-full lg:w-[60%] rounded-3xl drop-shadow-md px-6 py-4 min-h-[250px] overflow-visible">
            <div className="flex flex-col justify-start gap-5 z-10 pr-0 sm:pr-[60px] md:pr-[80px] lg:pr-[140px] xl:pr-[160px] 2xl:pr-[180px]">
              <div>
                <h1 className="text-3xl font-extrabold">Hi, {user.name}</h1>
                <p className="text-2xl font-semibold">
                  What are we doing <br className="hidden md:inline" /> today?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 w-[300px] sm:w-[400px]">

                <Link className="flex items-center gap-1 hover:underline hover:text-blue-700 transition" href="/Pijii-App">
                  <IconInfoCircle size={24} color="blue" />
                  About Pijii
                </Link>
              
                <Link className="flex items-center gap-1 mt-2 hover:underline hover:text-orange-700 transition" href="/urgent">
                  <IconFlag size={24} color="darkorange" />
                  Urgent Tasks
                </Link>

                <div className="flex items-center text-gray-500 gap-1 mt-2">
                  <IconCalendar size={24} color="gray" />
                  <span className="whitespace-nowrap">Calendar (Soon)</span>
                </div>
                
                <div className="flex items-center text-gray-500 gap-1 mt-2">
                  <IconMessageCircleQuestion size={24} color="gray" />
                  Ask Pijii (Soon)
                </div>
              </div>
            </div>
            <img
              src="/images/PIJI SPRITE1.png"
              alt="Sprite"
              className="absolute right-2 -top-[127px] w-[300px] md:w-[340px] lg:w-[360px] object-contain scale-x-[-1] pointer-events-none z-0"
            />
          </div>

          {/* Notifications */}
          <div className="flex flex-col w-full lg:w-[40%] min-w-0 rounded-3xl drop-shadow-md bg-white px-5 py-4 min-h-[270px] shrink-0">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <IconBell size={28} />
                <h1 className="text-3xl font-bold">Notifications</h1>
              </div>
              <Link
                href="/notifications"
                className="text-sm font-medium p-1 rounded hover:bg-gray-100 hover:text-orange-700 transition"
              >
                See all...
              </Link>
            </div>

            {notifications.length > 0 ? (
              <div className="mt-4 flex flex-col gap-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-blue-100 w-full flex items-center justify-between rounded-2xl drop-shadow px-4 py-2 hover:bg-blue-200 transition cursor-pointer"
                    onClick={() => {
                      router.visit(`/notifications?highlight=${notif.id}`);
                    }}                    
                    title={notif.message}
                  >
                    <div className="flex flex-col w-full overflow-hidden">
                      <span className="font-medium truncate text-gray-800">
                        {notif.message}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 truncate">
                        {timeAgo(notif.created_at)}
                      </span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        router.patch(`/notifications/${notif.id}/mark-read`);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-red-100 cursor-pointer"
                      title="Mark as read"
                    >
                      <IconX size={20} stroke={2.2} className="text-gray-500 hover:text-red-600 transition" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-gray-500 text-lg">No notifications yet.</p>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col gap-2 rounded-3xl drop-shadow-md bg-white mx-4 px-5 py-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <IconCategory size={28} />
              <h1 className="text-3xl font-bold">Categories</h1>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="text-white cursor-pointer bg-green-600 hover:bg-green-700 transition px-3 py-2 rounded-full flex items-center gap-1"
            >
              <IconPlus size={20} />
              Add Category
            </button>
          </div>

          {showFlash && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mt-3 font-semibold transition-opacity duration-500">
              {flash.success}
            </div>
          )}

          {showCreateForm && (
            <form
              onSubmit={submit}
              className="flex flex-col md:flex-row gap-4 mt-4"
              noValidate
            >
              <input
                type="text"
                name="name"
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
                required
                placeholder="New Category Name"
                className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={form.processing}
                className="bg-green-600 cursor-pointer text-white py-3 px-6 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                Create
              </button>
              {form.errors.name && (
                <div className="text-red-600 mt-1 text-sm">{form.errors.name}</div>
              )}
            </form>
          )}

          <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-4">
            {categories.length ? (
              categories.map((category, idx) => (
                <ProjectCard
                  key={category.id}
                  title={category.name.toUpperCase()}
                  badgeNumber={category.projects.length}
                  projects={category.projects}
                  categoryId={category.id}
                  badgeColor="bg-white"
                  cardBg={
                    idx % 3 === 0
                      ? "piji-orange-1"
                      : idx % 3 === 1
                      ? "piji-cyan-1"
                      : "piji-green-1"
                  }
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">You have no categories yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
