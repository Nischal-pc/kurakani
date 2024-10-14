import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import "./css/post.css";

export default function CreatePost() {
  const { users } = useContext(AuthContext);
  const [location, setLocation] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [image, setImage] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!location) return; // Ensure location is defined
      try {
        const apiKey = ""; // process.env.GOOGLE_API_KEY;
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
    const previews = fileArray.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then((images) => {
      setPhotos(images);
    });

    setImage(e.target.value);
  };

  return (
    <div>
      <div className="">
        <div className="row">
          {photos.map((photo, idx) => (
            <div key={idx} className="col-md-4 my-2 p-1">
              <div className="card p-2 position-relative">
                <img src={photo.url} alt="" className="post-image" />
                <div className="position-absolute end-0">
                  <i className="btn text-danger fa fa-close"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            rows={4}
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
          <div className="d-flex align-items-center my-1">
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
                {users.map((user, idx) => (
                  <li key={idx}>
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
                  <li key={idx}>
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
        </form>
      </div>
    </div>
  );
}
