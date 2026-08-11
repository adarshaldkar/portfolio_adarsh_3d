import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCodeBranch, FaGithub, FaFire } from "react-icons/fa";

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const USERNAME = "adarshaldkar";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}`);
        const data = await res.json();

        // Also get repos to count stars
        const reposRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100`
        );
        const repos = await reposRes.json();
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        const totalForks = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)
          : 0;

        setStats({
          repos: data.public_repos || 34,
          followers: data.followers || 0,
          stars: totalStars,
          forks: totalForks,
          avatar: data.avatar_url,
          name: data.name || "Adarsh Patel",
          bio: data.bio || "AI Engineer & Full Stack Developer",
          joined: data.created_at
            ? new Date(data.created_at).getFullYear()
            : 2020,
        });
      } catch (e) {
        // Fallback static values
        setStats({
          repos: 34,
          followers: 12,
          stars: 47,
          forks: 11,
          avatar: null,
          name: "Adarsh Patel",
          bio: "AI Engineer & Full Stack Developer",
          joined: 2022,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = stats
    ? [
        { icon: <FaCodeBranch className="text-[#915EFF]" />, label: "Repositories", value: stats.repos },
        { icon: <FaStar className="text-yellow-400" />, label: "Total Stars", value: stats.stars },
        { icon: <FaGithub className="text-white" />, label: "Followers", value: stats.followers },
        { icon: <FaFire className="text-orange-400" />, label: "Forks", value: stats.forks },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-8 relative overflow-hidden rounded-2xl border border-[#ffffff12] bg-[#0f1424]/80 backdrop-blur-md p-3.5 sm:p-5"
      style={{ boxShadow: "0 0 40px rgba(145,94,255,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaGithub className="text-white text-xl" />
        <span className="text-white font-bold text-sm">Live GitHub Activity</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live
        </span>
      </div>

      {loading ? (
        <div className="flex gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 h-16 bg-white/5 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#ffffff05] border border-[#ffffff0a] rounded-xl p-3 flex flex-col items-center gap-1 hover:border-[#915EFF33] transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-white font-black text-lg leading-none">{item.value}</span>
              <span className="text-secondary text-[10px] text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contribution image from GitHub readme stats */}
      <div className="mt-4 rounded-xl overflow-hidden opacity-90">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=midnight-purple&hide_border=true&bg_color=0f1424&title_color=915EFF&icon_color=00cea8&text_color=aaa6c3&ring_color=915EFF`}
          alt="GitHub Stats"
          className="w-full rounded-xl"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>
    </motion.div>
  );
};

export default GitHubStats;
