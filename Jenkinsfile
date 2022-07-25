
        
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
      sh "scp -o strictHostkeyChecking=no mongo-config.yml ubuntu@184.72.82.178:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo-secret.yml ubuntu@184.72.82.178:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo.yml ubuntu@184.72.82.178:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no webapp.yml ubuntu@184.72.82.178:/home/ubuntu"
      script{
        try{
          sh "ssh ubuntu@184.72.82.178 kubectl apply  -f ."
        }catch(error){
           sh "ssh ubuntu@184.72.82.178 kubectl create  -f ."
        }                                                    
      }
}

     }


    }
    }
}
  
  




         
 
