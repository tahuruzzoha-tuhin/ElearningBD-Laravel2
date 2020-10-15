<template>
    <div v-html="row.question_image_link"></div>
</template>


<script>
    export default {
        props: ['row'],
    }
</script>
