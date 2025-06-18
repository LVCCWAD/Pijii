import { Title, Text, Stack, Divider, Button } from '@mantine/core';
import { Link } from '@inertiajs/react';
import '../../css/components/AboutLanding.css';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-green-100 px-4 py-12 flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-7xl">

        {/* Left: Pigeon Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/pigeon.png"
            alt="Pijii Mascot"
            className="w-[300px] md:w-[420px] lg:w-[480px] drop-shadow-xl"
          />
        </div>

        {/* Right: Content Panel */}
        <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl px-16 py-20 text-center">
          <Stack spacing="xl">
            <Title order={1} className="text-5xl text-green-800 font-extrabold tracking-tight leading-tight">
              Welcome to Pijii
            </Title>

            <Text size="md" className="text-gray-700 text-lg leading-relaxed font-medium">
              A peaceful, web-based task manager to organize your life without chaos. Group your work, track your progress, and stay focused.
            </Text>

            <Divider className="mx-auto max-w-[200px]" />

            <div className="text-left">
              <div className="text-blue-900 mb-1 font-bold text-xl">
                How It Works
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-start items-start text-left">
              <Stack spacing="md" className="text-gray-800 text-[16px] leading-relaxed">
                <Text><strong>• Categories:</strong> Organize by Personal, School, or Work.</Text>
                <Text><strong>• Projects & Subprojects:</strong> Break goals down into manageable pieces.</Text>
                <Text><strong>• Tasks:</strong> Set deadlines, add priority flags, and track progress.</Text>
                <Text><strong>• Reminders:</strong> Get timely alerts so nothing slips through the cracks.</Text>
              </Stack>
            </div>

            <Text size="sm" className="text-gray-600 pt-6 italic">
              Calm. Focused. Flexible. That’s the Pijii way.
            </Text>

            {/* Try Pijii Now Button */}
            <div className="pt-4">
              <Link href="/">
                <Button size="md" radius="xl" color="teal" variant="filled">
                  Try Pijii Now
                </Button>
              </Link>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}

Landing.layout = (page) => page;
