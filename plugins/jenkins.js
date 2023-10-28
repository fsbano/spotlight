const axios = require('axios')
const Plugins = require('./plugins');
const Jenkins = Object.create(Plugins);

var jobs = []

Jenkins.name = 'Jenkins';
Jenkins.description = 'Jenkins';
Jenkins.execute = function() {
    axios.post(`http://${process.env.JENKINS_USERNAME}:${process.env.JENKINS_API_KEY}@${process.env.JENKINS_API_BASE_URL}` + '/api/json',)
    .then(response => {
      Object.entries(response.data).forEach(([key, value]) => {
        switch(key) {
          case "jobs":
            Object.entries(value).forEach(([index]) => {
              switch(value[index]._class) {
                case "com.cloudbees.hudson.plugins.folder.Folder":
                  jobFolder(value[index].url)
                  break
                case "org.jenkinsci.plugins.workflow.job.WorkflowJob":
                  jobDescription(value[index].url)
                  break
                case "org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject":
                  jobFolder(value[index].url, jobs)
                break                  
              }
            })
            break
        }
      });
    })
    .finally(function () {
      return ( "[" + jobs + "]" )
      // reset array
      jobs.length = 0
      // -
    })
    .catch(error => {
      console.log(error);
  });

};

module.exports = Jenkins;