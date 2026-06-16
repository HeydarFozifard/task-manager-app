function TaskFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  sortType,
  setSortType,
}) {
  return (
    <>
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
            className={filterStatus === "completed" ? "tab active-tab" : "tab"}
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
    </>
  );
}

export default TaskFilters;
