import { useState } from "react";
import { useWishlist } from "./useWishlist";

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function App() {
  const { account, wishes, loading, error, isOwner, connect, addWish, fulfillWish, deleteWish } = useWishlist();
  const [newWish, setNewWish] = useState("");

  async function handleAdd() {
    if (!newWish.trim()) return;
    await addWish(newWish);
    setNewWish("");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        background: "white",
        borderRadius: 20,
        padding: 32,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <h1 style={{ margin: 0, fontSize: 28, color: "#333" }}>
          🌟 My Wishlist
        </h1>
        <p style={{ color: "#888", marginTop: 4 }}>Powered by Ethereum Sepolia</p>

        {!account ? (
          <button onClick={connect} style={{
            marginTop: 24,
            padding: "12px 24px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
            width: "100%"
          }}>
            🦊 Connect MetaMask
          </button>
        ) : (
          <>
            <div style={{
              marginTop: 16,
              padding: "8px 16px",
              background: "#f0f4ff",
              borderRadius: 8,
              fontSize: 13,
              color: "#555",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>👛 {account.slice(0, 6)}...{account.slice(-4)}</span>
              {isOwner && <span style={{ color: "#764ba2", fontWeight: 600 }}>👑 Owner</span>}
            </div>

            {error && (
              <div style={{
                marginTop: 12,
                padding: "10px 16px",
                background: "#fff0f0",
                border: "1px solid #ffcccc",
                borderRadius: 8,
                color: "#cc0000",
                fontSize: 14
              }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              <input
                value={newWish}
                onChange={e => setNewWish(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
                placeholder="Add a wish..."
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  fontSize: 15,
                  outline: "none"
                }}
              />
              <button onClick={handleAdd} disabled={loading} style={{
                padding: "10px 20px",
                background: loading ? "#ccc" : "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer"
              }}>
                {loading ? "⏳" : "Add"}
              </button>
            </div>

            <div style={{ marginTop: 24 }}>
              {wishes.length === 0 && (
                <p style={{ color: "#aaa", textAlign: "center" }}>No wishes yet. Add your first one! ✨</p>
              )}
              {wishes.map((wish, i) => (
                <div key={i} style={{
                  padding: "14px 16px",
                  margin: "8px 0",
                  background: wish.isFullfilled ? "#f0fff4" : "#fafafa",
                  border: `1px solid ${wish.isFullfilled ? "#b2dfdb" : "#eee"}`,
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{
                      textDecoration: wish.isFullfilled ? "line-through" : "none",
                      color: wish.isFullfilled ? "#888" : "#333",
                      fontSize: 16
                    }}>
                      {wish.isFullfilled ? "✅" : "🌟"} {wish.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                      {formatDate(wish.createdAt)}
                    </div>
                  </div>

                  {isOwner && (
                    <div style={{ display: "flex", gap: 6 }}>
                      {!wish.isFullfilled && (
                        <button onClick={() => fulfillWish(i)} disabled={loading} style={{
                          padding: "6px 12px",
                          background: "#e8f5e9",
                          color: "#2e7d32",
                          border: "1px solid #c8e6c9",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13
                        }}>
                          Complete
                        </button>
                      )}
                      <button onClick={() => deleteWish(i)} disabled={loading} style={{
                        padding: "6px 12px",
                        background: "#fff0f0",
                        color: "#c62828",
                        border: "1px solid #ffcdd2",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontSize: 13
                      }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;