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
                git credentialsId: 'Github-PAT', 
                    url: 'https://github.com/ThashmikaX/Lensify-Photography-Web-App.git',
                    branch: 'main'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        echo "Building backend Docker image..."
                        sh 'docker build -t thashmikax/lensify-backend .'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        echo "Building frontend Docker image..."
                        sh 'docker build -t thashmikax/lensify-frontend .'
                    }
                }
            }
        }

        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    echo "Logging in to DockerHub..."
                    sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"

                    echo "Pushing backend Docker image..."
                    sh 'docker push thashmikax/lensify-backend'

                    echo "Pushing frontend Docker image..."
                    sh 'docker push thashmikax/lensify-frontend'
                }
            }
        }


        stage('Deploy to EC2') {
            steps {
                script {
                    echo "Deploying on EC2 instance..."

                    // SSH to EC2 and deploy the Docker images using Jenkins credentials
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2-SSH-Key', keyFileVariable: 'EC2_SSH_KEY')]) {
                        sh """
                            ssh -i \$EC2_SSH_KEY ${EC2_USER}@${EC2_IP} '
                            docker pull thashmikax/lensify-backend &&
                            docker pull thashmikax/lensify-frontend &&
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
