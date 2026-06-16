function TaskStats({
  tasks,
  progress,
}) {
  return (
    <>
      <div className="stats">
        <div className="stat-box">
          📋 تعداد کل وظایف : {tasks.length}
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          📈 میزان پیشرفت: {progress}%
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default TaskStats;