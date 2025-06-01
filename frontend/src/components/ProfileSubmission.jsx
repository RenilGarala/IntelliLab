import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSubmissionStore } from "../store/useSubmissionStore";

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const submissionCountMap = {};
  submissions.forEach((sub) => {
    if (sub.status === "Accepted") {
      const date = new Date(sub.createdAt).toISOString().split("T")[0];
      submissionCountMap[date] = (submissionCountMap[date] || 0) + 1;
    }
  });

  const heatmapData = Object.entries(submissionCountMap).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  return (
    <div className="bg-base-200 px-6 pt-6 rounded-lg shadow-md">
      <CalendarHeatmap
        startDate={oneYearAgo}
        endDate={today}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return "color-empty-r";
          if (value.count >= 4) return "color-github-4";
          if (value.count >= 3) return "color-github-3";
          if (value.count >= 2) return "color-github-2";
          return "color-github-1";
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? { "data-tip": `${value.date}: ${value.count} submissions` }
            : {}
        }
        showWeekdayLabels
      />
    </div>
  );
};

export default ProfileSubmission;
