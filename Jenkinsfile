pipeline {
    agent any

    environment {
        NODEJS_HOME = 'C:\\Program Files\\nodejs' // Change if your node path is different
        PATH = "${env.NODEJS_HOME};${env.PATH}"
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
                FOR /F "tokens=5" %%a IN ('netstat -aon ^| find ":3002"') DO taskkill /PID %%a /F || echo PID %%a not found
                '''
            }
        }

        stage('Start Backend Server') {
            steps {
                echo 'Starting backend server...'
                bat 'cd server && node src/config/server.js'
            }
        }

    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build and server started successfully!'
        }
    }
}
