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
                <li v-if="loggedIn">
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <a href="#">Help</a>
                </li>
                <li>
                    <button class="uk-button uk-button-default uk-margin-small-right" v-if="!loggedIn" type="button" uk-toggle="target: #modal-login">Login</button>
                    <button class="uk-button uk-button-default uk-margin-small-right" v-if="!loggedIn" type="button" uk-toggle="target: #modal-signup">Sign Up</button>
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
                    <div v-on:click="nav(issue.title)">
                        <IssueCard :issue="issue"></IssueCard>
                    </div>
                </div>
            </div>
        </div>

    <!-- modals here, one for login one for signup -->
    <!-- TODO: transition these to their own component, use event propogation to move the junk around, or mayberedux? -->
    <!--  login -->
    <div id="modal-login" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <h2 class="uk-modal-title">Login</h2>
            <form>
              <fieldset class="uk-fieldset">
                  <legend class="uk-legend-small">Welcome back!</legend>
                  <div class="uk-margin">
                      <input class="uk-input" v-model="username" type="text" placeholder="Username" required>
                  </div>
                  <div class="uk-margin">
                      <input class="uk-input" v-model="password" type="password" placeholder="Password" required>
                  </div>
                  <button class="uk-button uk-button-default uk-margin-small-right" type="submit" v-on:click="login">login</button>
              </fieldset>
          </form>
      </div>
    </div>
    <!-- signup -->
    <!-- TODO: facebook, gmail etc integration? OAUTH2? more info for creating their account? email confirmation? -->
    <div id="modal-signup" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <h2 class="uk-modal-title">Sign Up</h2>
          <form>
              <fieldset class="uk-fieldset">
                  <legend class="uk-legend-small">Welcome!</legend>
                  <div class="uk-margin">
                      <input class="uk-input" v-model="username" type="text" placeholder="Username" required>
                  </div>
                  <div class="uk-margin">
                      <input class="uk-input" v-model="password" type="password" placeholder="Password" required>
                  </div>
                  <button class="uk-button uk-button-default uk-margin-small-right" type="submit" v-on:click="signup">Sign Up</button>
              </fieldset>
          </form>
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
      password: "",
      loggedIn: false,
      issues: []
    };
  },
  methods: {
    //TODO: verify here, and exchange for like a key or smthn
    //TODO: add a logout
    login: function() {
      let username = this.username.trim();
      let password = this.password.trim();
      if(!username || !password){
        return;
      }
      localStorage.username = this.username;
      alert(`current user: ${this.username}`);
    },
    // TODO: same, make them relogin? also store a session key w/ expiration instead of just the username...
    signup: function() {
      let username = this.username.trim();
      let password = this.password.trim();
      if(!username || !password){
        return;
      }
      localStorage.username = this.username;
      alert(`current user: ${this.username}`);
    },
    nav: function(id) {
      this.$router.push({ name: "Issue", params: { issueid: id } });
    },
    refreshIssues: function() {
      var url ="http://localhost:3000/issue/all";
      var self = this;
      console.log(url);
      axios.get(url).then(res => {
      let result = res.data;
      for (let iss in result) {
        // TODO: here we need percentage of actions complete and shietttttt
        if (!result[iss].actions) {
          result[iss].percentComplete = 10;
        } else {
          result[iss].percentComplete = 20;
        }
        self.issues.push(result[iss]);
      }
    })
    }
  },
  components: {
    IssueCard,
    IssueCreation
  },
  mounted: function() {
    //TODO: add some indicator if the person is logged in
    if(localStorage.username)
      this.loggedIn = true;

    var self = this;
    var url ="http://localhost:3000/issue/all";
    axios.get(url).then(res => {
      let result = res.data;
      for (let iss in result) {
        // TODO: here we need percentage of actions complete and shietttttt
        if (!result[iss].actions) {
          result[iss].percentComplete = 10;
        } else {
          result[iss].percentComplete = 20;
        }
        self.issues.push(result[iss]);
      }
    })
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