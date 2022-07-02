
        
  pipeline {
    agent any

    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
         SHORT_COMMIT = "${GIT_COMMIT[0..7]}"
	}
    stages {
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build & push Dockerfile') {
            steps {
                sh "ansible-playbook ansible-playbook.yml" --extra-vars tag="$SHORT_COMMIT"'
            }
        }

        stage ('Deploy') {
            steps {
                sh """
		            export AWS_SHARED_CREDENTIALS_FILE=/tmp/credentials
	              	export kubeconfigites=/tmp/config
                    sed -i "s/TAG/$SHORT_COMMIT/g" webapp.yml
                     kubectl -n webapp apply -f mongo-config.yml
                     kubectl -n webapp apply -f mongo-secret.yml
	            	kubectl -n webapp apply -f mongo.yml
                    kubectl -n webapp apply -f webapp.yml
                    kubectl -n webapp apply -f ingress.yml
              """ 
	    }          
        }
    }
}
  
  




         
 
