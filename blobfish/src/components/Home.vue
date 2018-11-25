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
                    <a href="#" style="color: black; font-weight: bold">Home</a>
                </li>
                <li>
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <a href="#">Help</a>
                </li>
                <li>
                    <p>todo: remove, is temp</p>
                    <input v-model="username" class="uk-input" type="text" placeholder="login">
                    <button v-on:click="login">login</button>
                </li>
            </ul>
        </div>
        <div class="uk-section uk-section-muted uk-width-2-3" style="height: 1080px">
            <div class="uk-container uk-container-expand">
                <div class="uk-flex uk-flex-middle">
                    <h2>Open Issues</h2>
                    <IssueCreation class="uk-navbar-right" v-on:new-issue="refreshIssues"></IssueCreation>
                </div>
                <div v-for="issue of issues">
                    <div v-on:click="nav(issue._id)">
                        <IssueCard :issue="issue"></IssueCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import IssueCard from "./IssueCard";
import IssueCreation from "./IssueCreation";

export default {
  name: "Home",
  data: function() {
    return {
      username: "",
      issues: []
      // [{
      //   id: 1,
      //   title: "Local kindergarten students in need of school supplies",
      //   percentComplete: 50
      // },
      // {
      //   id: 2,
      //   title: "Roadside trash is at an all-time high",
      //   percentComplete: 75
      // },
      // {
      //   id: 3,
      //   title: "More young women & girls needed in STEM fields",
      //   percentComplete: 25
      // },
      // {
      //   id: 4,
      //   title: "First Nations community without safe drinking water",
      //   percentComplete: 20
      // },
      // {
      //   title: ""
      // }]
    };
  },
  methods: {
    login: function() {
      localStorage.username = this.username;
      alert(`current user: ${this.username}`);
    },
    nav: function(id) {
      this.$router.push({ name: "Issue", params: { issueid: id } });
    },
    refreshIssues: function() {
      let url = `https://jdomaga.lib.id/blobfish-backend/getallissues`;
      var self = this;
      console.log(url);
      axios.get(url).then(res => {
        let result = JSON.parse(res.data);
        console.log("got res", result);
        self.issues = [];
        for (let iss of result) {
          console.log("iss", iss);
          if (iss.actions.length) {
          } else {
            iss.percentComplete = 20;
          }
          self.issues.push(iss);
        }
      });
      console.log("completed", this.issues);
    }
  },
  components: {
    IssueCard,
    IssueCreation
  },
  mounted: function() {
    let url = `https://jdomaga.lib.id/blobfish-backend/getallissues`;
    var self = this;
    console.log(url);
    axios.get(url).then(res => {
      let result = JSON.parse(res.data);
      console.log("got res", result);
      for (let iss of result) {
        console.log("iss", iss);
        if (iss.actions.length) {
        } else {
          iss.percentComplete = 20;
        }
        self.issues.push(iss);
      }
    });
    console.log("completed", this.issues);
  }
};
</script>

<style scoped lang="less">
.uk-nav-primary,
.header,
h2 {
  font-family: "Poppins", sans-serif;
}

.header {
  font-weight: 700;
  color: #f48fb1;
}
</style>