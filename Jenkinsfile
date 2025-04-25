pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Github-PAT', 
                    url: 'https://github.com/ThashmikaX/Lensify-Photography-Web-App.git',
                    branch: 'main'
            }
        }

        stage('List Repo Content') {
            steps {
                script {
                    echo "Listing files in workspace:"
                    sh 'ls -la'
                }
            }
        }
    }
}
