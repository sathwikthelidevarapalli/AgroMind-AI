# Root-level app.py wrapper for deployment
# This allows both Render and Vercel to find the Flask app

import sys
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_dir))

# Import the Flask app directly from backend/app.py module
# Use importlib to avoid circular import issues
import importlib.util
spec = importlib.util.spec_from_file_location("backend_app", backend_dir / "app.py")
backend_app_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backend_app_module)

app = backend_app_module.app

if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
