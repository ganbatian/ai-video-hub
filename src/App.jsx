import React, { useState } from 'react'
import { Video, Wand2, User, Scissors, Mic, FileText, Star, ExternalLink, Search, ChevronDown, ChevronUp, Zap, Layers } from 'lucide-react'

const tools = [
  // ── Text/Image → Video ──
  {
    name: 'Sora',
    url: 'https://openai.com/sora',
    category: '文生视频',
    desc: 'OpenAI 文生视频模型，支持最长 60 秒逼真视频生成，对标好莱坞制作水准。',
    tags: ['文生视频', 'OpenAI', '60秒'],
    rating: 4.9,
    free: false,
    highlight: true,
    color: 'from-red-500 to-orange-600',
    features: ['最长60秒', '逼真渲染', '物理世界模拟', '创意叙事'],
  },
  {
    name: 'Runway ML',
    url: 'https://runwayml.com',
    category: 'AI 视频',
    desc: 'Gen-3 Alpha 视频生成，支持文字/图片转视频，AI 擦除、慢动作、风格迁移。',
    tags: ['文生视频', '视频编辑', 'AI特效'],
    rating: 4.7,
    free: true,
    highlight: true,
    color: 'from-purple-500 to-violet-600',
    features: ['Gen-3 Alpha', '视频编辑', '绿幕抠像', '风格迁移'],
  },
  {
    name: 'Pika Labs',
    url: 'https://pika.art',
    category: 'AI 视频',
    desc: '简洁易用的 AI 视频生成工具，支持文字/图片生成视频，社区活跃，创意丰富。',
    tags: ['文生视频', '图片生视频', '免费使用'],
    rating: 4.6,
    free: true,
    highlight: true,
    color: 'from-pink-500 to-rose-600',
    features: ['文字转视频', '图片动画', '社区创意', '多种比例'],
  },
  {
    name: 'Luma Dream Machine',
    url: 'https://lumalabs.ai/dream-machine',
    category: '文生视频',
    desc: '高质量文生视频模型，支持细腻的动作和镜头运动，生成速度快，开放体验中。',
    tags: ['文生视频', '高质量', '免费体验'],
    rating: 4.5,
    free: true,
    highlight: false,
    color: 'from-amber-500 to-yellow-600',
    features: ['文字/图片生成', '高流畅度', '免费体验', 'API支持'],
  },
  {
    name: 'Kling AI',
    url: 'https://klingai.com',
    category: '文生视频',
    desc: '快手可灵 AI，支持 3 分钟长视频生成，物理模拟真实，动作连贯，支持镜头控制。',
    tags: ['文生视频', '3分钟', '镜头控制'],
    rating: 4.6,
    free: false,
    highlight: true,
    color: 'from-orange-500 to-red-600',
    features: ['3分钟长视频', '镜头运动', '物理模拟', '电影级'],
  },
  {
    name: 'Haiper AI',
    url: 'https://haiper.ai',
    category: 'AI 视频',
    desc: '专注于高质量视频生成和增强，支持视频延长、风格化、分辨率提升。',
    tags: ['视频增强', '视频延长', '免费'],
    rating: 4.3,
    free: true,
    highlight: false,
    color: 'from-cyan-500 to-blue-600',
    features: ['视频增强', '视频延长', '风格迁移', '4K支持'],
  },
  // ── Avatar / Talking Photo ──
  {
    name: 'HeyGen',
    url: 'https://heygen.com',
    category: '数字人',
    desc: 'AI 数字人视频生成，支持 120+ 语言的逼真数字分身，一键翻译视频，企业级品质。',
    tags: ['数字人', 'AI主播', '视频翻译'],
    rating: 4.7,
    free: true,
    highlight: true,
    color: 'from-emerald-500 to-teal-600',
    features: ['120+语言', '数字分身', '视频翻译', '模板丰富'],
  },
  {
    name: 'Synthesia',
    url: 'https://synthesia.io',
    category: '数字人',
    desc: '专业 AI 视频制作平台，140+ 逼真 AI 主播，适合企业培训、营销视频制作。',
    tags: ['数字人', '企业培训', 'AI主播'],
    rating: 4.6,
    free: false,
    highlight: false,
    color: 'from-indigo-500 to-blue-600',
    features: ['140+AI主播', 'PPT转视频', '多语言', '品牌定制'],
  },
  {
    name: 'D-ID',
    url: 'https://d-id.com',
    category: '数字人',
    desc: 'AI 照片说话人，将静态照片转化为动态说话视频，支持 API 集成。',
    tags: ['照片动画', '说话视频', 'API'],
    rating: 4.4,
    free: true,
    highlight: false,
    color: 'from-violet-500 to-purple-600',
    features: ['照片转视频', 'API集成', '创意写真', '多风格'],
  },
  // ── Video Editing / Post ──
  {
    name: 'CapCut',
    url: 'https://capcut.com',
    category: '剪辑工具',
    desc: 'AI 智能剪辑工具，一键生成字幕、智能裁剪、抠像、音频降噪，零门槛上手。',
    tags: ['智能剪辑', '自动字幕', '免费'],
    rating: 4.8,
    free: true,
    highlight: true,
    color: 'from-blue-500 to-indigo-600',
    features: ['AI字幕', '自动裁剪', '背景移除', '丰富特效'],
  },
  {
    name: 'Descript',
    url: 'https://descript.com',
    category: '剪辑工具',
    desc: '像编辑文档一样编辑视频，AI 转录、自动去除语气词、屏幕录制、远程录制。',
    tags: ['转录编辑', '去语气词', '屏幕录制'],
    rating: 4.5,
    free: true,
    highlight: false,
    color: 'from-slate-600 to-gray-800',
    features: ['文字剪辑', 'AI转录', '去除语气词', '协作编辑'],
  },
  {
    name: 'Veed.io',
    url: 'https://veed.io',
    category: '在线剪辑',
    desc: '在线 AI 视频编辑器，支持自动字幕、翻译、压缩、格式转换，无需下载。',
    tags: ['在线编辑', '字幕翻译', '免下载'],
    rating: 4.4,
    free: true,
    highlight: false,
    color: 'from-teal-500 to-green-600',
    features: ['自动字幕', '翻译', '格式转换', '协作'],
  },
  // ── Audio / Subtitle ──
  {
    name: 'Memo AI',
    url: 'https://memo.app',
    category: '字幕配音',
    desc: 'AI 音视频转字幕工具，支持多语言识别、翻译、导出 SRT/ASS，YouTube/B站必备。',
    tags: ['字幕工具', '翻译', 'SRT导出'],
    rating: 4.6,
    free: true,
    highlight: false,
    color: 'from-yellow-500 to-amber-600',
    features: ['多语言字幕', '翻译', 'SRT导出', '视频下载'],
  },
  {
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io',
    category: 'AI 配音',
    desc: '超逼真 AI 语音合成，支持声音克隆、多语言配音、情感控制，专业级音质。',
    tags: ['AI配音', '声音克隆', '多语言'],
    rating: 4.8,
    free: true,
    highlight: false,
    color: 'from-sky-500 to-blue-600',
    features: ['声音克隆', '28+语言', '情感控制', 'API支持'],
  },
]

