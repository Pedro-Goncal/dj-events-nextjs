import Link from 'next/link';
import Image from 'next/image';

//Components
import Layout from '../../components/Layout';

//Utils
import { API_URL } from 'config';

//Styles
import styles from '../../styles/event.module.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const EventPage = ({ evt }) => {
  const router = useRouter();

  const deleteEvent = async (e) => {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((res) => router.push('/events'))
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

// export async function getStaticPaths(){

//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()

//   const paths = events.map(evt => ({
//     params: {slug: evt.slug}
//   }))

//   return {
//     paths
//      falback: false

//   }

// }

export async function getServerSideProps({ query: { slug } }) {
  console.log(slug);

  const res = await fetch(`${API_URL}/events/?slug=${slug}`);

  const events = await res.json();

  return {
    props: { evt: events[0] },
  };
}

export default EventPage;
