function Stats({ player, vida }) {
  return (
    <div className="stats">
      <p>{String(player && player.name ? player.name : '?').toLocaleUpperCase()}</p>
      <span className="text-side">hp<progress max={player.stats[0].base_stat} value={vida} className="health"></progress></span>
      <p>{vida}/{player.stats[0].base_stat}</p>
    </div>
  );
}

export default Stats;