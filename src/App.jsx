"use client"

import { useState } from "react"
import "./App.css"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function App() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError(null)
    setUserData(null)

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/lookup-email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.data && data.data.length > 0) {
        setUserData(data.data[0])
      } else {
        setError("No data found for this email address")
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching data")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const parseBadges = (badgeString) => {
    if (!badgeString || badgeString.trim() === "") return []
    return badgeString.split("|").map((badge) => badge.trim())
  }

  const getStatusClass = (status) => {
    if (status === "Yes" || status === "All Good") return "success"
    if (status === "No") return "danger"
    return "warning"
  }

  const skillBadgesCompleted = userData?.["# of Skill Badges Completed"] || 0
  const arcadeGamesCompleted = userData?.["# of Arcade Games Completed"] || 0
  const skillBadgesPercentage = (skillBadgesCompleted / 19) * 100
  const arcadeGamesPercentage = (arcadeGamesCompleted / 1) * 100

  const getLastUpdatedTime = () => {
    const now = new Date()
    const currentHour = now.getHours()
    
    // If time is after 12:00 PM (noon), use previous day at 11:59 PM
    // Otherwise, use day before previous day at 11:59 PM
    const daysToSubtract = currentHour >= 15 ? 1 : 2
    
    const lastUpdated = new Date(now)
    lastUpdated.setDate(lastUpdated.getDate() - daysToSubtract)
    lastUpdated.setHours(23, 59, 0, 0)
    
    return lastUpdated.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎓 GCP Cohort IIITA</h1>
        <p>Made with ❤️ by Ritesh N Das</p>
        <p className="last-updated">Last Updated: {getLastUpdatedTime()}</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? "Searching..." : "Get Stats"}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {error && <div className="error">⚠️ {error}</div>}

      {userData && (
        <div className="stats-card">
          <div className="user-header">
            <div className="user-avatar">{getInitials(userData["User Name"])}</div>
            <div className="user-info">
              <h2>{userData["User Name"]}</h2>
              <p>{userData["User Email"]}</p>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-item">
              <div className="progress-label">
                <span className="progress-title">Skill Badges Progress</span>
                <span className="progress-count">{skillBadgesCompleted}/19</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${skillBadgesPercentage}%` }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span className="progress-title">Arcade Games Progress</span>
                <span className="progress-count">{arcadeGamesCompleted}/1</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${arcadeGamesPercentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Profile Status</div>
              <div className={`stat-value ${getStatusClass(userData["Profile URL Status"])}`}>
                <span className={`status-badge ${getStatusClass(userData["Profile URL Status"])}`}>
                  {userData["Profile URL Status"]}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-label">Access Code Redeemed</div>
              <div className={`stat-value ${getStatusClass(userData["Access Code Redemption Status"])}`}>
                <span className={`status-badge ${getStatusClass(userData["Access Code Redemption Status"])}`}>
                  {userData["Access Code Redemption Status"]}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-label">All Requirements Met</div>
              <div className={`stat-value ${getStatusClass(userData["All Skill Badges & Games Completed"])}`}>
                <span className={`status-badge ${getStatusClass(userData["All Skill Badges & Games Completed"])}`}>
                  {userData["All Skill Badges & Games Completed"]}
                </span>
              </div>
            </div>
          </div>

          {userData["Names of Completed Skill Badges"] && (
            <div className="badges-section">
              <div className="section-title">🏆 Completed Skill Badges</div>
              <div className="badge-list">
                {parseBadges(userData["Names of Completed Skill Badges"]).map((badge, index) => (
                  <span key={index} className="badge">
                    {badge}
                  </span>
                ))}
                {parseBadges(userData["Names of Completed Skill Badges"]).length === 0 && (
                  <span className="empty-badge">No skill badges completed yet</span>
                )}
              </div>
            </div>
          )}

          {userData["Names of Completed Arcade Games"] && (
            <div className="badges-section">
              <div className="section-title">🎮 Completed Arcade Games</div>
              <div className="badge-list">
                {parseBadges(userData["Names of Completed Arcade Games"]).map((game, index) => (
                  <span key={index} className="badge">
                    {game}
                  </span>
                ))}
                {parseBadges(userData["Names of Completed Arcade Games"]).length === 0 && (
                  <span className="empty-badge">No arcade games completed yet</span>
                )}
              </div>
            </div>
          )}

          {userData["Google Cloud Skills Boost Profile URL"] && (
            <a
              href={userData["Google Cloud Skills Boost Profile URL"]}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              🔗 View Full Profile
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default App
