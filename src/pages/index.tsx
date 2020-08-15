import { PageProps } from 'gatsby';
import React from 'react';
import { CubeSelector } from '@/components/CubeSelector';

const Home: React.FC<PageProps> = () => (
  <main>
    <p>Welcome to the Faction Cube Generator!</p>
    <p>Props to Count_Borkula for the idea and original python code!</p>
    <CubeSelector />
  </main>
);

export default Home;
