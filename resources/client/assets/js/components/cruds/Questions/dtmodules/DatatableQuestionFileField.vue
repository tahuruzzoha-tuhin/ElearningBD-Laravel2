<template>
    <div v-html="row.question_file_link"></div>
</template>


<script>
    export default {
        props: ['row'],
    }
</script>
