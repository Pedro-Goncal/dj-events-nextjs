import { useState } from 'react';
import Image from 'next/image';

//Layout HOC
import Layout from '../../../components/Layout';

//Modal
import Modal from '../../../components/Modal';

//Components
import ImageUpload from '../../../components/ImageUpload';

//Router
import { useRouter } from 'next/router';
import Link from 'next/link';

//Utils
import { API_URL } from '../../../config/index';
import moment from 'moment';

//Styles
import styles from '../../../styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';

const EditEventPage = ({ evt }) => {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const imageUplodaded = async (e) => {
    const data = await fetch(`${API_URL}/events/${evt.id}`).then((res) =>
      res.json()
    );
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>{'< '}Go Back</a>
      </Link>
      <ToastContainer />
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <lable htmlFor="name">Event Name</lable>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <lable htmlFor="performers">Performers</lable>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <lable htmlFor="venue">Venue</lable>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <lable htmlFor="address">Address</lable>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <lable htmlFor="date">Date</lable>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <lable htmlFor="time">Time</lable>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <lable htmlFor="description">Event description</lable>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUplodaded} />
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps({ params: { id }, req }) {
  console.log(req.headers.cookie);

  const evt = await fetch(`${API_URL}/events/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  return {
    props: {
      evt,
    },
  };
}

export default EditEventPage;
