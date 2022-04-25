
import { useState, useEffect } from 'react';
import useFetch from 'common/hooks/useFetch';

import { FiEdit, FiTrash2 } from "react-icons/fi";

const ListFiles = () => {
  const URI = 'https://api.uploadcare.com/files/';
  const headers = {
    "Authorization": `Uploadcare.Simple ${process.env.REACT_APP_UPLOADCARE_API_PUBLIC_KEY}:${process.env.REACT_APP_UPLOADCARE_API_SECRET_KEY}`
  };
  
  const {data, loading, error} = useFetch(URI, { headers });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (data.results) {
      setFiles(data.results);
      console.log(data.results);
    }
  }, [loading]);

  return (
    <div>
      <h1>Gallery</h1>
      <ul className="uc-list-images">
        {loading && <li>Loading...</li>}
        {error && <li>Error: {error.message}</li>}
        {files.length > 0 && files.map(file => (
          <li key={file.uuid} className="item">
            <div className="header">
              <span>{file.original_filename}</span>
              <div className="actions">
                <span className="icon"><FiEdit /></span>
                <span className="icon"><FiTrash2 /></span>
              </div>
            </div>
            <div className="file">
              <img src={file.original_file_url} alt={file.original_filename} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFiles;