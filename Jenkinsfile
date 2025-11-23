pipeline {
    agent any

    environment {
        // Use system-installed NodeJS (adjust path if needed)
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
                git url: 'https://github.com/psathwik2200031830/DisasterReliefManagement.git', branch: 'main'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing server dependencies...'
                bat 'cd server && npm install'
                // Install PM2 globally
                bat 'npm install -g pm2'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing client dependencies...'
                bat 'cd client && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building React app...'
                bat 'cd client && npm run build'
            }
        }

        stage('Kill Previous Server on Port 3002') {
            steps {
                echo 'Stopping backend on port 3002...'
                bat '''
                FOR /F "tokens=5" %%a IN ('netstat -aon ^| find ":3002"') DO (
                    echo Killing PID %%a
                    taskkill /PID %%a /F || echo PID %%a not found
                )
                exit 0
                '''
            }
        }

        stage('Start Backend Server') {
            steps {
                echo 'Starting backend server with PM2...'
                bat 'cd server && pm2 start src/config/server.js --name backend --watch'
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build succeeded!'
        }
    }
}
