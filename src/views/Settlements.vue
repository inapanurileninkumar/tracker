<template>
    <table class="settlements">
        <thead>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Month</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(settlement, index) in settlements">
                <tr :key="settlement.id" :class="{ 'active': isActiveSettlement(settlement) }">
                    <td>{{ index + 1 }}</td>
                    <td>{{ settlement.name }}</td>
                    <td>{{ settlement.amount | formatNumber }}</td>
                    <td>{{ settlement.month | formatDate }}</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppSettlements',
  computed: {
    ...mapGetters('settlements', ['settlements']),
    ...mapGetters('configuration', ['currentMonth'])
  },
  methods: {
    isActiveSettlement (settlement) {
      return settlement.month === this.currentMonth
    }
  }
}
</script>
