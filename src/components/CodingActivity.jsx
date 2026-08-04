import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

const CodingActivity = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [githubData, setGithubData] = useState({
    publicRepos: 34,
    followers: 6,
    following: 13,
    stars: 12,
    commitsThisYear: "450+",
  });

  const [leetcodeData, setLeetcodeData] = useState({
    totalSolved: 79,
    totalQuestions: 4013,
    easySolved: 38,
    easyTotal: 958,
    mediumSolved: 32,
    mediumTotal: 2095,
    hardSolved: 9,
    hardTotal: 960,
    acceptanceRate: "87.7%",
    ranking: "#2,048,253",
    contributionPoints: 332,
    reputation: 0,
    recentProblems: [
      "3Sum",
      "Intersection of Two Arrays II",
      "Stone Game III",
      "Ones and Zeroes",
      "Predict the Winner",
    ],
  });

  useEffect(() => {
    // Asynchronous Real-Time Fetching from Backend API + Direct Fallbacks
    const fetchStats = async () => {
      // 1. Try FastAPI Backend Live Endpoint (/api/stats)
      try {
        const backendRes = await fetch("http://localhost:8000/api/stats");
        if (backendRes.ok) {
          const data = await backendRes.json();
          if (data.github) {
            setGithubData((prev) => ({
              ...prev,
              publicRepos: data.github.public_repos ?? prev.publicRepos,
              followers: data.github.followers ?? prev.followers,
              following: data.github.following ?? prev.following,
            }));
          }
          if (data.leetcode) {
            setLeetcodeData((prev) => ({
              ...prev,
              totalSolved: data.leetcode.totalSolved ?? prev.totalSolved,
              totalQuestions: data.leetcode.totalQuestions ?? prev.totalQuestions,
              easySolved: data.leetcode.easySolved ?? prev.easySolved,
              easyTotal: data.leetcode.easyTotal ?? prev.easyTotal,
              mediumSolved: data.leetcode.mediumSolved ?? prev.mediumSolved,
              mediumTotal: data.leetcode.mediumTotal ?? prev.mediumTotal,
              hardSolved: data.leetcode.hardSolved ?? prev.hardSolved,
              hardTotal: data.leetcode.hardTotal ?? prev.hardTotal,
              acceptanceRate: data.leetcode.acceptanceRate ?? prev.acceptanceRate,
              ranking: data.leetcode.ranking ?? prev.ranking,
              recentProblems: data.leetcode.recentProblems ?? prev.recentProblems,
            }));
          }
          return;
        }
      } catch (e) {
        console.warn("FastAPI backend /api/stats offline, using client-side live fetch");
      }

      // 2. Direct GitHub API Fallback
      try {
        const ghRes = await fetch("https://api.github.com/users/adarshaldkar");
        if (ghRes.ok) {
          const ghJson = await ghRes.json();
          setGithubData((prev) => ({
            ...prev,
            publicRepos: ghJson.public_repos ?? prev.publicRepos,
            followers: ghJson.followers ?? prev.followers,
            following: ghJson.following ?? prev.following,
          }));
        }
      } catch (e) {
        console.warn("GitHub live API using baseline data");
      }

      // 3. Direct LeetCode Alfa API Fallback (@Adarsh_Patel_14)
      try {
        const lcRes = await fetch("https://alfa-leetcode-api.onrender.com/userProfile/Adarsh_Patel_14");
        if (lcRes.ok) {
          const lcJson = await lcRes.json();
          if (lcJson.totalSolved !== undefined) {
            const totalSubmissions = lcJson.totalSubmissions?.find((s) => s.difficulty === "All")?.submissions || 212;
            const acSubmissions = lcJson.matchedUserStats?.acSubmissionNum?.find((s) => s.difficulty === "All")?.submissions || 186;
            const calcAcceptance = ((acSubmissions / totalSubmissions) * 100).toFixed(1);

            setLeetcodeData((prev) => ({
              ...prev,
              totalSolved: lcJson.totalSolved,
              totalQuestions: lcJson.totalQuestions || 4013,
              easySolved: lcJson.easySolved || 38,
              easyTotal: lcJson.totalEasy || 958,
              mediumSolved: lcJson.mediumSolved || 32,
              mediumTotal: lcJson.totalMedium || 2095,
              hardSolved: lcJson.hardSolved || 9,
              hardTotal: lcJson.totalHard || 960,
              acceptanceRate: `${calcAcceptance}%`,
              ranking: lcJson.ranking ? `#${lcJson.ranking.toLocaleString()}` : prev.ranking,
              contributionPoints: lcJson.contributionPoint || prev.contributionPoints,
            }));
          }
        }
      } catch (e) {
        console.warn("LeetCode live API using verified user metrics");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div>
        <p className={styles.sectionSubText}>Consistent Open Source & Algorithmic Discipline</p>
        <h2 className={styles.sectionHeadText}>Coding Activity & Heatmaps.</h2>
      </div>

      {/* Filter / View Tabs */}
      <div className="flex items-center gap-3 mt-6 mb-10">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
            activeTab === "all"
              ? "bg-[#915EFF] text-white shadow-[0_0_20px_rgba(145,94,255,0.4)]"
              : "bg-[#151030] text-secondary hover:text-white border border-[#ffffff10]"
          }`}
        >
          🌐 Combined View
        </button>
        <button
          onClick={() => setActiveTab("github")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
            activeTab === "github"
              ? "bg-[#915EFF] text-white shadow-[0_0_20px_rgba(145,94,255,0.4)]"
              : "bg-[#151030] text-secondary hover:text-white border border-[#ffffff10]"
          }`}
        >
          🐙 GitHub Contributions
        </button>
        <button
          onClick={() => setActiveTab("leetcode")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
            activeTab === "leetcode"
              ? "bg-[#FFA116] text-black shadow-[0_0_20px_rgba(255,161,22,0.4)]"
              : "bg-[#151030] text-secondary hover:text-white border border-[#ffffff10]"
          }`}
        >
          🧩 LeetCode Analytics
        </button>
      </div>

      {/* GITHUB SECTION */}
      {(activeTab === "all" || activeTab === "github") && (
        <div className="bg-[#151030] p-6 sm:p-8 rounded-3xl border border-[#915EFF30] shadow-[0_0_30px_rgba(145,94,255,0.1)] mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ffffff10] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#915EFF20] border border-[#915EFF40] flex items-center justify-center text-xl">
                🐙
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GitHub 365-Day Contribution Heatmap</h3>
                <p className="text-xs text-secondary">
                  Profile: <a href="https://github.com/adarshaldkar" target="_blank" rel="noopener noreferrer" className="text-[#915EFF] font-semibold underline hover:text-white">@adarshaldkar</a>
                </p>
              </div>
            </div>
            <a
              href="https://github.com/adarshaldkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white bg-[#915EFF] px-4 py-2 rounded-xl shadow-lg hover:bg-purple-600 transition-colors inline-block text-center"
            >
              Visit GitHub Profile 🚀
            </a>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#1d1836] p-4 rounded-2xl border border-[#ffffff0a] text-center space-y-1">
              <div className="text-2xl font-extrabold text-[#915EFF]">{githubData.commitsThisYear}</div>
              <div className="text-xs text-secondary">Contributions This Year</div>
            </div>
            <div className="bg-[#1d1836] p-4 rounded-2xl border border-[#ffffff0a] text-center space-y-1">
              <div className="text-2xl font-extrabold text-emerald-400">{githubData.publicRepos}</div>
              <div className="text-xs text-secondary">Public Repositories</div>
            </div>
            <div className="bg-[#1d1836] p-4 rounded-2xl border border-[#ffffff0a] text-center space-y-1">
              <div className="text-2xl font-extrabold text-yellow-400">{githubData.followers}</div>
              <div className="text-xs text-secondary">GitHub Followers</div>
            </div>
            <div className="bg-[#1d1836] p-4 rounded-2xl border border-[#ffffff0a] text-center space-y-1">
              <div className="text-2xl font-extrabold text-purple-300">{githubData.following}</div>
              <div className="text-xs text-secondary">Following Developers</div>
            </div>
          </div>

          {/* GitHub Live Contribution Heatmap Graph SVG */}
          <div className="bg-[#0b0819] p-4 sm:p-6 rounded-2xl border border-[#ffffff10] space-y-3">
            <div className="flex items-center justify-between text-xs text-secondary mb-2">
              <span className="font-semibold text-white">Daily Commit & Pull Request Activity Graph</span>
              <span className="text-[#915EFF] font-semibold">Sub-24h Live Sync</span>
            </div>
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <img
                src="https://ghchart.rshah.org/915EFF/adarshaldkar"
                alt="Adarsh Patel GitHub Contribution Heatmap"
                className="w-full h-auto max-h-[160px] object-contain filter drop-shadow-[0_0_12px_rgba(145,94,255,0.3)]"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-secondary border-t border-[#ffffff0a] pt-3">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#161b22] border border-[#ffffff10]"></span>
                <span className="w-3 h-3 rounded bg-[#915EFF33]"></span>
                <span className="w-3 h-3 rounded bg-[#915EFF66]"></span>
                <span className="w-3 h-3 rounded bg-[#915EFF99]"></span>
                <span className="w-3 h-3 rounded bg-[#915EFF]"></span>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      )}

      {/* LEETCODE SECTION */}
      {(activeTab === "all" || activeTab === "leetcode") && (
        <div className="bg-[#151030] p-6 sm:p-8 rounded-3xl border border-[#FFA11630] shadow-[0_0_30px_rgba(255,161,22,0.1)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ffffff10] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA11620] border border-[#FFA11640] flex items-center justify-center text-xl">
                🧩
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">LeetCode Algorithmic Problem Solving</h3>
                <p className="text-xs text-secondary">
                  Profile: <a href="https://leetcode.com/u/Adarsh_Patel_14/" target="_blank" rel="noopener noreferrer" className="text-[#FFA116] font-semibold underline hover:text-white">@Adarsh_Patel_14</a>
                </p>
              </div>
            </div>
            <a
              href="https://leetcode.com/u/Adarsh_Patel_14/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-black bg-[#FFA116] hover:bg-yellow-400 px-4 py-2 rounded-xl shadow-lg transition-colors inline-block text-center"
            >
              Visit LeetCode Profile ⚡
            </a>
          </div>

          {/* Overview Stat Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Total Solved Main Card */}
            <div className="bg-[#1d1836] p-6 rounded-2xl border border-[#ffffff10] flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
              <div className="text-4xl font-extrabold text-white">
                {leetcodeData.totalSolved} <span className="text-xs font-normal text-secondary">/ {leetcodeData.totalQuestions}</span>
              </div>
              <div className="text-sm font-bold text-[#FFA116]">Total Problems Solved</div>
              <div className="inline-block bg-[#00E67615] text-[#00E676] text-xs font-semibold px-3 py-1 rounded-full border border-[#00E67630]">
                Acceptance: {leetcodeData.acceptanceRate}
              </div>
              <div className="text-[11px] text-secondary mt-1 font-medium">
                Global Rank: <span className="text-white font-semibold">{leetcodeData.ranking}</span>
              </div>
            </div>

            {/* Difficulty Breakdown Meters */}
            <div className="md:col-span-2 space-y-4 bg-[#1d1836] p-6 rounded-2xl border border-[#ffffff10]">
              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#00E676]">Easy Problems</span>
                  <span className="text-white">{leetcodeData.easySolved} <span className="text-secondary font-normal">/ {leetcodeData.easyTotal}</span></span>
                </div>
                <div className="w-full bg-[#100d25] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00E676] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#00E676]"
                    style={{ width: `${Math.min(100, (leetcodeData.easySolved / leetcodeData.easyTotal) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#FFB300]">Medium Problems (C++ & Data Structures)</span>
                  <span className="text-white">{leetcodeData.mediumSolved} <span className="text-secondary font-normal">/ {leetcodeData.mediumTotal}</span></span>
                </div>
                <div className="w-full bg-[#100d25] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#FFB300] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#FFB300]"
                    style={{ width: `${Math.min(100, (leetcodeData.mediumSolved / leetcodeData.mediumTotal) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#FF1744]">Hard Problems (Advanced Algorithms)</span>
                  <span className="text-white">{leetcodeData.hardSolved} <span className="text-secondary font-normal">/ {leetcodeData.hardTotal}</span></span>
                </div>
                <div className="w-full bg-[#100d25] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#FF1744] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#FF1744]"
                    style={{ width: `${Math.min(100, (leetcodeData.hardSolved / leetcodeData.hardTotal) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Solved Problem Badges */}
          <div className="bg-[#1d1836] p-5 rounded-2xl border border-[#ffffff0a] space-y-3">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>⚡ Recent Accepted C++ Submissions</span>
              <span className="text-[#FFA116] font-normal text-[11px]">LeetCode Profile @Adarsh_Patel_14</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {leetcodeData.recentProblems.map((prob, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-white bg-[#FFA11615] px-3 py-1.5 rounded-xl border border-[#FFA11630] flex items-center gap-1.5"
                >
                  <span className="text-[#00E676] font-bold">✓</span> {prob}
                </span>
              ))}
            </div>
          </div>

          {/* LeetCode Live Card Widget Preview */}
          <div className="bg-[#0b0819] p-4 sm:p-6 rounded-2xl border border-[#ffffff10] flex flex-col items-center justify-center space-y-3">
            <div className="text-xs text-secondary font-semibold">Official LeetCode Verified Badge (@Adarsh_Patel_14)</div>
            <img
              src="https://leetcard.jacoblin.cool/Adarsh_Patel_14?theme=dark&font=Outfit&ext=activity"
              alt="LeetCode Stats Card for Adarsh_Patel_14"
              className="w-full max-w-xl h-auto rounded-xl shadow-2xl border border-[#ffffff15]"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(CodingActivity, "activity");
