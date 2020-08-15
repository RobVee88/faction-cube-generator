import React from 'react';
import { PageProps } from 'gatsby';

import Title from '@/components/Title';
import { SetDropDown } from '@/components/SetDropDown';

const Home: React.FC<PageProps> = () => (
  <main>
    <Title />
    <p>Welcome to the Faction Cube Generator!</p>
    <p>Props to Count_Borkula for the idea and original python code!</p>
    <SetDropDown />
  </main>
);

export default Home;
