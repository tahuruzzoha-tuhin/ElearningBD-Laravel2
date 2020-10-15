<template>
    <div v-html="row.video_link"></div>
</template>


<script>
    export default {
        props: ['row'],
    }
</script>
