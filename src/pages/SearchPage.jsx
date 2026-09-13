import usePlayerSearch from '../hooks/usePlayerSearch';
import SearchPanel from '../components/search/SearchPanel';
import PlayerCard from '../components/player/PlayerCard';

export function SearchPage() {
  const {
    player,
    loading,
    error,
    isDefault,
    handleSearch,
    handleReset,
  } = usePlayerSearch();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 xl:gap-12 items-start">
        {/* Left: Search & Description */}
        <SearchPanel onSearchSubmit={handleSearch} />

        {/* Right: Featured / Searched Player Card */}
        <div className="w-full">
          <PlayerCard
            player={player}
            loading={loading}
            error={error}
            isDefault={isDefault}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
