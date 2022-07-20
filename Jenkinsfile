
        
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
      sh "scp -o strictHostkeyChecking=no mongo-config.yml ubuntu@54.175.164.90:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo-secret.yml ubuntu@54.175.164.90:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no mongo.yml ubuntu@54.175.164.90:/home/ubuntu"
      sh "scp -o strictHostkeyChecking=no wabapp.yml ubuntu@54.175.164.90:/home/ubuntu"
      script{
        try{
          sh "ssh ubuntu@54.175.164.90 kubectl apply  -f ."
        }catch(error){
           sh "ssh ubuntu@54.175.164.90 kubectl create  -f ."
        }                                                    
      }
}

     }


    }
    }
}
  
  




         
 
