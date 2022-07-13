
        
  pipeline {
    agent any

    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
         
	}
    stages {
        stage("Build")
 {
 nodejs(nodeJSInstallationName: 'nodejs16.15.0') {
        sh 'npm install'
    }
 }  
 
  stage('ExecuteSonarQubeReport') {
     nodejs(nodeJSInstallationName: 'nodejs16.15.0') {
        sh 'npm run sonar'
    }
      
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

    }
}
  
  




         
 
