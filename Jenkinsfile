pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Setup Buildx') {
            steps {
                script {
                    echo 'Setting up Docker Buildx for multi-architecture builds'
                    sh '''
                        # Create a new builder instance if it doesn't exist
                        docker buildx create --name multiarch-builder --use || docker buildx use multiarch-builder || true

                        # Bootstrap the builder
                        docker buildx inspect --bootstrap
                    '''
                }
            }
        }

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
                            echo 'Building ros-noetic image for amd64 and arm64 from scratch'
                            sh '''
                                # Build for both platforms (stored in build cache)
                                docker buildx build --no-cache \
                                    --pull \
                                    --platform linux/amd64,linux/arm64 \
                                    -t ghcr.io/garaemon/ros-noetic:latest \
                                    docker/ros-noetic

                                # Load the host architecture image for testing
                                docker buildx build \
                                    --platform linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') \
                                    -t ghcr.io/garaemon/ros-noetic:latest \
                                    --load \
                                    docker/ros-noetic
                            '''
                        }
                    }
                }

                stage('Build ros-humble') {
                    steps {
                        script {
                            echo 'Building ros-humble image for amd64 and arm64 from scratch'
                            sh '''
                                # Build for both platforms (stored in build cache)
                                docker buildx build --no-cache \
                                    --pull \
                                    --platform linux/amd64,linux/arm64 \
                                    -t ghcr.io/garaemon/ros-humble:latest \
                                    docker/ros-humble

                                # Load the host architecture image for testing
                                docker buildx build \
                                    --platform linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') \
                                    -t ghcr.io/garaemon/ros-humble:latest \
                                    --load \
                                    docker/ros-humble
                            '''
                        }
                    }
                }

                stage('Build ubuntu-focal') {
                    steps {
                        script {
                            echo 'Building ubuntu-focal image for amd64 and arm64 from scratch'
                            sh '''
                                # Build for both platforms (stored in build cache)
                                docker buildx build --no-cache \
                                    --pull \
                                    --platform linux/amd64,linux/arm64 \
                                    -t ghcr.io/garaemon/ubuntu-focal:latest \
                                    docker/ubuntu-focal

                                # Load the host architecture image for testing
                                docker buildx build \
                                    --platform linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') \
                                    -t ghcr.io/garaemon/ubuntu-focal:latest \
                                    --load \
                                    docker/ubuntu-focal
                            '''
                        }
                    }
                }

                stage('Build ubuntu-noble') {
                    steps {
                        script {
                            echo 'Building ubuntu-noble image for amd64 and arm64 from scratch'
                            sh '''
                                # Build for both platforms (stored in build cache)
                                docker buildx build --no-cache \
                                    --pull \
                                    --platform linux/amd64,linux/arm64 \
                                    -t ghcr.io/garaemon/ubuntu-noble:latest \
                                    docker/ubuntu-noble

                                # Load the host architecture image for testing
                                docker buildx build \
                                    --platform linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') \
                                    -t ghcr.io/garaemon/ubuntu-noble:latest \
                                    --load \
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
