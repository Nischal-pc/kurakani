import CreatePost from "./createPost";

export default function Home() {
  return (
    <div>
      <h1>Welcome to my home page</h1>

      <div
        className="modal fade"
        id="createPostModal"
        tabIndex="-1"
        aria-labelledby="createPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createPostModalLabel">
                <i className="fa fa-edit"></i> Create Post
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreatePost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
