function Navbar({ darkMode, setDarkMode, handleLogout, user }) {
  return (
    <nav className="navbar">
      <h3>
        <i>
          <img className="logo" src="/tasks.png" alt="logo-image" />
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
  );
}

export default Navbar;
