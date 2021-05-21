import { useRouter } from 'next/router';
import { Form } from 'portal';

const SearchForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (q) => {
    router.push({
      pathname: '/search',
      query: { q },
    });
  };
  return (
    <>
      <Form handleSubmit={handleSubmit} />
    </>
  );
};

export default SearchForm;
