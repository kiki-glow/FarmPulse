import { useState, useRef } from "react"
import { analyzeTrees } from "../api/farmpulse.js"
import { Send, Search } from "lucide-react";

const TreeAnalysisPanel = ({ onResult, treeData, farmLat, farmLon }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
    };

    const handleAnalyze = async () => {
        const file = fileRef.current?.files[0];
        if (!file) return;

        setError(null);
        setLoading(true);

        const form = new FormData();
        form.append('image', file);
        if (farmLat) form.append('location', `${farmLat}, ${farmLon}`);

        try {
            const result = await analyzeTrees(form);
            onResult(result);
        } catch (err) {
            setError('Analysis failed. Check your image and try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="card tree-panel">
        <div className="card-header">
            <h2>Farm Tree Analysis</h2>
            <span className="badge-pro">CV + AI</span>
        </div>
        <p className="panel-description">
            Upload a drone or satellite image of your farm to count trees,
            assess canopy health, and get agronomic recommendations.
        </p>

        <div className="upload-area">
            {preview ? (
                <img src={preview} alt="Farm preview" className="image-preview" />
            ) : (
                <div className="upload_placeholder" onClick={() => fileRef.current.click()}>
                    <span><Send size={16} /></span>
                    <span>Drop farm image or click to browse</span>
                    <span className="upload-hint">JPEG · PNG · WEBP · max 20MB</span>
                </div>
            )}
            <input 
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>

        {preview && (
            <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
                {loading ? 'Analyzing...' : `${<Search size={18} />} Analyze Farm`}
            </button>
        )}

        {error && <p className="error">{error}</p>}

        {treeData && (
            <div className="tree-results">
                <div className="tree-stats">
                    <div className="tree-stat">
                        <span className="tree-stat-value">{treeData.total_tree_count}</span>
                        <span className="tree-stat-label">Trees</span>
                    </div>
                    <div className="tree-stat">
                        <span className="tree-stat-value">{treeData.canopy_coverage_pct}%</span>
                        <span className="tree-stat-label">Canopy Cover</span>
                    </div>
                    <div className="tree-stat">
                        <span className="tree-stat-value">
                            {Math.round(treeData.confidence_score * 100)}%
                        </span>
                        <span className="tree-stat-label">Confidence</span>
                    </div>
                </div>

                <div className="health-breakdown">
                    <h4>Tree Health</h4>
                    <div className="health-bars">
                        <div className="health-item healthy">
                            <span>Healthy</span>
                            <span>{treeData.tree_health.healthy}</span>
                        </div>
                        <div className="health-item needs-care">
                            <span>Needs Care</span>
                            <span>{treeData.tree_health.needs_replacement}</span>
                        </div>
                    </div>
                </div>

                {treeData.recommendations?.length > 0 && (
                    <div className="recommendations">
                        <h4>Recommendations</h4>
                        <ul>
                            {treeData.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {treeData.overlay_image_url && (
                    <div className="overlay-image">
                        <h4>Annotated Overlay</h4>
                        <img src={treeData.overlay_image_url} alt="Tree analysis overlay" />
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default TreeAnalysisPanel