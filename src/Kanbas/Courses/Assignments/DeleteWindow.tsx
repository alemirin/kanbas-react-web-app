export default function DeleteWindow({
  assignmentName,
  onCancel,
  onConfirm,
}: {
  assignmentName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Are you sure you want to delete this assignment?</h4>
        <p>{assignmentName}</p>
        <div className="d-flex justify-content-end">
          <button onClick={onCancel} className="btn btn-secondary me-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
