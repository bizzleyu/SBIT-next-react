# SBTI 人格测试

MBTI 已经过时，SBTI 来了。

原作：B站 [@蛆肉儿串儿](https://space.bilibili.com/417038183)

## 技术栈

- **框架**：Next.js 16 (App Router)
- **语言**：TypeScript
- **样式**：CSS Modules

## 项目结构

```
sbti-react/
├── public/image/          # 人格结果图片
└── src/
    ├── app/               # Next.js 路由入口 & 全局样式
    ├── components/        # React 组件（App / IntroScreen / TestScreen / Question / ResultScreen）
    ├── data/              # 题目、人格类型、维度数据
    ├── lib/               # 计分逻辑（computeResult 等纯函数）
    └── types/             # TypeScript 类型定义
```

## 本地运行

```bash
cd sbti-react
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 说明

- 共 30 道常规题 + 随机插入的 1 道特殊题，答题顺序随机打乱
- 选择「饮酒」爱好后会追加一道问题，触发隐藏人格 DRUNK
- 匹配度低于 60% 时会强制兜底为 HHHH（傻乐者）
- 仅供娱乐，请勿用于盈利
