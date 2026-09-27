const RadioPlayer = () => {
  return (
    <div className="radio-player">
      <div className="radio-player-progress">
        <div className="radio-player-bar" />
      </div>
      <div className="radio-player-controls">
        <button className="radio-player-btn">▶</button>
        <span className="radio-player-time">1:24 / 3:47</span>
      </div>
    </div>
  );
};

export default RadioPlayer;
