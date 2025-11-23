pipeline {
    agent any

    environment {
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
            }
        }

        stage('Kill Previous Server on Port 3002') {
            steps {
                echo 'Stopping backend on port 3002...'
                bat '''
                FOR /F "tokens=5" %%p IN ('netstat -aon ^| find ":3002"') DO (
                    taskkill /PID %%p /F || echo PID %%p not found
                )
                exit 0
                '''
            }
        }

        stage('Start Backend Server') {
            steps {
                echo 'Starting backend server...'
                bat 'cd server && start cmd /k node src/config/server.js'
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
