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
        <button
          className="close-modal"
          onClick={() =>
            setShowModal(false)
          }
        >
          ✖
        </button>

        <h2>
          {editingTask
            ? "ویرایش تسک ✏️"
            : "تسک جدید ✨"}
        </h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="تسک جدید وارد کن..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="task-input"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="priority-select"
          >
            <option value="low">
              🟢 کم اهمیت
            </option>

            <option value="medium">
              🟡 متوسط
            </option>

            <option value="high">
              🔴 مهم
            </option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="priority-select"
          >
            <option value="personal">
              👤 شخصی
            </option>

            <option value="university">
              🎓 دانشگاه
            </option>

            <option value="work">
              💼 کاری
            </option>

            <option value="shopping">
              🛒 خرید
            </option>
          </select>

          <button
            onClick={() => {
              addTask();
              setShowModal(false);
            }}
            className="button"
          >
            {editingTask
              ? "ذخیره تغییرات ✅"
              : "ذخیره تسک ✅"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;