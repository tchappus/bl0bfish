<template>
    <div class="uk-flex">
        <div class="uk-width-1-3 uk-margin-left uk-margin-top">
            <ul class="uk-nav-primary uk-nav-parent-icon" uk-nav>
                <li class="uk-active">
                    <div class="uk-flex uk-flex-middle">
                        <img
                            src="@/assets/icon.jpg"
                            style="width: 100px; margin-right: 10px; margin-top: 20px"
                        >
                        <h2 class="header">bl0bfish.tech</h2>
                    </div>
                </li>
                <li>
                    <router-link to="/" style="color: black;">
                        <span uk-icon="icon: chevron-left"></span>Home
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="uk-section uk-section-muted uk-width-2-3">
            <div class="uk-container uk-container-expand">
                <h2>{{issue.title}}</h2>
                <div uk-grid>
                    <div class="uk-width-1-2 uk-text-center">
                        <pie-chart
                            :data="chartData"
                            :colors="['#f48fb1', 'grey']"
                            :donut="true"
                            :legend="false"
                        ></pie-chart>
                        <h4>{{issue.percentComplete}}% Complete</h4>
                    </div>
                    <div class="uk-width-1-2 uk-flex uk-flex-middle uk-text-center">
                        <h2 style="color: #d32f2f;">Severity Level:
                            <br>
                            {{issue.severity}}
                        </h2>
                    </div>
                    <br>
                    <div class="uk-width-1-5">
                        <h5>Author:</h5>
                    </div>
                    <div class="uk-width-4-5">
                        <p>{{issue.author}}</p>
                    </div>
                    <div class="uk-width-1-5">
                        <h5>Must Complete By:</h5>
                    </div>
                    <div class="uk-width-4-5">
                        <p>{{issue.completionDate}}</p>
                    </div>
                    <br>
                    <div class="uk-width-1-5">
                        <h5>Summary:</h5>
                    </div>
                    <div class="uk-width-4-5">
                        <p>{{issue.summary}}</p>
                    </div>
                    <br>
                    <div class="uk-width-1-5">
                        <h5>Completion Goals:</h5>
                    </div>
                    <div class="uk-width-4-5">
                        <p>{{issue.completionGoals}}</p>
                    </div>
                    <div class="uk-width-1-1">
                        <div class="uk-flex uk-flex-middle">
                            <h2>Tasks</h2>
                            <taskCreation :issueid="$route.params.issueid" class="uk-navbar-right"></taskCreation>
                        </div>
                        <ul uk-accordion="multiple: true">
                            <li v-for="(task, index) in tasks">
                                <a class="uk-accordion-title" href="#">{{index+1}}. {{task.title}}</a>
                                <div class="uk-accordion-content">
                                    <p>{{task.summary}}</p>
                                    <ul>
                                        <li v-for="inst in task.instructions">{{inst}}</li>
                                    </ul>
                                    <button
                                        class="uk-button uk-button-primary"
                                        :click="taketask(task)"
                                    >Take task</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import taskCreation from "./TaskCreation";

export default {
  name: "Issue",
  components: {
    taskCreation
  },
  data: function() {
    return {
      userid: localStorage.username,
      issue: {
        author: null,
        title: null,
        percentComplete: null,
        severity: null,
        completionDate: null,
        summary: null,
        completionGoals: null
      },
      tasks: []
    };
  },
  methods: {
    taketask: function(task) {
      //make POST request
    }
  },
  computed: {
    chartData: function() {
      const percentUncomplete = 100 - this.issue.percentComplete;
      return [
        ["completed", this.issue.percentComplete],
        ["uncompleted", percentUncomplete]
      ];
    }
  },
  mounted: function(){
    var title = window.location.href.split("/").pop()
    console.log(title);
    var url = `http://localhost:3000/issue/single/${title}`;
    var self = this;
    axios.get(url).then((res)=>{
        console.log('res',res.data);
        self.issue = res.data;
        //TODO: recalc the steps completed hre? idk...
        if(!self.issue.percentComplete)
            self.issue.percentComplete =10;
    });
  }
};
</script>

<style scoped lang="less">
.uk-nav-primary,
.header,
h2,
h4,
h5,
p,
ul {
  font-family: "Poppins", sans-serif;
  color: black;
}

.header {
  font-weight: 700;
  color: #f48fb1;
}

.uk-button-primary {
  font-family: "Poppins", sans-serif;
  background-color: #f48fb1;
}
</style>