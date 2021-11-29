import Link from 'next/link';
import Layout from '../components/Layout';

//Config
import { API_URL } from '../config/index';

//Components
import EventItem from '../components/EventItem';

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No Events to Show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const events = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`).then(
    (res) => res.json()
  );

  return {
    props: { events },
  };
}

export default HomePage;
