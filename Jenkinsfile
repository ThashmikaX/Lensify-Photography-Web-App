pipeline {
    agent any

    environment {
        // DockerHub credentials
        DOCKERHUB_USERNAME = 'thashmikax'
        DOCKERHUB_PASSWORD = credentials('dockerhub-pat') // Jenkins credentials ID for DockerHub token

        // EC2 information
        EC2_IP = '13.51.162.118'
        EC2_USER = 'ubuntu' // default for Ubuntu

        // Force heartbeat for long running tasks
        JAVA_OPTS = '-Dorg.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL=86400'

        // Enable BuildKit
        DOCKER_BUILDKIT = '1'
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

        stage('List Client Content') {
            steps {
                dir('Lensify-Photography-Web-App/client') {
                    sh 'ls -la'
                }
            }
        }

        stage('List Server Content') {
            steps {
                dir('Lensify-Photography-Web-App/server') {
                    sh 'ls -la'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('Lensify-Photography-Web-App/server') {
                    sh 'docker build --network=host -t thashmikax/lensify-server .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Lensify-Photography-Web-App/client') {
                    sh 'docker build --network=host -t thashmikax/lensify-client .'
                }
            }
        }

        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    sh "echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USERNAME --password-stdin"
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
            echo "Cleaning up Docker images and system resources..."
            sh 'docker system prune -f'
        }
    }
}
