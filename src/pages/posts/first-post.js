import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import BackToTopButton from '../../components/BackToTop';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

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
      <Layout className="bg-black text-white">
        <BackToTopButton />
        <br />
        <div className="w-full max-w-[80%] ml-auto text-right px-[10px]">
          <h1 className="text-4xl font-bold mb-4 text-white">The Tokenisation of Sovereignty</h1>
          <h1 className="text-xl font-bold mb-4 text-white">How CBDCs might reshape the economy</h1>
          <p className="text-gray-400 mb-6">April 3, 2025</p>
        </div>
  
        <article className="prose prose-invert text-white pb-24 w-full max-w-none px-4">
          <ReactMarkdown
            components={{
              ul: (props) => (
                <ul className="pl-2 pr-2 list-inside" {...props} />
              ),
              ol: (props) => (
                <ol className="pl-2 pr-2 list-inside" {...props} />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </Layout>
    );
  }
  