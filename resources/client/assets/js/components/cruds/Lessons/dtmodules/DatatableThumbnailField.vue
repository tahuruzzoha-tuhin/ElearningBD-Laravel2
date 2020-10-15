<template>
    <div v-html="row.thumbnail_link"></div>
</template>


<script>
    export default {
        props: ['row'],
    }
</script>
