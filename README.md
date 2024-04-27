<b>SIT323/SIT737- Cloud Native Application Development</b>

<b>6.2C: Interacting with KubernetesInteracting with Kubernetes</b>

<ul>
      <li>Clone the repository.</li>
      <li>Run the command <b>kubectl apply -f .\createDeployment</b></li>
      <li>Run the command <b>kubectl apply -f .\createService</b></li>
      <li>Check the deployment status using this command <b>kubectl get deployments</b></li>
      <li>Check the pods status using this command <b>kubectl get pods</b></li>
      <li>Check the service status using this command <b>kubectl get status</b></li>
      <li>Once the applications are ready try http://localhost:8037/ to view the application.</li>
      <li>Update the image using <b>kubectl set image deployment calculator-mydeployment sit737-week5=container_image_name</b></li>
      <li>Check the image name used for deployment using this command <b>kubectl describe deployment deployment_name</b></li>
      <li>Forward port using this command <b>kubectl port-forward pod_name desired_port:container_port</b></li>
</ul>
