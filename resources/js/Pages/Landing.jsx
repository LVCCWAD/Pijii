import { Carousel } from '@mantine/carousel';
import { Button, Title, Text, Container, Stack, Image } from '@mantine/core';
import { Link } from '@inertiajs/react';
import '../../css/components/AboutLanding.css';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-green-100 p-10 flex flex-col justify-center items-center">
      
      <Container size="md" className="text-center">
        <Title order={1} className="text-4xl text-blue-800 mb-4">Welcome to PijiApp</Title>
        <Text size="lg" className="text-gray-700 mb-6">
          Discover a chill and productive environment with features that help you organize tasks, collaborate, and chill — all in one place.
        </Text>

            <div style={{ height: 260, width: '100%' }} className="w-full max-w-4xl mx-auto">
              <Carousel
                slideSize="100%"
                height={250}
                slideGap="md"
                loop
                withIndicators
                withControls 
                controlSize={30}
                className="carousel-section flex-col flex"
              >  
              <div className="flex w-[100%] md:w-[100%] flex-row overflow-hidden"> 
                <Carousel.Slide>
                  <Image src="/img/feature1.png" alt="Feature 1" radius="md" />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Image src="/img/feature2.png" alt="Feature 2" radius="md" />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Image src="/img/feature3.png" alt="Feature 3" radius="md" />
                </Carousel.Slide>
                </div>
              </Carousel>
            </div>
        <Stack spacing="md" className="items-center">
          <Link to="/Login">
            <Button size="md" color="blue" radius="xl" variant="light">
              Sign In
            </Button>
          </Link>
          <Link to="/Register">
            <Button size="md" color="orange" radius="xl" variant="filled">
              Register
            </Button>
          </Link>
        </Stack>
      

      </Container>
  </div>
  );
}

Landing.layout = (page) => page;

















// import Layout from "../../layouts/Layout";
// import navbar from "../../layouts/mantine/navbar";


// Landing.layout = page => <Layout Children={page} />
// Landing.navbar = page => <Layout children={page} />

// Landing.layout = (page) => page;

