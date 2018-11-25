<template>
    <router-link :to="{ name: 'Issue', params: { issueid: issue.id }}">
    <div class="uk-card uk-card-default uk-card-hover uk-card-body" style="margin-bottom: 20px;">
        <div class="uk-flex uk-flex-middle" uk-grid>
            <div class="uk-width-1-6">
            <pie-chart :data="chartData" :colors="['#f48fb1', '#ffffff']"  :donut="true" :legend="false" height="50px"></pie-chart>
            </div>
            <div class="uk-width-5-6">
            <h3 class="uk-card-title">{{issue.title}}</h3>
            </div>
        </div>
    </div>
    </router-link>
</template>

<script>
export default {
  name: "IssueCard",
  props: ['issue'],
  data: function() {
    return {};
  },
  methods: {},
  computed: {
      chartData: function() {
          const percentUncomplete = 100 - this.issue.percentComplete;
          return [
              [
                "completed",
                this.issue.percentComplete
              ],
              [
                  "uncompleted",
                percentUncomplete
              ]

          ]
      }
  }
};
</script>

<style>
.uk-card-title {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>