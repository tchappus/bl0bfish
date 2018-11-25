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
            </ul>
        </div>
        <div class="uk-section uk-section-muted uk-width-2-3">
            <div class="uk-container uk-container-expand">

                <div class="uk-flex uk-flex-middle">
                    <h2>Open Issues</h2>
                    <IssueCreation class="uk-navbar-right"></IssueCreation>
                </div>
                <div v-for="issue in issues">
                    <router-link :to="{name: 'Issue', params:{iss: issue.id}}">
                        <IssueCard :issue="issue"></IssueCard>
                    </router-link>
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
      username: null,
      issues: [
        {
          id: 1,
          title: "Local kindergarten students in need of school supplies",
          percentComplete: 50
        },
        {
          id: 2,
          title: "Roadside trash is at an all-time high",
          percentComplete: 75
        },
        {
          id: 3,
          title: "More young women & girls needed in STEM fields",
          percentComplete: 25
        },
        {
          id: 4,
          title: "First Nations community without safe drinking water",
          percentComplete: 20
        },
        {
          title: ""
        }
      ]
    };
  },
  methods: {},
  components: {
    IssueCard,
    IssueCreation
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