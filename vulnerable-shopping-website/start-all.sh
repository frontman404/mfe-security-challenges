kill_process_on_port() {
  local port=$1
  local pid=$(lsof -t -i:$port)
  if [ -n "$pid" ]; then
    echo "Terminating process on port $port (PID: $pid)..."
    kill -9 $pid
  fi
}

start_service() {
  local service_dir=$1
  local start_command=$2

  echo "Starting service in $service_dir..."
  cd $service_dir
  npm install
  $start_command &
  cd - > /dev/null
}

declare -a ports=(5001 5002 5003 5004 8081 8082 8083 8084 8080)

for port in "${ports[@]}"; do
  kill_process_on_port $port
done

# Start auth backend
start_service "auth/backend" "npm run dev"

# Start auth frontend
start_service "auth/frontend" "npm run dev"

# Start cart backend
start_service "cart/backend" "npm run dev"

# Start cart frontend
start_service "cart/frontend" "npm run dev"

# Start products backend
start_service "products/backend" "npm run dev"

# Start products frontend
start_service "products/frontend" "npm run dev"

# Start container
start_service "container" "npm run dev"

# Start order frontend
start_service "order/frontend" "npm run dev"

# Start order backend
start_service "order/backend" "npm run dev"

echo "All services started."