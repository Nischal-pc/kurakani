import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { PostContext } from "../contexts/postContext";
import "./css/post.css";
import * as $ from "jquery";

export default function CreatePost() {
  const { users, auth } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);
  const [tags, setTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [image, setImage] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!location) return; // Ensure location is defined
      try {
        console.log(process.env);
        const apiKey = "AIzaSyCOEbzx7xbi72TM_g8gRfIxovJGf0-4m-0"; // process.env.GOOGLE_API_KEY;
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${apiKey}`
        );

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setAddresses(data.results.map((result) => result.formatted_address));
        } else {
          console.error("No results found");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchAddresses();
    }, 1000); // Delay of 1 second (1000 ms)

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [location]);

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const promises = fileArray.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        // reader eventlistner
        reader.onloadend = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((images) => {
      setPhotos((photos) => [...photos, ...images]);
    });

    setImage(e.target.value);
  };

  const handleRemoveImage = (index) => {
    setPhotos((photos) => photos.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        location: selectedLocation,
        tags: tags,
        photos: photos,
        caption,
        created_by: auth.user,
      });
      $("#createPostClose").click();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="">
        <div className="">
          <div className="d-flex align-items-center py-2">
            <img src="favicon.ico" alt="" className="pp-img" />
            <div className="text-dark ms-1 fw-bold">
              {users.find((user) => user.email == auth.user.email)?.first_name}{" "}
              {users.find((user) => user.email == auth.user.email)?.last_name}
            </div>
          </div>
        </div>
        <div className="small">
          {selectedLocation && (
            <div className="my-1 small">
              at <i>{selectedLocation}</i>
              <i
                className="ms-2 fa fa-close text-danger cursor-pointer"
                onClick={() => setSelectedLocation(null)}
              ></i>
            </div>
          )}
        </div>
        <div className="row">
          {tags.map((tag, idx) => (
            <div key={idx} className="col-auto pe-0 my-2">
              {idx === 0 && <span className="small">with </span>}
              <div className="badge bg-light text-dark small p-2">
                {tag.first_name} {tag.last_name}{" "}
                <i
                  className="fa fa-close text-danger cursor-pointer"
                  onClick={() =>
                    setTags((tags) => tags.filter((_, index) => index !== idx))
                  }
                ></i>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {photos.map((photo, idx) => (
            <div key={idx} className="col-md-4 my-2 p-1">
              <div className="card p-2 position-relative">
                <img src={photo.url} alt="" className="post-image" />
                <div className="position-absolute end-0">
                  <i
                    className="btn text-danger fa fa-close"
                    onClick={() => handleRemoveImage(idx)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-100 form-control"
            placeholder="What's in your mind?&#129300;"
          ></textarea>
          <input
            type="file"
            id="image"
            multiple={true}
            accept="image/*"
            className="d-none"
            value={image}
            onChange={handleImageChange}
          />
          <div className="d-flex align-items-center mt-2">
            <label htmlFor="image" className="btn btn-light btn-sm me-2">
              <i className="fa fa-image"></i> Photo
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-light btn-sm me-2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user-group"></i> Tags
              </button>
              <ul className="dropdown-menu py-0">
                <li>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Search user..."
                  />
                </li>
                {users
                  .filter((user) => user.email !== auth.user.email)
                  .filter(
                    // filter the tagged not list here
                    (user) => !tags.find((tag) => tag.email === user.email)
                  )
                  .map((user, idx) => (
                    <li
                      key={idx}
                      onClick={() => setTags((tags) => [...tags, user])}
                    >
                      <a
                        className="dropdown-item border-bottom rounded small"
                        href="#"
                      >
                        <i className="fa fa-user-circle"></i> {user.first_name}{" "}
                        {user.last_name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-light btn-sm me-2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-map-marker-alt"></i> Location
              </button>
              <ul className="dropdown-menu py-0">
                <li>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control rounded-0"
                    placeholder="Search google location..."
                  />
                </li>
                {addresses.map((address, idx) => (
                  <li key={idx} onClick={() => setSelectedLocation(address)}>
                    <a className="dropdown-item small" href="#">
                      {address}
                    </a>
                  </li>
                ))}
                {addresses.length === 0 && (
                  <li>
                    <a className="dropdown-item small" href="#">
                      <i className="fa fa-map-marker-alt"></i> No address found!
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              type="button"
              id="createPostClose"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                !(
                  (photos.length > 0) |
                  (caption.trim() !== "") |
                  (selectedLocation !== null) |
                  (tags.length > 0)
                )
              }
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
