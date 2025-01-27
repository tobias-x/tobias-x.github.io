import About from '../components/About';
import { SoftwarePortfolio, ArtworkPortfolio } from '../components/Portfolio';
import TimeSeries from '../components/TimeSeries';
import Layout from '../components/Layout';
import ArtworkVisual from '../components/ArtworkVisual';

export default function Home() {
  return (
    <Layout className="bg-black"> {/* Black background for the entire layout */}
      <About />
      <TimeSeries />
      <SoftwarePortfolio />
      <ArtworkVisual />
      <ArtworkPortfolio />
    </Layout>
  );
}
