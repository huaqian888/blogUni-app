<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch123");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import "./wxcomponents/colorui/main.css";
@import "./wxcomponents/colorui/icon.css";
@import "./wxcomponents/colorui/animation.css";
@import "./wxcomponents/vant/common/index.wxss";
</style>
