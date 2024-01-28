<template>
    <DataTable :value="todaysMeals" tableStyle="" class="table">
    <Column field="calories" header="Calories"></Column>
    <Column field="name" header="Name"></Column>
    <!-- <Column field="type" header="Type"></Column> -->
    <!-- <Column field="hunger" header="Hunger"></Column> -->
    <!-- <Column field="date" header="Date"></Column> -->

</DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const props = defineProps(['todaysMeals'])

</script>

<style scoped>

.table {
    margin-top: 40px;
    
}

</style>