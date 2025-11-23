pipeline {
    agent any

    tools {
        nodejs "node16"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/PavaniSathwik/DisasterReliefManagement.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests configured'
            }
        }
    }
}
