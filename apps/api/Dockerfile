FROM python:3.11-slim

WORKDIR /usr/src/app

# Install pip dependencies
COPY requirements.txt .  
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

EXPOSE 5000

# Start de app
CMD ["python3", "src/app.py"]
