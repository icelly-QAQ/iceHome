// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 如果使用路径别名，添加以下声明
declare module '@/*' {
  const value: any
  export default value
}