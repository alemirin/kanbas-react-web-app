export default function DeleteWindow({
  quizName,
  onCancel,
  onConfirm,
}: {
  quizName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Are you sure you want to delete this quiz?</h4>
        <p>{quizName}</p>
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
