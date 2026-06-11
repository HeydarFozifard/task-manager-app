import "../App.css";
import { useState } from "react";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortType, setSortType] = useState("newest");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (input.trim() === "") return;

    if (editingTask) {
      try {
        await api.put(`/tasks/${editingTask._id}`, {
          text: input,
          priority: priority,
          category: category,
          completed: editingTask.completed,
          pinned: editingTask.pinned,
        });

        await fetchTasks();

        toast.info("تسک ویرایش شد ✏️");

        setEditingTask(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await api.post("/tasks", {
          text: input,
          priority: priority,
          category: category,
        });

        await fetchTasks();

        toast.success("تسک اضافه شد 😄");
      } catch (error) {
        console.log(error);
      }
    }

    setInput("");

    setShowModal(false);
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      await fetchTasks();

      toast.error("تسک حذف شد 🗑️");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        text: task.text,
        priority: task.priority,
        category: task.category,
        completed: !task.completed,
        pinned: task.pinned,
      });

      await fetchTasks();

      toast.success("وضعیت تسک تغییر کرد ✅");
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    setInput(task.text);

    setPriority(task.priority);

    setCategory(task.category);

    setEditingTask(task);

    setShowModal(true);
  };

  const pinTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        text: task.text,
        priority: task.priority,
        category: task.category,
        completed: task.completed,
        pinned: !task.pinned,
      });

      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.includes(search);

    if (filterStatus === "completed") {
      return matchesSearch && task.completed;
    }

    if (filterStatus === "uncompleted") {
      return matchesSearch && !task.completed;
    }

    return matchesSearch;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // اول تسک‌های سنجاق‌شده
    if (a.pinned && !b.pinned) {
      return -1;
    }

    if (!a.pinned && b.pinned) {
      return 1;
    }

    // بعد مرتب‌سازی‌های فعلی
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortType === "high") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return 0;
  });
  useEffect(() => {
    fetchTasks();
  }, []);

  const token = localStorage.getItem("token");

  const user = token ? jwtDecode(token) : null;
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <nav className="navbar">
        <h3>
          <i>
            <img className="logo" src="./public/tasks.png" alt="logo-image" />
          </i>
        </h3>
        <h2 className="nav-title">
          مدیریت کارهای روزمره خود را به ما بسپارید :)
        </h2>
        <div className="nav-actions">
          <span className="user-name">سلام {user?.name} 👤</span>
          <button onClick={() => setDarkMode(!darkMode)} className="dark-btn">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={handleLogout} className="dark-btn">
            خروج
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <h1 className="title">مدیریت وظایف 📋</h1>

          <div className="input-group">
            <button onClick={() => setShowModal(true)} className="add-task-btn">
              افزودن تسک جدید ➕
            </button>
            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <button
                    className="close-modal"
                    onClick={() => setShowModal(false)}
                  >
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
                      <option value="low">🟢 کم اهمیت</option>

                      <option value="medium">🟡 متوسط</option>

                      <option value="high">🔴 مهم</option>
                    </select>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="priority-select"
                    >
                      <option value="personal">👤 شخصی</option>

                      <option value="university">🎓 دانشگاه</option>

                      <option value="work">💼 کاری</option>

                      <option value="shopping">🛒 خرید</option>
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
            )}
          </div>
          <div className="stats">
            <div className="stat-box">📋 تعداد کل وظایف : {tasks.length}</div>
          </div>
          <div className="progress-section">
            <div className="progress-info"> 📈 میزان پیشرفت: {progress}%</div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="جستجوی تسک‌ها..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="container_tabs">
            <div className="tabs">
              <button
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "tab active-tab" : "tab"}
              >
                📋 همه
              </button>

              <button
                onClick={() => setFilterStatus("completed")}
                className={
                  filterStatus === "completed" ? "tab active-tab" : "tab"
                }
              >
                ✅ انجام شده
              </button>

              <button
                onClick={() => setFilterStatus("uncompleted")}
                className={
                  filterStatus === "uncompleted" ? "tab active-tab" : "tab"
                }
              >
                ⏳ انجام نشده
              </button>
            </div>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="sort-select"
            >
              <option value="newest">جدیدترین</option>

              <option value="oldest">قدیمی‌ترین</option>

              <option value="high">اولویت زیاد</option>
            </select>
          </div>

          <div className="task-list">
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <div
                  key={task._id}
                  className={
                    task.completed ? "task-item completed" : "task-item"
                  }
                >
                  <div className="task-top">
                    <div className="pin-icon">{task.pinned && "📌"}</div>
                    <h3 className="task-title">{task.text}</h3>
                    <button onClick={() => pinTask(task)} className="pin-btn">
                      {task.pinned ? "📌 سنجاق شده" : "📍 سنجاق کن"}
                    </button>
                  </div>

                  <div className="task-details">
                    <span>
                      📅 تاریخ:
                      {new Date(task.createdAt).toLocaleDateString("fa-IR")}
                    </span>

                    <span>
                      🕒 ساعت ثبت:
                      {new Date(task.createdAt).toLocaleTimeString("fa-IR")}
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

                    <button onClick={() => editTask(task)} className="edit-btn">
                      ویرایش
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="delete-btn"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📭</div>

                <h2>تسکی پیدا نشد</h2>

                <p>یه تسک جدید اضافه کن ✨</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Dashboard;
