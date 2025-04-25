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
        stage('ls client content'){
            steps {
                script {
                    dir('client') {
                        sh 'ls -la'
                    }
                }
            }
        }
        stage('ls server content'){
            steps {
                script {
                    dir('server') {
                        sh 'ls -la'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('Lensify-Photography-Web-App/server') {
                        sh 'docker build -t thashmikax/lensify-server .'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('Lensify-Photography-Web-App/client') {
                        sh 'docker build -t thashmikax/lensify-client .'
                    }
                }
            }
        }

        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"
                    sh 'docker push thashmikax/lensify-server'
                    sh 'docker push thashmikax/lensify-client'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'EC2-SSH-Key', keyFileVariable: 'EC2_SSH_KEY')]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$EC2_SSH_KEY ${EC2_USER}@${EC2_IP} '
                            docker pull thashmikax/lensify-server &&
                            docker pull thashmikax/lensify-client &&
                            docker rm -f lensify-server || true &&
                            docker rm -f lensify-client || true &&
                            docker run -d -p 3000:3000 --name lensify-server thashmikax/lensify-server &&
                            docker run -d -p 5173:5173 --name lensify-client thashmikax/lensify-client
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
