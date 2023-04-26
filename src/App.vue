<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {})
onShow(() => {})
onHide(() => {})
</script>
<style>
@import './wxcomponents/colorui/main.css';
@import './wxcomponents/colorui/icon.css';
@import './wxcomponents/colorui/animation.css';
@import './wxcomponents/vant/common/index.wxss';
page {
  background-color: #f0f0f0;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment-icon {
  width: 20px;
  height: 20px;
  background: url('https://api.iconify.design/uil/comment-lines.svg?flip=horizontal')
    no-repeat center center / contain;
}
</style>
