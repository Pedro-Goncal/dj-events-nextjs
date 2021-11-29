import { useState } from 'react';
import Image from 'next/image';

//Utils
import { API_URL } from '../config/index';

//Styles
import styles from '../styles/Form.module.css';

const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => imageUploaded())
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
      {image && (
        <div>
          <Image src={imagePreview} height={100} width={170} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
