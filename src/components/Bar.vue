<template>
  <div>
    {{ $store.state.name }}  
   
  </div>
</template>

<style scoped="true">
div {
  background: red;
}
</style>

<script>
export default {
    asyncData(store){ // 在服务端执行的方法  ，只是这个方法在后端执行
      console.log('server call')
       // axios.get('/服务端路径')
        return Promise.resolve('success')
    },
    mounted(){ // 浏览器执行 ，后端忽略
      
    }
}
</script>