const categories = ['全部', '文生视频', 'AI 视频', '数字人', '剪辑工具', '在线剪辑', '字幕配音', 'AI 配音']
const categoryIcons = {
  '全部': Video,
  '文生视频': Wand2,
  'AI 视频': Wand2,
  '数字人': User,
  '剪辑工具': Scissors,
  '在线剪辑': Scissors,
  '字幕配音': FileText,
  'AI 配音': Mic,
}

export default function App() {
  const [category, setCategory] = useState('全部')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [freeOnly, setFreeOnly] = useState(false)

  const filtered = tools.filter(t =>
    (category === '全部' || t.category === category) &&
    (!freeOnly || t.free) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
     t.desc.includes(search) ||
     t.tags.some(tag => tag.includes(search)))
  )

  const highlights = tools.filter(t => t.highlight)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI 视频创作工具</h1>
              <p className="text-xs text-white/40">{tools.length} 款精选视频 AI 工具</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            用 AI 让创意动起来
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            从文字生成视频、AI 数字人到智能剪辑，这里汇总了最值得使用的 AI 视频创作工具
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <div className="text-xs text-white/30 uppercase tracking-wider mb-3">⭐ 编辑推荐</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {highlights.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mb-3`}>
                  <Video className="w-4 h-4" />
                </div>
                <div className="font-semibold text-sm mb-1 flex items-center gap-1.5 flex-wrap">
                  {t.name}
                  {t.free && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">免费</span>}
                </div>
                <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{t.desc}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-white/50">{t.rating}</span>
                  <span className="text-xs text-white/30 ml-2">{t.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="搜索工具..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 outline-none focus:border-red-500/50 text-sm"
            />
          </div>
          <button
            onClick={() => setFreeOnly(!freeOnly)}
            className={`px-3 py-2 rounded-xl text-sm border transition-all ${freeOnly ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}`}
          >
            仅免费
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => {
            const Icon = categoryIcons[cat]
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  category === cat ? 'bg-white text-gray-900 font-medium' : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Tool grid */}
        <div className="text-xs text-white/30 mb-3 uppercase tracking-wider">
          {category} · {filtered.length} 款工具
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-sm">{t.name}</span>
                        {t.free && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">免费</span>}
                        {t.highlight && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full">推荐</span>}
                        <span className="text-xs bg-white/10 text-white/40 px-1.5 py-0.5 rounded-full">{t.category}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">{t.desc}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-white/50">{t.rating}</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {t.tags.map((tag, j) => (
                            <span key={j} className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      {expanded === i ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                    </button>
                    <a href={t.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              {expanded === i && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3">
                  <div className="text-xs text-white/30 mb-2 uppercase tracking-wider">核心功能</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {t.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-red-400">创作路径推荐</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/60">
            <div>
              <div className="font-medium text-white/80 mb-1">🎬 短视频创作者</div>
              <p className="text-xs leading-relaxed"><strong className="text-white/70">Runway</strong>（AI特效）或 <strong className="text-white/70">Pika</strong>（文生视频）开始</p>
            </div>
            <div>
              <div className="font-medium text-white/80 mb-1">📚 企业培训/营销</div>
              <p className="text-xs leading-relaxed"><strong className="text-white/70">HeyGen</strong>（数字人）或 <strong className="text-white/70">Synthesia</strong>（AI主播）</p>
            </div>
            <div>
              <div className="font-medium text-white/80 mb-1">✂️ 后期剪辑提效</div>
              <p className="text-xs leading-relaxed"><strong className="text-white/70">CapCut</strong>（AI字幕）和 <strong className="text-white/70">Memo AI</strong>（翻译字幕）</p>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-white/20">
          <p>AI 视频创作工具 · {new Date().getFullYear()} 持续更新</p>
        </footer>
      </div>
    </div>
  )
}
