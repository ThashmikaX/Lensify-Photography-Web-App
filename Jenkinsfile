pipeline {
    agent any

    environment {
        // DockerHub credentials
        DOCKERHUB_USERNAME = 'thashmikax'
        DOCKERHUB_PASSWORD = credentials('dockerhub-pat') // Jenkins credentials ID for DockerHub token

        // EC2 information
        EC2_IP = '13.51.162.118'
        EC2_USER = 'ubuntu' // default for Ubuntu
    }

    stages {
        stage('Checkout Code') {
            steps {
                dir('Lensify-Photography-Web-App') {
                    git credentialsId: 'Github-PAT', 
                        url: 'https://github.com/ThashmikaX/Lensify-Photography-Web-App.git',
                        branch: 'main'
                }
            }
        }
        stage('ls frontend content'){
            steps {
                script {
                    dir('Lensify-Photography-Web-App/frontend') {
                        sh 'ls -la'
                    }
                }
            }
        }
        stage('ls backend content'){
            steps {
                script {
                    dir('Lensify-Photography-Web-App/backend') {
                        sh 'ls -la'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('Lensify-Photography-Web-App/backend') {
                        sh 'docker build -t thashmikax/lensify-backend .'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('Lensify-Photography-Web-App/frontend') {
                        sh 'docker build -t thashmikax/lensify-frontend .'
                    }
                }
            }
        }

        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"
                    sh 'docker push thashmikax/lensify-backend'
                    sh 'docker push thashmikax/lensify-frontend'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2-SSH-Key', keyFileVariable: 'EC2_SSH_KEY')]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$EC2_SSH_KEY ${EC2_USER}@${EC2_IP} '
                            docker pull thashmikax/lensify-backend &&
                            docker pull thashmikax/lensify-frontend &&
                            docker rm -f lensify-backend || true &&
                            docker rm -f lensify-frontend || true &&
                            docker run -d -p 3000:3000 --name lensify-backend thashmikax/lensify-backend &&
                            docker run -d -p 5173:5173 --name lensify-frontend thashmikax/lensify-frontend
                            '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up Docker images..."
            sh 'docker system prune -f'
        }
    }
}
