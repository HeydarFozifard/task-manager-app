import { priorityOptions, categoryOptions } from "../common/selectOptions";

function TaskModal({
  showModal,
  setShowModal,
  editingTask,
  input,
  setInput,
  priority,
  setPriority,
  category,
  setCategory,
  addTask,
}) {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal" onClick={() => setShowModal(false)}>
          ✖
        </button>

        <h2>{editingTask ? "ویرایش تسک ✏️" : "تسک جدید ✨"}</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="تسک جدید وارد کن..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="task-input"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            {priorityOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.icon} {item.title}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="priority-select"
          >
            {categoryOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.icon} {item.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              addTask();
              setShowModal(false);
            }}
            className="button"
          >
            {editingTask ? "ذخیره تغییرات ✅" : "ذخیره تسک ✅"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
