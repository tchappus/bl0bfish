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
                        <p>{{issue.targetCompletion}}</p>
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
                            <h2>Actions</h2>
                            <ActionCreation :issueid="$route.params.issueid" class="uk-navbar-right"></ActionCreation>
                        </div>
                        <ul uk-accordion="multiple: true">
                            <li v-for="(action, index) in actions">
                                <a class="uk-accordion-title" href="#">{{index+1}}. {{action.title}}</a>
                                <div class="uk-accordion-content">
                                    <p>{{action.summary}}</p>
                                    <ul>
                                        <li v-for="inst in action.instructions">{{inst}}</li>
                                    </ul>
                                    <button
                                        class="uk-button uk-button-primary"
                                        :click="takeAction(action)"
                                    >Take Action</button>
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
import ActionCreation from "./ActionCreation";

export default {
  name: "Issue",
  components: {
    ActionCreation
  },
  data: function() {
    return {
      userid: localStorage.username,
      issue: {
        id: 4,
        author: null,
        title: null,
        percentComplete: null,
        severity: null,
        targetCompletion: null,
        summary: null,
        completionGoals: null
      },
    //   {
    //     id: 4,
    //     author: "Trent Chappus",
    //     title: "First Nations community without safe drinking water",
    //     percentComplete: 20,
    //     severity: "HIGH",
    //     targetCompletion: "December 2019",
    //     summary:
    //       "The northern Ontario community of Kashechewan made headlines all over Canada in 2005, when its poor water quality and unsanitary conditions forced the evacuation of 1,000 of its residents. The evacuation order raised awareness about a much larger problem: more than 80 First Nations communities are currently under “boiled water advisories” and 21 communities are deemed to be at high-risk for contamination. In Canada, contamination and inadequate water and sanitation services in First Nations communities are a real and present threat to human health and the environment. - https://canadians.org/fn-water",
    //     goals:
    //       "Fresh drinking water is readily accessible to all First Nations communities in Canada."
    //   },
      actions: []
    //   [
    //     {
    //       title:
    //         "Research new & innovative ways to filter water in affected communities",
    //       summary:
    //         "With more efficient and cost effective options, affected First Nations communities can more easily reach a long-term solution. This action is for researchers, scientists, and engineers.",
    //       instructions: [
    //         "Establish a nation-wide collaborative effort between researchers, to effectively communicate ongoing research and lessons learned."
    //       ]
    //     },
    //     {
    //       title: "Raise funds for water filtration plants",
    //       summary:
    //         "Water filtration plants can change a community for the better by providing clean water and employment opportunities",
    //       instructions: ["Donate now"]
    //     },
    //     {
    //       title: "Help deliver purified water to affected communities",
    //       summary: "",
    //       instructions: ["Sign up to deliver today"]
    //     },
    //     {
    //       title:
    //         "Email your Member of Parliament about your concern regarding this issue",
    //       summary: "",
    //       instructions: ["Email now"]
    //     }
    //   ]
    };
  },
  methods: {
    takeAction: function(action) {
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
    let url =`https://jdomaga.lib.id/blobfish-backend/getissue?id=${this.$route.params.issueid}`;
    var self = this;
    console.log(url);
    axios.get(url).then((res)=>{
        console.log('res',res.data);
        self.issue = JSON.parse(res.data);
    });
    console.log(this.issue);
    // for(let act of this.issue.actions){
    //     alert();
    // }

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