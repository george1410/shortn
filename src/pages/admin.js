import { Container } from '@chakra-ui/react';
import CreateForm from '../components/CreateForm';
import Header from '../components/Header';
import ItemsTable from '../components/ItemsTable';
import Url from '../models/Url';

const PAGE_SIZE = 5;

export default function Home({
  urls: initialUrls,
  totalPages: initialTotalPages,
}) {
  return (
    <>
      <Header />

      <Container maxWidth={1280} mt={10}>
        <CreateForm />
        <ItemsTable
          initialUrls={initialUrls}
          initialTotalPages={initialTotalPages}
        />
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const limit = PAGE_SIZE,
    offset = 0;

  const { rows: urls, count } = await Url.findAndCountAll({
    order: [['clicks', 'DESC']],
    limit,
    offset,
  });

  return {
    props: {
      urls: urls.map((url) => url.toJSON()),
      totalPages: Math.ceil(count / PAGE_SIZE),
    },
  };
};
