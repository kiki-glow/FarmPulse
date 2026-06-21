import { CloudRain, Wind, SunIcon } from "lucide-react";
import { FaSeedling } from "react-icons/fa";
import { LuSparkle } from "react-icons/lu";

const InsightBanner = ({ weather, treeData }) => {
    const insights = [];

    const rainyDays = weather.daily?.filter(d => d.precipitation_probability > 60) || [];
    const treesNeedingCare = treeData.tree_health?.needs_care || 0;
    const treesNeedingReplacement = treeData.tree_health?.needs_replacement || 0;

    if (rainyDays.length > 0 && treesNeedingCare > 0) {
        insights.push(
            `${<CloudRain size={18} />} Rain expected on ${rainyDays.length} day(s) – good time to treat the ${treesNeedingCare} trees needing care while soil moisture is high.`
        );
    }

    if (treesNeedingReplacement > 0 && rainyDays.length > 0) {
        insights.push(
            `${<FaSeedling size={18} />} ${treesNeedingReplacement} trees flagged for replacement – upcoming rain creates ideal replanting conditions.`
        );
    }

    if (rainyDays.length === 0 && treesNeedingCare > 0) {
        insights.push(
            `${<SunIcon size={18} />} Dry week ahead – consider irrigating the ${treesNeedingCare} trees flagged as needing care.`
        );
    }

    const highWind = weather.daily?.find(d => d.wind_wax > 20);
    if (highWind) {
        insights.push(
            `${<Wind size={18} />} High winds forecast (${highWind.wind_wax} km/h on ${new Date(highWind.date).toLocaleDateString('en-KE', { weekday: 'short' })}) – check tree stability, especially flagged trees.`
        );
    }

    if (insights.length === 0) return null;
  return (
    <div className="insight-banner">
        <div className="insight-header">
            <span className="insight-icon">
                <LuSparkle size={16} />
            </span>
            <span>Farm Intelligence</span>
        </div>
        <ul className="insights-list">
            {insights.map((insight, i) => (
                <li key={i}>{insight}</li>
            ))}
        </ul>
    </div>
  )
}

export default InsightBanner