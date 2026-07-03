import { Contact } from '../components/Contact';
import { Hero } from '../components/Hero';
import { ImpactStats } from '../components/ImpactStats';
import { News } from '../components/News';
import { Partners } from '../components/Partners';
import { Programs } from '../components/Programs';
import { SuccessStories } from '../components/SuccessStories';

interface HomePageProps {
  setCurrentPage: (p: string) => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <ImpactStats />
      <Programs setCurrentPage={setCurrentPage} />
      <SuccessStories setCurrentPage={setCurrentPage} />
      <News setCurrentPage={setCurrentPage} />
      <Partners setCurrentPage={setCurrentPage} />
      <Contact />
    </>
  );
}