<template>
  <div class="chat-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大模型管理</el-breadcrumb-item>
      <el-breadcrumb-item>大模型对话</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chat-box">
      <el-input v-model="question" placeholder="请输入你的问题"></el-input>
      <el-button type="primary" @click="submitQuestion">提交</el-button>
    </div>
    <div v-if="answer" class="answer-container">
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      answer: ''
    };
  },
  methods: {
    async submitQuestion() {
      try {
          const res = await this.$http.post('/ai/getChatResponse', {
            userInput: this.question,
          });
          const responseData = typeof res.data.data === 'string' ? JSON.parse(res.data.data) : res.data.data;
          this.answer = responseData.choices[0].message.content;
        } catch (error) {
          console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  padding: 20px;
}

.chat-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.answer-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
