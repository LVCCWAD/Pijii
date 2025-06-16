import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import Layout from '../layouts/Layout';
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
} from '@tabler/icons-react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
  const { user, categories } = usePage().props;
  const [showNotif, setShowNotif] = useState(true);

  return (
    <div className="piji-green flex w-screen h-screen bg-amber-50 overflow-hidden">
      <NavbarMinimalColored />

      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="Dashboard" />

        <div className="flex flex-row gap-4 px-4 py-4">
          {/* Left Section */}
          <div className="relative bg-white flex flex-row flex-1 max-w-[80%] h-[270px] rounded-3xl drop-shadow-md px-6 py-4 overflow-visible">
            <div className="flex flex-col gap-5 z-10 pr-[330px]">
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold">Hi, {user.name}</h1>
                <p className="text-2xl font-semibold">
                  What are we doing <br />
                  today?
                </p>
              </div>

              <div className="flex flex-row">
                <div className="grid grid-cols-2 w-[400px]">
                  <Link className="flex items-center gap-1 mt-[-20px]">
                    <IconCalendarPlus size={24} color="royalblue" /> Check Calendar
                  </Link>
                  <Link className="flex gap-1">
                    <IconUsers size={24} color="green" /> Check Collaboration projects
                  </Link>
                  <Link className="flex items-center gap-1 mt-[20px]">
                    <IconFlag size={24} color="darkorange" /> Check Urgent Tasks
                  </Link>
                  <Link className="flex items-center gap-1 mt-[20px]">
                    <IconMessageCircleQuestion size={24} /> Ask Piji
                  </Link>
                </div>
              </div>
            </div>

            {/* Piji Sprite */}
            <div className="absolute right-[10px] top-[-127px] w-[360px] h-[400px] z-0 pointer-events-none">
              <img
                src="/images/PIJI SPRITE1.png"
                alt="Sprite"
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="flex flex-col max-w-[45%] flex-1 h-[270px] rounded-3xl drop-shadow-md bg-white px-5 py-2">
            <Link href="/Notifications">
              <div className="flex flex-row gap-4">
                <div className="mt-[6px]">
                  <IconBell size={28} />
                </div>
                <h1 className="text-4xl font-bold">Notifications</h1>
              </div>
            </Link>

            {showNotif && (
              <div className="bg-blue-300 flex flex-row items-center justify-between w-full h-[60px] rounded-2xl drop-shadow-md px-5 mt-4">
                Notification 1
                <a href="#" onClick={() => setShowNotif(false)}>
                  <IconX />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2 rounded-3xl drop-shadow-md bg-white mx-4 px-5 py-2">
          <div className="flex flex-row gap-2 ml-2">
            <div className="mt-[6px]">
              <IconCategory size={28} />
            </div>
            <h1 className="text-4xl font-bold">Categories</h1>
          </div>

          <div className="flex flex-wrap justify-start gap-5 mt-4">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <ProjectCard
                  key={category.id}
                  title={category.name.toUpperCase()}
                  badgeNumber={category.projects.length}
                  badgeColor="bg-white"
                  cardBg={
                    index % 3 === 0
                      ? 'piji-orange-1'
                      : index % 3 === 1
                      ? 'piji-cyan-1'
                      : 'piji-green-1'
                  }
                />
              ))
            ) : (
              <p className="text-gray-500">You have no categories yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
