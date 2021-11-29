import Layout from '../../components/Layout';

//Config
import { API_URL, PER_PAGE } from '../../config/index';

//Components
import EventItem from '../../components/eventItem';
import Pagination from '../../components/Pagination';

const EventsPage = ({ events, page, total }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events?.length === 0 && <h3>No Events to Show</h3>}
      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }) {
  //Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetch total Count of events
  const total = await fetch(`${API_URL}/events/count`).then((res) =>
    res.json()
  );

  //Fetch events
  const events = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  ).then((res) => res.json());

  return {
    props: { events, page: +page, total },
  };
}

export default EventsPage;
