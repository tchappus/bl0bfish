<template>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body">
        <h3 class="uk-card-title">{{issue.title}}</h3>
    </div>
</template>

<script>
export default {
  name: "IssueCard",
  props: ['issue'],
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style>
.uk-card-title {
  font-family: "Michroma", sans-serif;
}
</style>