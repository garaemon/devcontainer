pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Cleanup Docker') {
            steps {
                script {
                    echo 'Cleaning up project-specific Docker images and build cache'
                    sh '''
                        # Remove only project-specific images
                        docker images --filter "reference=ghcr.io/garaemon/*" -q | xargs -r docker rmi -f || true

                        # Remove dangling images (untagged intermediate images)
                        docker images --filter "dangling=true" -q | xargs -r docker rmi || true

                        # Clean build cache for buildkit
                        docker builder prune -af || true
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build ros-noetic') {
                    steps {
                        script {
                            echo 'Building ros-noetic image from scratch'
                            sh '''
                                docker build --no-cache \
                                    --pull \
                                    -t ghcr.io/garaemon/ros-noetic:latest \
                                    docker/ros-noetic
                            '''
                        }
                    }
                }

                stage('Build ros-humble') {
                    steps {
                        script {
                            echo 'Building ros-humble image from scratch'
                            sh '''
                                docker build --no-cache \
                                    --pull \
                                    -t ghcr.io/garaemon/ros-humble:latest \
                                    docker/ros-humble
                            '''
                        }
                    }
                }

                stage('Build ubuntu-focal') {
                    steps {
                        script {
                            echo 'Building ubuntu-focal image from scratch'
                            sh '''
                                docker build --no-cache \
                                    --pull \
                                    -t ghcr.io/garaemon/ubuntu-focal:latest \
                                    docker/ubuntu-focal
                            '''
                        }
                    }
                }

                stage('Build ubuntu-noble') {
                    steps {
                        script {
                            echo 'Building ubuntu-noble image from scratch'
                            sh '''
                                docker build --no-cache \
                                    --pull \
                                    -t ghcr.io/garaemon/ubuntu-noble:latest \
                                    docker/ubuntu-noble
                            '''
                        }
                    }
                }
            }
        }

        stage('Test Images') {
            parallel {
                stage('Test ros-noetic') {
                    steps {
                        script {
                            echo 'Testing ros-noetic image'
                            sh 'docker run --rm ghcr.io/garaemon/ros-noetic:latest sudo ls /'
                        }
                    }
                }

                stage('Test ros-humble') {
                    steps {
                        script {
                            echo 'Testing ros-humble image'
                            sh 'docker run --rm ghcr.io/garaemon/ros-humble:latest sudo ls /'
                        }
                    }
                }

                stage('Test ubuntu-focal') {
                    steps {
                        script {
                            echo 'Testing ubuntu-focal image'
                            sh 'docker run --rm ghcr.io/garaemon/ubuntu-focal:latest sudo ls /'
                        }
                    }
                }

                stage('Test ubuntu-noble') {
                    steps {
                        script {
                            echo 'Testing ubuntu-noble image'
                            sh 'docker run --rm ghcr.io/garaemon/ubuntu-noble:latest sudo ls /'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Build process completed'
            }
        }
        success {
            script {
                echo 'All Docker images built and tested successfully'
            }
        }
        failure {
            script {
                echo 'Build or test failed'
            }
        }
        cleanup {
            script {
                echo 'Cleaning up workspace'
            }
        }
    }
}
