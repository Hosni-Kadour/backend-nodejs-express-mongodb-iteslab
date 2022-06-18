pipeline {
    agent any

    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}
    stages {
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build & push Dockerfile') {
            steps {
                sh "ansible-playbook ansible-playbook.yml"
            }
        }
        stage('Prune Docker data') {
      steps {
        sh 'docker system prune -a --volumes -f'
        sh 'docker image prune'
      }
    }
    stage('Start container') {
      steps {
        
        sh 'docker-compose up -d'
        sh 'docker-compose ps'
      }
    }
    }
 
  post {
    always {
      sh 'docker-compose down --remove-orphans -v'
      sh 'docker-compose ps'
    }
  }
}


         
 
