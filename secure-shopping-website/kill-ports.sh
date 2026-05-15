kill_process_on_port() {
  local port=$1
  local pid=$(lsof -t -i:$port)
  if [ -n "$pid" ]; then
    echo "Terminating process on port $port (PID: $pid)..."
    kill -15 $pid
  else
    echo "No process found on port $port."
  fi
}

declare -a ports=(5001 5002 5003 5004 8080 8081 8082 8083 8084)

for port in "${ports[@]}"; do
  kill_process_on_port $port
done

echo "All specified ports have been cleared."