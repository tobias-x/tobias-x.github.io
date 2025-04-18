import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import BackToTopButton from '../../components/BackToTop';
import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'posts', 'first-post.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      markdown: fileContents,
    },
  };
}

export default function TokenisationPost({ markdown }) {
  return (
    <Layout className="bg-black text-white px-6 py-12 max-w-3xl mx-auto">
      <BackToTopButton />
      <br></br>
      <h1 className="text-4xl font-bold mb-4 text-white">The Tokenisation of Sovereignty</h1>
      <h1 className="text-xl font-bold mb-4 text-white">How CBDCs might reshape society</h1>
      <p className="text-gray-400 mb-6">April 3, 2025</p>
      <article className="prose prose-invert text-white pb-24">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </Layout>
  );
}
