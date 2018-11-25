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
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <a href="#" style="color: black; font-weight: bold">Dashboard</a>
                </li>
                <li>
                    <a href="#">Help</a>
                </li>
            </ul>
        </div>
        <div class="uk-section uk-section-muted uk-width-2-3" style="height: 1080px">
            <div class="uk-container uk-container-expand">
                <div v-if="username">
                    <div class="uk-flex">
                    <div class="uk-text-meta">YOU ARE CURRENTLY LOGGED IN AS {{username}}.</div>
                    <a href="#" v-on:click="logout" class="uk-text-meta uk-navbar-right">LOG OUT</a>
                    </div>
                    <h2>My Actions</h2>
                    <div v-for="action in actions">
                        <div
                            class="uk-card uk-card-default uk-card-hover uk-card-body"
                            style="margin-bottom: 20px;"
                        >
                            <div uk-grid>
                                <div class="uk-width-5-6">
                                    <h3 class="uk-card-title">{{action.title}}</h3>
                                    <div id="issueforaction">{{action.issue}}</div>
                                </div>
                                <div class="uk-width-1-6">
                                    <button class="uk-button uk-button-default">Mark as Complete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Issues I've Identified</h2>
                    <div v-for="issue in issues">
                        <router-link :to="{name: 'Issue', params:{iss: issue.id}}">
                            <IssueCard :issue="issue"></IssueCard>
                        </router-link>
                    </div>
                </div>
                <div v-if="!username" class="uk-text-center">
                    <h2>Log In</h2>
                    <div class="uk-margin">
                        <input v-model="inputtedUsername" class="uk-input uk-form-width-large" type="text" placeholder="username">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input uk-form-width-large" type="text" placeholder="password">
                    </div>
                    <button v-on:click="login" class="uk-button uk-button-primary uk-button-large">GO</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IssueCard from "./IssueCard";

export default {
  name: "Dashboard",
  components: {
    IssueCard
  },
  data: function() {
    return {
      username: '',
      inputtedUsername: '',
      actions: [
        {
          title: "Raise funds for water filtration plants",
          summary:
            "Water filtration plants can change a community for the better by providing clean water and employment opportunities",
          instructions: ["Donate now"],
          issue: "First Nations community without safe drinking water"
        },
        {
          title: "Donate school supplies for backpacks",
          summary:
            "Water filtration plants can change a community for the better by providing clean water and employment opportunities",
          instructions: ["Donate now"],
          issue: "Local kindergarten students in need of school supplies"
        }
      ],
      issues: [
        {
          id: 2,
          title: "Roadside trash is at an all-time high",
          percentComplete: 75
        },
        {
          id: 3,
          title: "More young women & girls needed in STEM fields",
          percentComplete: 25
        }
      ]
    };
  },
   mounted: function() {
      this.username = localStorage.username;
    },
  methods: {
   
    login: function() {
        this.username = this.inputtedUsername;
        localStorage.username = this.username;
    },
    logout: function() {
        this.username = '';
        localStorage.username = '';
    }
  }
};
</script>

<style scoped lang="less">
.uk-nav-primary,
.header,
h2,
.uk-text-meta,
.uk-card-title,
.uk-button, .uk-input {
  font-family: "Poppins", sans-serif;
}

.header {
  font-weight: 700;
  color: #f48fb1;
}

.uk-button-primary {
    background-color: #f48fb1;
    font-family: "Poppins", sans-serif;
}

.uk-text-meta {
  text-transform: uppercase;
}

#issueforaction {
  font-family: "Poppins", sans-serif;
  font-style: italic;
}
</style>