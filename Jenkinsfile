pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling latest code from GitHub..."
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo "Installing server dependencies..."
                bat 'cd server && npm install'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo "Installing client dependencies..."
                bat 'cd client && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Building React app..."
                bat 'cd client && npm run build'
            }
        }

        stage('Kill Previous Server on Port 3002') {
            steps {
                echo "Killing previous server..."
                bat '''
                FOR /F "tokens=5" %%a IN ('netstat -aon ^| find ":3002"') DO (
                    echo Killing PID %%a
                    taskkill /PID %%a /F
                )
                '''
            }
        }

        stage('Start Backend Server') {
            steps {
                echo "Starting Node server..."
                bat 'cd server && node server.js'
            }
        }
    }
}
