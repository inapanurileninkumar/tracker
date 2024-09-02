<template>
  <div class="padding">
    <expenses />
    <div class="row justify-between pb-20 mt-20">
      <div class="col-md-6 col-sm-12 col-xs-12 pr-10 card">
        <div class="header">
          <div class="title">SETTLEMENTS</div>
          <div class="actions">
            <button class="action">+ Add Settlement</button>
          </div>
        </div>
        <div class="body">
          <settlements />
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">EMIs</div>
          <div class="actions">
            <button class="action">+ Add EMI</button>
          </div>
        </div>
        <div class="body">
          <EMIs />
        </div>
      </div>
    </div>
    <div class="row jusity-between mb-20">
      <div class="col-md-6 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">MONTHLY EXPENSES</div>
        </div>
        <div class="body">
          <monthly-expenses />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Expenses from '@/views/Expenses.vue'
import Settlements from '@/views/Settlements.vue'
import EMIs from '@/views/EMIs.vue'
import MonthlyExpenses from '@/views/MonthlyExpenses.vue'

export default {
  name: 'HomeView',
  components: {
    Expenses,
    Settlements,
    EMIs,
    MonthlyExpenses
  },
  computed: {
    ...mapGetters('emis', ['emis']),
    ...mapGetters('settlements', ['settlements'])
  }
}
</script>
