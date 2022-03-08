import { Fragment } from "react";

const ModalConfirm = (props) => {

  const responseHandler = () => {
    const id = props.id
    props.onModalResponse(id)
   }

 
  
  return (
    <Fragment>
      {/*<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>*/}

      <div
        className="modal fade"
        id="modalConfirm"
        tabIndex="-1"
        aria-labelledby="modalConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalConfirmLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="No"
              ></button>
            </div>
            <div className="modal-body">{props.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={responseHandler}
              
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalConfirm;