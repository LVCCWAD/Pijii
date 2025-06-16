import { useState, useEffect } from "react";
import { Link, usePage, useForm } from "@inertiajs/react";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import Layout from "../layouts/Layout";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import ProjectCard from "../layouts/components/Project_Card.jsx";

import {
  IconCalendarPlus,
  IconFlag,
  IconMessageCircleQuestion,
  IconUsers,
  IconX,
  IconBell,
  IconCategory,
  IconPlus,
} from "@tabler/icons-react";

export default function Dashboard() {
  const { user, categories, flash } = usePage().props;
  const [showNotif, setShowNotif] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFlash, setShowFlash] = useState(!!flash?.success);

  useEffect(() => {
    if (flash?.success) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash?.success]);

  const form = useForm({
    name: "",
  });

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
          {/* Left greeting + sprite */}
          <div className="relative flex flex-col lg:flex-row bg-white flex-1 rounded-3xl drop-shadow-md px-6 py-4 min-h-[270px] overflow-visible">
            <div className="flex flex-col justify-start gap-5 z-10 lg:pr-[330px]">
              <div>
                <h1 className="text-3xl font-extrabold">Hi, {user.name}</h1>
                <p className="text-2xl font-semibold">
                  What are we doing <br className="hidden md:inline" /> today?
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-2 w-[300px] sm:w-[400px]">
                <Link className="flex items-center gap-1 -mt-2 cursor-pointer" href="/calendar">
                  <IconCalendarPlus size={24} color="royalblue" />
                  Check Calendar
                </Link>
                <Link className="flex items-center gap-1 cursor-pointer" href="/collaborations">
                  <IconUsers size={24} color="green" />
                  Collaboration Projects
                </Link>
                <Link className="flex items-center gap-1 mt-2 cursor-pointer" href="/tasks?urgent=1">
                  <IconFlag size={24} color="darkorange" />
                  Urgent Tasks
                </Link>
                <Link className="flex items-center gap-1 mt-2 cursor-pointer" href="/ask">
                  <IconMessageCircleQuestion size={24} />
                  Ask Piji
                </Link>
              </div>
            </div>

            <img
              src="/images/PIJI SPRITE1.png"
              alt="Sprite"
              className="absolute right-2 -top-[127px] w-[300px] md:w-[340px] lg:w-[360px] h-auto object-contain scale-x-[-1] pointer-events-none z-0"
            />
          </div>

          {/* Notifications section */}
          <div className="flex flex-col flex-1 rounded-3xl drop-shadow-md bg-white px-5 py-4 min-h-[270px]">
            <Link href="/notifications" className="cursor-pointer">
              <div className="flex items-center gap-4">
                <IconBell size={28} />
                <h1 className="text-3xl font-bold">Notifications</h1>
              </div>
            </Link>

            {showNotif && (
              <div className="bg-blue-300 flex items-center justify-between h-[60px] rounded-2xl drop-shadow-md px-5 mt-4">
                Notification 1
                <button onClick={() => setShowNotif(false)} className="cursor-pointer">
                  <IconX />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories section */}
        <div className="flex flex-col gap-2 rounded-3xl drop-shadow-md bg-white mx-4 px-5 py-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <IconCategory size={28} />
              <h1 className="text-3xl font-bold">Categories</h1>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="text-white bg-green-600 hover:bg-green-700 transition px-3 py-2 rounded-full flex items-center gap-1 cursor-pointer"
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
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
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
