<style scoped>
/* 阅读页面容器 */
.read-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

/* 文章卡片 */
.article-card {
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
  padding: 30px;
  margin-bottom: 30px;
}

/* 文章标题 */
.article-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.3;
}

/* 文章元信息 */
.article-meta {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* 文章内容 */
.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
}

/* 文章底部操作 */
.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* 评论区容器 */
.comments-section {
  border-radius: 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
  padding: 30px;
  margin-bottom: 30px;
}

/* 评论区标题 */
.comments-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.comments-count {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
  font-weight: normal;
}

/* 评论表单 */
.comment-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group-half {
  flex: 1;
}

.comment-input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  resize: none;
}

.comment-input:focus {
  outline: none;
  border-color: #409eff;
}

.submit-button {
  background: #409eff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background: #66b1ff;
}

.submit-button:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
}

/* 评论列表 */
.comments-list {
  margin-top: 30px;
}

/* 评论项 */
.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.comment-item:last-child {
  border-bottom: none;
}

/* 置顶评论标记 */
.sticky-badge {
  background: #f56c6c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}

/* 评论头部信息 */
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-author {
  display: flex;
  align-items: center;
}

.author-name {
  font-weight: 600;
  color: #333;
  margin-right: 10px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

/* 评论内容 */
.comment-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 10px;
}

/* 评论操作 */
.comment-actions {
  display: flex;
  gap: 15px;
}

.comment-action {
  font-size: 12px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.comment-action:hover {
  color: #409eff;
}

/* 回复列表 */
.replies-list {
  margin-left: 40px;
  margin-top: 15px;
}

/* 回复项 */
.reply-item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.reply-item:last-child {
  border-bottom: none;
}

/* 回复表单 */
.reply-form {
  margin-top: 15px;
  margin-bottom: 15px;
}

.reply-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  resize: none;
  height: 80px;
}

.reply-input:focus {
  outline: none;
  border-color: #409eff;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 10px;
}

.cancel-button {
  background: #f56c6c;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.reply-submit-button {
  background: #409eff;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

/* 正在回复提示 */
.replying-to {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

/* 加载状态 */
.loading-container {
  text-align: center;
  color: #666;
  padding: 20px;
}

/* 空状态 */
.empty-comments {
  text-align: center;
  color: #999;
  padding: 40px;
  font-size: 14px;
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 80px;
  left: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
}

.back-button:hover {
  background: rgba(255, 255, 255, 1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .read-container {
    padding: 15px;
  }
  
  .article-card,
  .comments-section {
    padding: 20px;
  }
  
  .article-title {
    font-size: 20px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .replies-list {
    margin-left: 20px;
  }
  
  .back-button {
    top: 70px;
    left: 10px;
    width: 35px;
    height: 35px;
  }
}
</style>

<template>
  <div>
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <n-icon size="18" type="arrow-back" />
    </div>
    
    <div class="read-container">
      <!-- 加载状态 -->
      <n-flex v-if="loading" justify="center" align="center" style="height: 60vh;">
        <n-spin size="large" />
      </n-flex>
      
      <!-- 错误状态 -->
      <n-flex v-else-if="error" justify="center" align="center" style="height: 60vh;">
        <n-card class="err-card" style="width: 600px; max-width: 90%;">
          <n-result status="404" title="内容不存在" description="抱歉，您访问的内容不存在或已被删除">
            <template #footer>
              <n-button @click="goBack">返回</n-button>
            </template>
          </n-result>
        </n-card>
      </n-flex>
      
      <!-- 文章内容 -->
      <div v-else>
        <!-- 文章卡片 -->
        <div class="article-card">
          <h1 class="article-title">{{ content.title }}</h1>
          
          <div class="article-meta">
            <span>{{ formatDate(content.created_at) }}</span>
            <span style="margin: 0 10px;">·</span>
            <span>{{ content.views }} 阅读</span>
            <span v-if="content.category" style="margin: 0 10px;">·</span>
            <span v-if="content.category">{{ content.category }}</span>
          </div>
          
          <div class="article-content">
            <div v-html="content.content"></div>
          </div>
          
          <div class="article-actions">
            <div>
              <n-button size="small" type="default" @click="likeContent">
                 <n-icon type="heart" />
                 <span style="margin-left: 5px;">{{ content.likes || 0 }}</span>
               </n-button>
            </div>
            <div>
              <n-button size="small" type="primary" @click="shareContent">
                 <n-icon type="share-alt" />
                 <span style="margin-left: 5px;">分享</span>
               </n-button>
            </div>
          </div>
        </div>
        
        <!-- 评论区 -->
        <div class="comments-section">
          <h2 class="comments-title">
            评论
            <span class="comments-count">({{ comments.length }})</span>
          </h2>
          
          <!-- 评论表单 -->
          <div class="comment-form">
            <div class="form-row">
              <div class="form-group-half">
                <n-input
                  v-model:value="newComment.name"
                  placeholder="昵称"
                  :maxlength="20"
                  class="comment-input"
                  type="text"
                />
              </div>
              <div class="form-group-half">
                <n-input
                  v-model:value="newComment.email"
                  placeholder="邮箱"
                  :maxlength="50"
                  class="comment-input"
                  type="email"
                />
              </div>
            </div>
            
            <div class="form-group">
              <n-input
                v-model:value="newComment.content"
                placeholder="写下你的评论..."
                :maxlength="500"
                class="comment-input"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
              />
            </div>
            
            <div class="form-group">
              <n-button 
                :disabled="!canSubmitComment" 
                @click="submitComment"
                class="submit-button"
              >
                发布评论
              </n-button>
            </div>
          </div>
          
          <!-- 评论列表 -->
          <div class="comments-list" v-if="comments.length > 0">
            <div 
              v-for="comment in comments" 
              :key="comment.id"
              class="comment-item"
            >
              <!-- 置顶标记 -->
              <span v-if="comment.sticky" class="sticky-badge">置顶</span>
              
              <!-- 评论头部 -->
              <div class="comment-header">
                <div class="comment-author">
                  <span class="author-name">{{ comment.name }}</span>
                  <span class="comment-time">{{ formatDate(comment.created_at) }}</span>
                </div>
              </div>
              
              <!-- 评论内容 -->
              <div class="comment-content">{{ comment.content }}</div>
              
              <!-- 评论操作 -->
              <div class="comment-actions">
                <span class="comment-action" @click="toggleReplyForm(comment)">
                   <n-icon size="14" type="chat-dot-round" />
                   <span style="margin-left: 3px;">回复</span>
                 </span>
                 <span class="comment-action" @click="likeComment(comment)">
                   <n-icon size="14" type="heart" />
                   <span style="margin-left: 3px;">{{ comment.likes || 0 }}</span>
                 </span>
              </div>
              
              <!-- 回复表单 -->
              <div v-if="replyingTo === comment.id" class="reply-form" :data-comment-id="comment.id">
                <div class="replying-to">回复 @{{ comment.name }}</div>
                <n-input
                  v-model:value="replyContent"
                  placeholder="写下你的回复..."
                  :maxlength="300"
                  class="reply-input"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                />
                <div class="reply-actions">
                  <n-button @click="cancelReply" class="cancel-button">取消</n-button>
                  <n-button 
                    :disabled="!replyContent.trim()" 
                    @click="submitReply(comment)"
                    class="reply-submit-button"
                  >
                    回复
                  </n-button>
                </div>
              </div>
              
              <!-- 回复列表 -->
              <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
                <div 
                  v-for="reply in comment.replies" 
                  :key="reply.id"
                  class="reply-item"
                >
                  <div class="comment-header">
                    <div class="comment-author">
                      <span class="author-name">{{ reply.name }}</span>
                      <span class="comment-time">{{ formatDate(reply.created_at) }}</span>
                    </div>
                  </div>
                  <div class="comment-content">
                    <span style="color: #666;">@{{ reply.reply_to_name }} </span>
                    {{ reply.content }}
                  </div>
                  <div class="comment-actions">
                    <span class="comment-action" @click="toggleReplyForm(comment, reply)">
                       <n-icon size="14" type="chat-dot-round" />
                       <span style="margin-left: 3px;">回复</span>
                     </span>
                     <span class="comment-action" @click="likeReply(reply)">
                       <n-icon size="14" type="heart" />
                       <span style="margin-left: 3px;">{{ reply.likes || 0 }}</span>
                     </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空评论状态 -->
          <div v-else class="empty-comments">
            暂无评论，快来发表第一条评论吧！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { NIcon } from 'naive-ui';

// 定义内容类型
interface Content {
  id: number;
  title: string;
  content: string;
  created_at: string;
  views: number;
  likes?: number;
  category?: string;
  type: 'article' | 'note';
}

// 定义评论类型
interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
  likes?: number;
  sticky?: boolean;
  replies?: Reply[];
}

// 定义回复类型
interface Reply {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
  likes?: number;
  reply_to_id: number;
  reply_to_name: string;
}

// 路由相关
const route = useRoute();
const router = useRouter();

// 状态管理
const loading = ref(true);
const error = ref(false);
const content = ref<Content>({
  id: 0,
  title: '',
  content: '',
  created_at: '',
  views: 0,
  type: 'article'
});
const comments = ref<Comment[]>([]);

// 评论表单状态
const newComment = ref({
  name: '',
  email: '',
  content: ''
});

// 回复状态
const replyingTo = ref<number | null>(null);
const replyContent = ref('');
const replyTarget = ref<{ comment: Comment; reply?: Reply } | null>(null);

// 计算属性
const canSubmitComment = computed(() => {
  return (
    newComment.value.name.trim().length > 0 &&
    newComment.value.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newComment.value.email) &&
    newComment.value.content.trim().length > 0
  );
});

// 获取内容详情
const fetchContent = async () => {
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    const response = await axios.get(`https://back.icelly.xyz/api/v1/${contentType}s/${id}`);
    content.value = response.data;
    content.value.type = contentType;
    
    // 同时获取评论
    await fetchComments();
  } catch (err) {
    console.error('获取内容失败:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// 获取评论
const fetchComments = async () => {
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    const response = await axios.get(`https://back.icelly.xyz/api/v1/${contentType}s/${id}/comments`);
    comments.value = response.data.comments || [];
  } catch (err) {
    console.error('获取评论失败:', err);
  }
};

// 发布评论
const submitComment = async () => {
  if (!canSubmitComment.value) return;
  
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    const response = await axios.post(
      `https://back.icelly.xyz/api/v1/${contentType}s/${id}/comments`,
      {
        name: newComment.value.name.trim(),
        email: newComment.value.email.trim(),
        content: newComment.value.content.trim()
      }
    );
    
    // 添加新评论到列表
    comments.value.push(response.data);
    
    // 清空表单
    newComment.value = { name: '', email: '', content: '' };
    
    // 显示成功提示
    showNotification('评论发布成功！', 'success');
  } catch (err) {
    console.error('发布评论失败:', err);
    showNotification('评论发布失败，请稍后重试', 'error');
  }
};

// 切换回复表单
const toggleReplyForm = (comment: Comment, reply?: Reply) => {
  if (replyingTo.value === comment.id && replyTarget.value?.comment === comment) {
    // 如果已经在回复这个评论，则取消回复
    replyingTo.value = null;
    replyTarget.value = null;
    replyContent.value = '';
  } else {
    // 开始回复
    replyingTo.value = comment.id;
    replyTarget.value = { comment, reply };
    replyContent.value = reply ? `@${reply.name} ` : '';
    
    // 滚动到回复框
    setTimeout(() => {
      const replyForm = document.querySelector(`[data-comment-id="${comment.id}"]`);
      if (replyForm && replyForm instanceof Element) {
        replyForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
};

// 取消回复
const cancelReply = () => {
  replyingTo.value = null;
  replyTarget.value = null;
  replyContent.value = '';
};

// 提交回复
const submitReply = async (comment: Comment) => {
  if (!replyContent.value.trim() || !replyTarget.value) return;
  
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    const response = await axios.post(
      `https://back.icelly.xyz/api/v1/${contentType}s/${id}/comments/${comment.id}/replies`,
      {
        name: newComment.value.name.trim(), // 复用评论的昵称和邮箱
        email: newComment.value.email.trim(),
        content: replyContent.value.trim(),
        reply_to_id: replyTarget.value.reply?.id || comment.id,
        reply_to_name: replyTarget.value.reply?.name || comment.name
      }
    );
    
    // 添加回复到对应的评论
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(response.data);
    
    // 清空回复状态
    cancelReply();
    
    // 显示成功提示
    showNotification('回复发布成功！', 'success');
  } catch (err) {
    console.error('发布回复失败:', err);
    showNotification('回复发布失败，请稍后重试', 'error');
  }
};

// 点赞内容
const likeContent = async () => {
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    await axios.post(`https://back.icelly.xyz/api/v1/${contentType}s/${id}/like`);
    content.value.likes = (content.value.likes || 0) + 1;
    showNotification('点赞成功！', 'success');
  } catch (err) {
    console.error('点赞失败:', err);
  }
};

// 点赞评论
const likeComment = async (comment: Comment) => {
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    await axios.post(`https://back.icelly.xyz/api/v1/${contentType}s/${id}/comments/${comment.id}/like`);
    comment.likes = (comment.likes || 0) + 1;
  } catch (err) {
    console.error('点赞评论失败:', err);
  }
};

// 点赞回复
const likeReply = async (reply: Reply) => {
  try {
    const { id, type } = route.params;
    const contentType = type as 'article' | 'note';
    
    await axios.post(`https://back.icelly.xyz/api/v1/${contentType}s/${id}/replies/${reply.id}/like`);
    reply.likes = (reply.likes || 0) + 1;
  } catch (err) {
    console.error('点赞回复失败:', err);
  }
};

// 分享内容
const shareContent = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showNotification('链接已复制到剪贴板', 'success');
  });
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 显示通知
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  // 这里可以替换为你项目中使用的通知组件
  console.log(`${type}: ${message}`);
  // 例如使用 naive-ui 的 notification
  // nNotification[type]({ content: message });
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 组件挂载时获取内容
onMounted(() => {
  fetchContent();
});
</script>