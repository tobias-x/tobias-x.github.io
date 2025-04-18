import About from '../components/About';
import { SoftwarePortfolio, ArtworkPortfolio, NotesPortfolio } from '../components/Portfolio';
import TimeSeries from '../components/TimeSeries';
import Layout from '../components/Layout';
import ArtworkVisual from '../components/ArtworkVisual';
import BackToTopButton from '../components/BackToTop';

export default function Home() {
  return (
    <Layout className="bg-black"> {/* Black background for the entire layout */}
      <About />
      <BackToTopButton />
      <TimeSeries />
      <SoftwarePortfolio />
      <ArtworkVisual />
      <NotesPortfolio />
    </Layout>
  );
}
