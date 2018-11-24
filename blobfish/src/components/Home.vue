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
                    <a href="#">Profile</a>
                </li>
                <li>
                    <a href="#">Help</a>
                </li>
            </ul>
        </div>
        <div class="uk-section uk-section-muted uk-width-2-3">
            <div class="uk-container uk-container expand">
                <h2>Open Issues</h2>
                <div v-for="issue in issues">
                    <IssueCard issue="issue" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import IssueCard from "./IssueCard";

export default {
  name: "Home",
  data: function() {
    return {
        issues: [
            {
                title: "Local kindergarten students in need of school supplies"
            },
            {
                title: "Roadside trash is at an all-time high"
            },
            {
                title: "More young women & girls needed in STEM fields"
            },
            {
                title: "First Nations community without safe drinking water"
            },
            {
                title: ""
            }
        ]

    };
  },
  methods: {},
  components: {
      IssueCard
  }
};
</script>

<style scoped lang="less">
.uk-nav-primary,
.header,
h2 {
  font-family: "Michroma", sans-serif;
}

.header {
  font-weight: bold;
  color: #f48fb1;
}
</style>