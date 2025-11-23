pipeline {
    agent any

    tools {
        nodejs "node16"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/psathwik2200031830/DisasterReliefManagement.git', branch: 'main'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                bat 'cd client && npm install'
            }
        }

        stage('Install Server Dependencies') {
            steps {
                bat 'cd server && npm install'
            }
        }

        stage('Build Client') {
            steps {
                bat 'cd client && npm run build'
            }
        }

        stage('Run Server') {
            steps {
                // Run your server using the correct path
                bat 'cd server\\src\\config && node server.js'
            }
        }
    }
}
