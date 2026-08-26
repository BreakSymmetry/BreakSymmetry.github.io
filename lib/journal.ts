export type JournalPost = {
  slug: string;
  date: string;
  category: 'GAME DESIGN' | 'GAME AI' | 'MEDICINE AI';
  readTime: string;
  accent: 'acid' | 'blue' | 'coral';
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  englishAbstract: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  references?: Array<{ label: string; url: string }>;
};

export const journalPosts: JournalPost[] = [
  {
    slug: 'state-before-score',
    date: '2026.08.18',
    category: 'MEDICINE AI',
    readTime: '6 MIN',
    accent: 'blue',
    title: {
      zh: '先问“哪个状态”，再问“结合多强”',
      en: 'Ask which state before asking how strongly it binds',
    },
    summary: {
      zh: '静态结构和单一 Kd 往往压平了真正重要的生物过程。状态、时间与实验情境应当进入问题定义。',
      en: 'Static structures and a single Kd can flatten the biology that matters. State, time and experimental context belong in the question.',
    },
    englishAbstract: 'A working note on state-selective molecular recognition: why abundance is not importance, why kinetics and context belong in assay contracts, and why mechanism claims need a measurable transition after binding.',
    sections: [
      {
        heading: '结合不是终点',
        paragraphs: [
          '许多分子研究从“是否结合”开始，也停在这里。但生命系统不是静态零件的集合。同一个分子会处在不同构象、装配状态和细胞情境中；识别发生之后，还可能进入内化、信号、催化或失活等不同路径。',
          '因此，一个更有解释力的问题不是“它结合得多强”，而是“它在什么状态下结合、改变了哪一步转换、最后产生了什么可测动作”。',
        ],
      },
      {
        heading: '把状态写进实验合同',
        paragraphs: [
          '总 Kd 很有用，却不足以描述一个因果机制。研究记录至少还应保留目标状态、状态鉴别方法、population 与 lifetime、受影响的 kinetic step、化学计量和下游 readout。',
          '这样做的意义不是让表格更复杂，而是避免把不同的故事压成一个分数：更强结合、状态选择、构象稳定和功能改变并不是同一件事。',
        ],
      },
      {
        heading: '对 Medicine AI 的要求',
        paragraphs: [
          '模型如果只在静态复合物上得到高置信度，仍然不能自动推导细胞功能。更可信的路线是让模型提出可区分的状态假设，再用针对性的实验决定哪一种解释 survives。',
          '我们把这条纪律概括为 recognition → state transition → action。AI 的角色是缩小需要验证的空间，而不是跳过验证。',
        ],
      },
    ],
  },
  {
    slug: 'structures-are-ensembles',
    date: '2026.08.15',
    category: 'MEDICINE AI',
    readTime: '7 MIN',
    accent: 'coral',
    title: {
      zh: '一张结构图，不等于一个蛋白质',
      en: 'A single structure is not the whole protein',
    },
    summary: {
      zh: '从 qFit 到 Dyna-1：旧实验里被压缩或缺失的信息，可能成为理解蛋白质状态的新监督信号。',
      en: 'From qFit to Dyna-1, information compressed or missing in old experiments may become a new source of supervision for protein states.',
    },
    englishAbstract: 'Protein structures are measurements, not frozen truths. This note connects two complementary ideas: recovering local conformational heterogeneity from crystallographic density, and decoding slower exchange from experimental missingness with frozen protein representations.',
    sections: [
      {
        heading: '结构是测量结果',
        paragraphs: [
          '我们习惯把 PDB 里的坐标当作蛋白质本身，但它更准确地说是特定实验、条件与建模选择下的一次压缩。平均坐标很清晰，也会把局部异质性、低占比状态和时间信息折叠掉。',
          '这不意味着静态结构无用，而是提醒我们：模型输入和标签都带着测量过程留下的形状。',
        ],
      },
      {
        heading: '从“丢掉的信息”中学习',
        paragraphs: [
          'qFit 的启发是从 X-ray density 中恢复局部 alternative coordinates 与 occupancy；Dyna-1 则把 NMR assignment missingness 当作弱标签，尝试解码微秒到毫秒尺度的交换倾向。两条路线都在问：既有实验数据库的负空间里，是否藏着被单一标签忽略的状态信息。',
          '它们互补，却不能互换。局部替代坐标不是时间轨迹，交换概率也不是完整的构象集合。保留这种边界，才不会把一个新信号过早包装成完整机制。',
        ],
      },
      {
        heading: '一个可验证的公共沙盒',
        paragraphs: [
          '可执行的下一步不是立刻训练更大的基础模型，而是固定简单问题：冻结表示能否在未见蛋白家族上预测实验支持的异质性，并且优于 B-factor、SASA、packing 等简单基线。',
          '严格的 family、structure、time 与实验情境切分，比随机 residue split 更重要。只有当输出在独立实验上仍然有用，才说明潜空间中存在可迁移的生物信号。',
        ],
      },
    ],
    references: [
      { label: 'Dyna-1 · Nature', url: 'https://doi.org/10.1038/s41586-026-10989-4' },
    ],
  },
  {
    slug: 'evidence-prediction-experiment',
    date: '2026.08.10',
    category: 'MEDICINE AI',
    readTime: '7 MIN',
    accent: 'acid',
    title: {
      zh: 'Medicine AI 的最小闭环',
      en: 'The smallest useful loop in Medicine AI',
    },
    summary: {
      zh: '真正的进展不是再增加一个模型，而是关闭一次“证据 → 预测 → 区分性实验 → 数据回流”的循环。',
      en: 'Progress is not one more model. It is closing an evidence → prediction → discriminating experiment → feedback loop.',
    },
    englishAbstract: 'Our current Medicine AI thesis is deliberately narrow: build a model-independent, experimentally calibrated workbench that can turn one biological question into traceable evidence, a preregistered prediction, a discriminating experiment and useful feedback.',
    sections: [
      {
        heading: '模型地图不是研究结果',
        paragraphs: [
          '生物 AI 领域每天都会出现新的结构模型、生成器、评分器和 agent workflow。收集它们很容易形成“正在高速前进”的感觉，却不一定缩短任何一个科学问题的距离。',
          '如果没有稳定的数据接口、明确的失败条件和能区分竞争假设的实验，再完整的工具地图也无法告诉我们：哪些表示真的包含可用于预测或控制的生物学信息。',
        ],
      },
      {
        heading: '四个必须连接的环节',
        paragraphs: [
          '第一步是证据：对象、来源、实验情境与不确定性都可追溯。第二步是预测：在揭晓结果之前冻结判断。第三步是区分性实验：结果需要让至少一个解释失去立足点。第四步是回流：包括失败、no-call 和未推进原因，而不只保存成功候选。',
          '这套闭环与具体模型无关。模型可以替换，证据纪律、对照、holdout 和 lineage 不能随新闻周期一起替换。',
        ],
      },
      {
        heading: '软件工程背景的价值',
        paragraphs: [
          '软件工程并不能替代实验生物学，但擅长把模糊目标变成对象定义、数据合同、可复现流程、审计日志和失败恢复。它最适合连接通用 LLM、专业序列/结构模型与真实实验。',
          '我们的目标不是让聊天模型单独“设计药物”，而是让不同工具在边界清楚的系统里工作，并让实验拥有最终判决权。',
        ],
      },
    ],
  },
  {
    slug: 'agent-runtime-for-game-ai',
    date: '2026.08.08',
    category: 'GAME AI',
    readTime: '6 MIN',
    accent: 'blue',
    title: {
      zh: 'AI NPC 需要的不是更长的提示词',
      en: 'AI NPCs need runtime discipline, not longer prompts',
    },
    summary: {
      zh: '事件溯源、能力边界与无副作用回放，可能比“让角色更聪明”更早决定 AI NPC 能否上线。',
      en: 'Event sourcing, capability boundaries and side-effect-free replay may decide whether AI NPCs can ship before intelligence does.',
    },
    englishAbstract: 'A production-minded note on AI NPC architecture: preserve causal events, constrain actions, version decisions and make failures replayable—without storing hidden reasoning or turning real-time combat into an unconstrained LLM workflow.',
    sections: [
      {
        heading: '聪明不是唯一瓶颈',
        paragraphs: [
          'AI NPC demo 往往把注意力放在对话是否自然、人格是否鲜明。但上线之后，更难的问题是状态是否一致、动作是否越权、故障能否复盘、重试会不会重复结算。',
          '因此生产架构需要一层很薄的运行治理：事件是事实，状态是投影；每个动作都有能力边界；每次决定都有版本和来源。',
        ],
      },
      {
        heading: '记录行动，不记录隐藏思维',
        paragraphs: [
          '可审计不等于保存模型的隐藏 chain-of-thought。真正需要的是面向行动的 artifact：输入引用、目标、候选意图、选中动作、规则检查、执行结果和状态版本。',
          '这些结构化信息足以回答“为什么做这个动作”，也更容易脱敏、测试与跨版本比较。',
        ],
      },
      {
        heading: '最小可验证实验',
        paragraphs: [
          '从一条非战斗 NPC 流程开始，在模型完成、动作完成和状态投影三个位置模拟崩溃。系统应能从 snapshot 与 immutable events 恢复，并在回放时不重新调用模型、不重复经济结算。',
          '成功标准不是“采用了某个架构名词”，而是同一故障可以被定位、恢复且无副作用回放。',
        ],
      },
    ],
  },
  {
    slug: 'surprisal-as-damage',
    date: '2026.07.08',
    category: 'GAME DESIGN',
    readTime: '8 MIN',
    accent: 'coral',
    title: {
      zh: '如果“惊讶”本身就是伤害',
      en: 'What if surprise itself caused damage?',
    },
    summary: {
      zh: '把 proper scoring rule 从记分板搬进物理引擎：理解不是收藏品，而是玩家真正的防御力。',
      en: 'Move proper scoring rules from the scoreboard into the physics: understanding becomes the player’s real defense.',
    },
    englishAbstract: 'A game design thought experiment: the player carries an explicit belief distribution, encounters sample the world, and surprise becomes damage. The useful reward is not randomness—it is the later compression that makes future encounters cheaper.',
    sections: [
      {
        heading: '从分数到物理',
        paragraphs: [
          '设想玩家的 build 不是一组攻击数字，而是对世界的显式信念分布。每次遭遇都是一次采样，实际发生的事越出乎预料，伤害越高。准备充分的玩家不一定输出更大，却更难被世界击穿。',
          '这个机制的关键不是套用信息论术语，而是让“理解世界”成为能改变生存状态的物理量。',
        ],
      },
      {
        heading: '为什么奖励惊讶会走向老虎机',
        paragraphs: [
          '单纯奖励预测误差会遇到 noisy TV：随机噪声每一帧都很惊讶，却没有任何东西被理解。游戏里的退化版本就是只给稀有度尖峰、不提供可学习结构的掉落。',
          '更好的闭环是：惊讶发生时造成伤害；玩家找到可验证的解释后，伤害被退还，未来同类遭遇也变得更便宜。奖励发生在世界模型被压缩的那一刻。',
        ],
      },
      {
        heading: '回到 Roguelike',
        paragraphs: [
          '这会改变 buff、经济和死亡结算的设计。信息型 buff 可以提前暴露弹幕或下一房间，尾部保险砍掉不可学习的致命黑天鹅；商店则允许玩家花资源购买确定性。',
          '死亡必须开收据：告诉玩家伤害来自哪里、哪个规律没有看懂，并让这次学习进入下一局。可以死于“还没学会”，不能死于“根本不可能学会”。',
        ],
      },
      {
        heading: '让比喻接受玩测',
        paragraphs: [
          '纸面原型只需要申报分布、采样和结算三步。若玩家无法凭直觉理解，或移除这套机制后决策几乎不变，它就只是一块漂亮的仪表盘。',
          '一个理论进入游戏的资格，不是它听起来深，而是它能产生别的规则无法替代的决定。',
        ],
      },
    ],
  },
  {
    slug: 'space-as-a-game-operator',
    date: '2026.07.12',
    category: 'GAME DESIGN',
    readTime: '6 MIN',
    accent: 'acid',
    title: {
      zh: '让空间不再只是地图',
      en: 'When space stops being just a map',
    },
    summary: {
      zh: '用少量方向、点与线控制高维战场：前线、群体与流动可以成为可学习的因果系统。',
      en: 'Use a few directions, points and lines to control a high-dimensional battlefield of fronts, groups and flows.',
    },
    englishAbstract: 'A gameplay research proposal for turning space from passive terrain into an operator. Low-dimensional player inputs shape fields, fronts and groups, while local combat and macro geometry remain causally coupled.',
    sections: [
      {
        heading: '玩法核不是网格技术',
        paragraphs: [
          '真正有价值的不是使用 Dual Grid、half-edge 或某个数学名词，而是建立“低维输入 → 高维结果”的可学习因果。玩家只给一个方向、一个点或一条短线，战场却产生可以预判和逐渐掌握的整体变化。',
          '如果玩家必须理解方程才能玩，设计失败；如果移除场系统后决策不变，它也只是表现层。',
        ],
      },
      {
        heading: '塔不是 Buff，而是边界条件',
        paragraphs: [
          '传统塔点亮后可能提供攻速或伤害加成。另一种做法是让塔改变整个战场的边界条件：占领顺序、相对位置和强度连续地移动前线，玩家争夺的是几何控制权。',
          '局部枪战必须能改写宏观场，宏观场也必须反过来影响局部战斗。双向耦合是它成为玩法而不是 UI 的最低要求。',
        ],
      },
      {
        heading: '先做一次能裁决的薄片',
        paragraphs: [
          '第一版可以完全没有战斗，只验证玩家能否预判点亮一座塔会怎样移动前线。随后再比较逐格染色与连续边界，区分“更漂亮”与“更可读”。',
          '只有当这个最小薄片产生熟练度，才值得继续做群体控制、多分辨率或 GPU 加速。原创性需要工程耐心来保护。',
        ],
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
