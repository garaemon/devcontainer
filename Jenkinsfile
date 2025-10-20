/*
 * Prerequisites for running this Jenkinsfile:
 *
 * This pipeline requires Docker and Docker Buildx to be available in the Jenkins agent.
 *
 * If running Jenkins in Docker, you need to configure Docker-outside-of-Docker (DooD):
 *
 * 1. Mount the Docker socket when starting Jenkins container:
 *    docker run -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts
 *
 * 2. Install Docker CLI in the Jenkins container:
 *    docker exec -u root <jenkins-container> sh -c "apt-get update && apt-get install -y docker.io"
 *
 * 3. Grant Jenkins user access to Docker socket:
 *    docker exec -u root <jenkins-container> usermod -aG docker jenkins
 *    docker exec -u root <jenkins-container> chmod 666 /var/run/docker.sock
 *
 * Alternatively, use a Jenkins image with Docker pre-installed, such as:
 *    docker:dind or custom images with Docker client included
 *
 * See JENKINS_SETUP.md for detailed setup instructions.
 */

// Function to build multi-architecture Docker images
def buildMultiArchImage(String imageName, String contextPath) {
    echo "Building ${imageName} image for amd64 and arm64 from scratch"
    sh """
        # Determine host platform for loading the test image
        HOST_PLATFORM="linux/\$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')"

        # Step 1: Build for both platforms (stored in build cache)
        # --no-cache: Build from scratch without using cached layers
        # --pull: Always pull the latest upstream base images (e.g., Ubuntu, ROS)
        # --platform: Build for multiple architectures
        docker buildx build --no-cache \\
            --pull \\
            --platform \${BUILD_PLATFORMS} \\
            -t ghcr.io/garaemon/${imageName}:latest \\
            ${contextPath}

        # Step 2: Load the host architecture image for testing
        # Cannot use --load with multiple platforms, so we load only host arch
        # This reuses the cache from Step 1, making it fast
        docker buildx build \\
            --platform \${HOST_PLATFORM} \\
            -t ghcr.io/garaemon/${imageName}:latest \\
            --load \\
            ${contextPath}
    """
}

// Function to test Docker images
def testImage(String imageName) {
    echo "Testing ${imageName} image"
    // Verify that sudo works without password in the container
    sh "docker run --rm ghcr.io/garaemon/${imageName}:latest sudo ls /"
}

pipeline {
    agent any

    environment {
        // Enable Docker BuildKit for improved build performance and features
        DOCKER_BUILDKIT = '1'

        // Target platforms for multi-architecture builds
        // Modify this variable to change build platforms globally
        BUILD_PLATFORMS = 'linux/amd64,linux/arm64'
    }

    stages {
        stage('Setup Buildx') {
            steps {
                script {
                    echo 'Setting up Docker Buildx for multi-architecture builds'
                    sh '''
                        # Create a new builder instance if it doesn't exist
                        # Buildx is required for cross-platform image builds
                        docker buildx create --name multiarch-builder --use || docker buildx use multiarch-builder || true

                        # Bootstrap the builder to ensure it's ready
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
                        # Remove only project-specific images to avoid affecting other projects
                        # This ensures we build from scratch without using old cached layers
                        docker images --filter "reference=ghcr.io/garaemon/*" -q | xargs -r docker rmi -f || true

                        # Remove dangling images (untagged intermediate images)
                        docker images --filter "dangling=true" -q | xargs -r docker rmi || true

                        # Clean build cache for buildkit to force fresh builds
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
                            buildMultiArchImage('ros-noetic', 'docker/ros-noetic')
                        }
                    }
                }

                stage('Build ros-humble') {
                    steps {
                        script {
                            buildMultiArchImage('ros-humble', 'docker/ros-humble')
                        }
                    }
                }

                stage('Build ubuntu-focal') {
                    steps {
                        script {
                            buildMultiArchImage('ubuntu-focal', 'docker/ubuntu-focal')
                        }
                    }
                }

                stage('Build ubuntu-noble') {
                    steps {
                        script {
                            buildMultiArchImage('ubuntu-noble', 'docker/ubuntu-noble')
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
                            testImage('ros-noetic')
                        }
                    }
                }

                stage('Test ros-humble') {
                    steps {
                        script {
                            testImage('ros-humble')
                        }
                    }
                }

                stage('Test ubuntu-focal') {
                    steps {
                        script {
                            testImage('ubuntu-focal')
                        }
                    }
                }

                stage('Test ubuntu-noble') {
                    steps {
                        script {
                            testImage('ubuntu-noble')
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
