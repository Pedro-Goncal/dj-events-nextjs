import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

import qs from 'qs';

//Config
import { API_URL } from '../../config/index';

//Components
import EventItem from '../../components/eventItem';

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events"> Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events?.length === 0 && <h3>No Events to Show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const events = await fetch(`${API_URL}/events?${query}`).then((res) =>
    res.json()
  );

  return {
    props: { events },
  };
}

export default SearchPage;