function TaskCard({
  task,
  toggleTask,
  editTask,
  deleteTask,
  pinTask,
}) {
  return (
    <div
      className={
        task.completed
          ? "task-item completed"
          : "task-item"
      }
    >
      <div className="task-top">
        <div className="pin-icon">
          {task.pinned && "📌"}
        </div>

        <h3 className="task-title">
          {task.text}
        </h3>

        <button
          onClick={() => pinTask(task)}
          className="pin-btn"
        >
          {task.pinned
            ? "📌 سنجاق شده"
            : "📍 سنجاق کن"}
        </button>
      </div>

      <div className="task-details">
        <span>
          📅 تاریخ:
          {new Date(
            task.createdAt
          ).toLocaleDateString("fa-IR")}
        </span>

        <span>
          🕒 ساعت ثبت:
          {new Date(
            task.createdAt
          ).toLocaleTimeString("fa-IR")}
        </span>

        <span>
          🎓 دسته‌بندی:
          {task.category === "personal"
            ? "شخصی"
            : task.category === "study"
            ? "دانشگاه"
            : "کاری"}
        </span>

        <span>
          🔥 اولویت:
          {task.priority === "high"
            ? "زیاد"
            : task.priority === "medium"
            ? "متوسط"
            : "کم"}
        </span>
      </div>

      <div className="task-buttons">
        <button
          onClick={() => toggleTask(task)}
          className="complete-btn"
        >
          انجام شد
        </button>

        <button
          onClick={() => editTask(task)}
          className="edit-btn"
        >
          ویرایش
        </button>

        <button
          onClick={() =>
            deleteTask(task._id)
          }
          className="delete-btn"
        >
          حذف
        </button>
      </div>
    </div>
  );
}

export default TaskCard;