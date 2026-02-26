import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';

export const metadata = {
  title: 'API Documentation - Accountex 90s',
  description: 'Swagger API documentation for the project.',
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container mx-auto pb-10">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ReactSwagger spec={spec} />
      </div>
    </section>
  );
}
