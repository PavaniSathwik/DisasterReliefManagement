pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                bat 'git reset --hard'
                bat 'git clean -fd'
                bat 'git pull origin main'
            }
        }

        stage('Install Server Dependencies') {
            steps {
                bat 'cd server && npm install'
            }
        }

        stage('Restart Backend') {
            steps {
                // Kill anything running on port 3002
                bat 'for /f "tokens=5" %%p in (\'netstat -aon ^| findstr :3002\') do taskkill /PID %%p /F'

                // Start backend
                bat 'start "" cmd /c "cd server && node src/config/server.js"'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                bat 'cd client && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'cd client && npm run build'
            }
        }
    }
}
