
        
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
stage('deploy on k8s') {

     steps {
      sshagent(['k8s']) {
      sh "export AWS_SHARED_CREDENTIALS_FILE=/tmp/credentials"
      sh "scp -o strictHostkeyChecking=no mongo-config.yml ubuntu@54.242.60.53:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo-secret.yml ubuntu@54.242.60.53:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo.yml ubuntu@54.242.60.53:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no webapp.yml ubuntu@54.242.60.53:/home/ubuntu"
      script{
        try{
          sh "ssh ubuntu@54.242.60.53 kubectl apply  -f ."
        }catch(error){
           sh "ssh ubuntu@54.242.60.53 kubectl create  -f ."
        }                                                    
      }
}

     }


    }
    }
}
  
  




         
 
