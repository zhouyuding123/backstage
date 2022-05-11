<template>
    <div>
        activitySeatch
        <button @click="asd">123</button>
    </div>
</template>

<script>
import {bannerListApi} from "../../../urls/urls.js"
export default {
    methods: {
        asd() {
            bannerListApi()
        }
    }
}
</script>