import "../App.css";
import { useState } from "react";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import EmptyState from "../common/EmptyState";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import TaskStats from "../components/TaskStats";
import TaskFilters from "../components/TaskFilters";
import useTasks from "../hooks/useTasks";
function Dashboard() {
  const { tasks, fetchTasks } = useTasks();
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

  const token = localStorage.getItem("token");

  const user = token ? jwtDecode(token) : null;
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        handleLogout={handleLogout}
        user={user}
      />

      <div className="container">
        <div className="card">
          <h1 className="title">مدیریت وظایف 📋</h1>

          <div className="input-group">
            <button onClick={() => setShowModal(true)} className="add-task-btn">
              افزودن تسک جدید ➕
            </button>
            <TaskModal
              showModal={showModal}
              setShowModal={setShowModal}
              editingTask={editingTask}
              input={input}
              setInput={setInput}
              priority={priority}
              setPriority={setPriority}
              category={category}
              setCategory={setCategory}
              addTask={addTask}
            />
          </div>
          <TaskStats tasks={tasks} progress={progress} />

          <TaskFilters
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortType={sortType}
            setSortType={setSortType}
          />

          <div className="task-list">
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  toggleTask={toggleTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  pinTask={pinTask}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Dashboard;
