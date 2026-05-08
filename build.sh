#!/usr/bin/env bash
# Build script for Render deployment

# Install Python dependencies
pip install -r requirements.txt

# Navigate to backend and prepare model if needed
cd backend
python train_model.py 2>/dev/null || true
cd ..

echo "Build complete!"
