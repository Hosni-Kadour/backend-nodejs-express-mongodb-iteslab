
        
        pipeline {
  environment {
    imagename = "hosnikadour/backend-iteslab"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  stages {
   
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("$BUILD_NUMBER")
              dockerImage.push('latest') 
            
        }
        }
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


         
 
