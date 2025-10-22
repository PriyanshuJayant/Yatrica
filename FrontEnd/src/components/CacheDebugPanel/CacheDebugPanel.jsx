import React, { useState, useEffect } from 'react';
import { cacheManager } from '../../utils/CacheManager';
import { indexedDBManager } from '../../utils/IndexedDBManager';

/**
 * CacheDebugPanel Component
 * Development tool to visualize and manage cache
 * Only visible in development mode
 */
export function CacheDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [indexedDBStats, setIndexedDBStats] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Only show in development
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!isDev || !isOpen) return;

    const updateStats = async () => {
      const cacheStats = cacheManager.getStats();
      const dbStats = await indexedDBManager.getStats();
      setStats(cacheStats);
      setIndexedDBStats(dbStats);
    };

    updateStats();

    if (autoRefresh) {
      const interval = setInterval(updateStats, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen, autoRefresh, isDev]);

  const handleClearMemory = async () => {
    await cacheManager.clear({ storage: 'memory' });
    alert('✅ Memory cache cleared');
  };

  const handleClearLocal = async () => {
    await cacheManager.clear({ storage: 'localStorage' });
    alert('✅ LocalStorage cache cleared');
  };

  const handleClearSession = async () => {
    await cacheManager.clear({ storage: 'sessionStorage' });
    alert('✅ SessionStorage cache cleared');
  };

  const handleClearIndexedDB = async () => {
    await indexedDBManager.clear();
    alert('✅ IndexedDB cache cleared');
  };

  const handleClearAll = async () => {
    await cacheManager.clear();
    await indexedDBManager.clear();
    alert('✅ All caches cleared');
  };

  const handleResetStats = () => {
    cacheManager.resetStats();
    alert('✅ Statistics reset');
  };

  const handleCleanExpired = async () => {
    const cleaned = await indexedDBManager.cleanExpired();
    alert(`✅ Cleaned ${cleaned} expired entries`);
  };

  if (!isDev) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isOpen ? 0 : -400,
        right: 20,
        width: 500,
        height: 450,
        backgroundColor: '#1a1a1a',
        border: '2px solid #333',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
        transition: 'bottom 0.3s ease',
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: isOpen ? 10 : -35,
          right: 10,
          padding: '6px 12px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? '▼ Close' : '▲ Cache Debug'}
      </button>

      {/* Panel Content */}
      {isOpen && (
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#4CAF50' }}>
              🔍 Cache Monitor
            </h3>
            <label style={{ fontSize: '11px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Auto-refresh
            </label>
          </div>

          {/* Cache Statistics */}
          {stats && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#FFD700' }}>
                📊 Cache Stats
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>Hits: <span style={{ color: '#4CAF50' }}>{stats.hits}</span></div>
                <div>Misses: <span style={{ color: '#f44336' }}>{stats.misses}</span></div>
                <div>Sets: <span style={{ color: '#2196F3' }}>{stats.sets}</span></div>
                <div>Deletes: <span style={{ color: '#FF9800' }}>{stats.deletes}</span></div>
                <div style={{ gridColumn: '1 / -1' }}>
                  Hit Rate: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{stats.hitRate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Storage Sizes */}
          {stats && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#FFD700' }}>
                💾 Storage Usage
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>Memory: <span style={{ color: '#4CAF50' }}>{stats.memorySize} entries</span></div>
                <div>LocalStorage: <span style={{ color: '#2196F3' }}>{stats.localStorageSize}</span></div>
                <div style={{ gridColumn: '1 / -1' }}>
                  SessionStorage: <span style={{ color: '#9C27B0' }}>{stats.sessionStorageSize}</span>
                </div>
              </div>
            </div>
          )}

          {/* IndexedDB Stats */}
          {indexedDBStats && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#FFD700' }}>
                🗄️ IndexedDB
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>Entries: <span style={{ color: '#4CAF50' }}>{indexedDBStats.totalEntries}</span></div>
                <div>Size: <span style={{ color: '#2196F3' }}>{indexedDBStats.totalSize}</span></div>
                <div>Expired: <span style={{ color: '#f44336' }}>{indexedDBStats.expiredCount}</span></div>
                <div>Usage: <span style={{ color: '#FF9800' }}>{indexedDBStats.usagePercent}</span></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '15px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#FFD700' }}>
              ⚡ Actions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button onClick={handleClearMemory} style={buttonStyle}>
                Clear Memory
              </button>
              <button onClick={handleClearLocal} style={buttonStyle}>
                Clear Local
              </button>
              <button onClick={handleClearSession} style={buttonStyle}>
                Clear Session
              </button>
              <button onClick={handleClearIndexedDB} style={buttonStyle}>
                Clear IndexedDB
              </button>
              <button onClick={handleCleanExpired} style={buttonStyle}>
                Clean Expired
              </button>
              <button onClick={handleResetStats} style={buttonStyle}>
                Reset Stats
              </button>
              <button onClick={handleClearAll} style={{ ...buttonStyle, gridColumn: '1 / -1', backgroundColor: '#f44336' }}>
                🗑️ Clear All Caches
              </button>
            </div>
          </div>

          {/* Info */}
          <div style={{ marginTop: '15px', padding: '8px', backgroundColor: '#2a2a2a', borderRadius: '4px', fontSize: '10px', color: '#999' }}>
            💡 This panel is only visible in development mode
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '6px 10px',
  backgroundColor: '#333',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '11px',
  transition: 'background-color 0.2s',
};

export default CacheDebugPanel;
