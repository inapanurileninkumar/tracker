<template>
    <table class="emis">
        <thead>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Start Month</th>
                <th>End Month</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(emi, index) in emis">
                <tr :key="emi.id" :class="{ 'active': isActiveEMI(emi) }">
                    <td>{{ index + 1 }}</td>
                    <td>{{ emi.name }}</td>
                    <td>{{ emi.amount | formatNumber }}</td>
                    <td>{{ emi.startDate | formatDate }}</td>
                    <td>{{ emi.endDate | formatDate }}</td>
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
    ...mapGetters('emis', ['emis']),
    ...mapGetters('configuration', ['currentMonth'])
  },
  methods: {
    isActiveEMI (emi) {
      return emi.startDate <= this.currentMonth && emi.endDate >= this.currentMonth
    }
  }
}
</script>
