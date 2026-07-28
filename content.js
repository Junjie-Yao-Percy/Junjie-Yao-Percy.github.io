/*
 * ================================================================
 *  EDITABLE RESUME CONTENT
 * ================================================================
 *  Update personal information, experience, publications, awards,
 *  patents, links, and contact details in this file.
 *
 *  Visual design lives in styles.css.
 *  Rendering and interactions live in app.js.
 */

window.SITE_CONTENT = {
  meta: {
    title: 'Yao Junjie · 姚俊杰 — Personal Site',
    brand: '~/yao-junjie'
  },

  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Publications', href: '#publications' },
    { label: 'Awards', href: '#awards' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Contact', href: '#contact' }
  ],

  hero: {
    greeting: '// hmm...',
    nameZh: '我是姚俊杰',
    nameEn: "I'm Yao Junjie",
    degree: 'M.S. in Computer Science',
    school: '@ UESTC',
    summary: 'Researching neural architecture search, edge AI, and embodied AI.',
    scholarUrl: 'https://scholar.google.com/citations?hl=zh-CN&user=N9Y21zgAAAAJ'
  },

  about: {
    status: 'Open to research collaboration · 2026',
    nameZh: '姚俊杰',
    nameEn: 'Yao Junjie',
    taglineHtml: 'First-year M.S. at <em>UESTC</em>. I work on making deep learning <em>efficient</em> enough to run on UAVs, edge boxes, and robots — not just on a benchmark leaderboard.',
    featuredPublicationId: 'aei-2025',
    featuredAuthorsHtml: 'Zhu G., Shen S.-L., <b>Yao J.</b>, Wang M., Zhuang J., Fan Z.',
    featuredVenue: 'Adv. Eng. Informatics · 2025, 68: 103610 · DOI: 10.1016/j.aei.2025.103610',
    featuredSummary: 'A DPSO-based NAS method that searches lightweight detection networks — significantly smaller and faster than hand-designed baselines, ready for embedded deployment on road-inspection rigs.',
    focus: [
      'Computer Vision',
      'Neural Architecture Search',
      'Edge AI',
      'Embodied AI'
    ],
    currentlyHtml: 'Research intern at <span class="org">Guangming Lab (Shenzhen)</span> on vLLM-Ascend adaptation, and at <span class="org">Shenzhen Loop Area Institute</span> on embodied-AI simulation for road maintenance.',
    stats: [
      { value: 5, label: 'Publications' },
      { value: 2, label: 'Internships' },
      { value: 4, label: 'Patents' },
      { value: 4, label: 'Awards' }
    ],
    github: {
      startDate: '2025-07-27',
      endDate: '2026-07-28',
      contributions: {
        '2026-07-15': 1,
        '2026-07-27': 33,
        '2026-07-28': 5
      }
    }
  },

  experience: [
    {
      organization: 'Guangming Lab — AI & Digital Economy (Shenzhen)',
      period: '2026-05 — Present',
      role: 'Research Intern · LLM Inference on Ascend NPU',
      bulletsHtml: [
        'Adapted <b>vLLM-plugin-FL</b> to Ascend NPUs: re-implemented model loading, device management, runtime interfaces, and key operators.',
        'Optimized <b>PagedAttention</b>, <b>Continuous Batching</b>, and <b>KV Cache</b> for long-context and high-concurrency inference workloads.'
      ]
    },
    {
      organization: 'Shenzhen Loop Area Institute',
      period: '2026-06 — Present',
      role: 'Research Intern · Embodied AI & Digital-Twin City',
      bulletsHtml: [
        'Research on proactive data intelligence, digital-twin cities, and embodied-AI simulation: <b>road-crack data generation</b>, lightweight detection & segmentation, geometric measurement, and UAV / inspection-vehicle edge deployment.',
        'Built a closed-loop pipeline of <b>simulation → training → embodied verification → data feedback</b>.'
      ]
    }
  ],

  publications: [
    {
      id: 'aei-2025',
      title: 'Automatic lightweight networks for real-time road crack detection with DPSO',
      authorsHtml: 'Zhu G., Shen S.-L., <b>Yao J.</b>, Wang M., Zhuang J., Fan Z.',
      venue: 'Adv. Eng. Informatics · 2025, 68: 103610 · DOI: 10.1016/j.aei.2025.103610',
      summary: 'We propose a lightweight network auto-search method based on Discrete Particle Swarm Optimization (DPSO) for real-time road crack detection. The approach significantly reduces model size and compute cost while maintaining detection accuracy, enabling real-time inference on embedded devices.',
      readUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S1474034625005038',
      pdfUrl: 'papers/aei-2025-dpso.pdf',
      coverUrl: 'papers/covers/aei-2025-1.png',
      coverAlt: 'AEI 2025 — first page of paper',
      tag: { label: 'SCI Q1 · ESI', className: 'q1' },
      coverBadge: { label: 'SCI Q1', className: 'pub-cover-badge-q1' },
      citation: {
        title: 'Automatic lightweight networks for real-time road crack detection with DPSO',
        authors: 'Zhu, G., Shen, S.-L., Yao, J., Wang, M., Zhuang, J., & Fan, Z.',
        venue: 'Advanced Engineering Informatics',
        year: 2025,
        vol: '68',
        pages: '103610',
        doi: '10.1016/j.aei.2025.103610',
        type: 'article',
        publisher: 'Elsevier BV'
      }
    },
    {
      id: 'cec-2025',
      title: 'U-Shaped Network Based on Particle Swarm Optimization for Retinal Vessel Segmentation',
      authorsHtml: '<b>Yao J.</b>, Zhu G., Zhuang J., Hao Z., Li W., Fan Z.',
      venue: 'IEEE CEC 2025 · pp. 1–8 · DOI: 10.1109/CEC65147.2025.11043060',
      summary: 'First work to apply Particle Swarm Optimization (PSO) to jointly search the hyperparameters and architecture of U-shaped encoder–decoder segmentation networks. Outperforms hand-tuned U-Net on multiple public retinal vessel datasets, reducing reliance on expert prior knowledge.',
      readUrl: 'https://ieeexplore.ieee.org/document/11043060',
      pdfUrl: 'papers/cec-2025-psounet.pdf',
      coverUrl: 'papers/covers/cec-2025-1.png',
      coverAlt: 'CEC 2025 — first page of paper',
      tag: { label: 'CCF-C', className: 'ccf' },
      coverBadge: { label: 'CCF-C', className: 'pub-cover-badge-ccf' },
      citation: {
        title: 'U-Shaped Network Based on Particle Swarm Optimization for Retinal Vessel Segmentation',
        authors: 'Yao, J., Zhu, G., Zhuang, J., Hao, Z., Li, W., & Fan, Z.',
        venue: '2025 IEEE Congress on Evolutionary Computation (CEC)',
        year: 2025,
        pages: '1–8',
        doi: '10.1109/CEC65147.2025.11043060',
        type: 'inproceedings',
        publisher: 'IEEE'
      }
    },
    {
      id: 'isoirs-2026',
      title: 'Domain-Generalized Road Crack Segmentation Via Causal-Inspired Channel Attention',
      authorsHtml: 'Yin Y., Zhu G., <b>Yao J.</b>, Li Z., Zhuang J., Fan Z.',
      venue: 'ISoIRS 2026 · IEEE · pp. 1–6 · DOI: 10.1109/ISOIRS70157.2026.11545303',
      summary: 'To address the poor cross-domain generalization of road crack segmentation across cities and acquisition devices, we design a causality-inspired channel attention module that explicitly disentangles domain-invariant structural features from domain-specific texture features, improving segmentation stability on unseen domains.',
      readUrl: 'https://ieeexplore.ieee.org/document/11545303',
      pdfUrl: 'papers/isoirs-2026-causal.pdf',
      coverUrl: 'papers/covers/isoirs-2026-1.png',
      coverAlt: 'ISoIRS 2026 — first page of paper',
      tag: { label: 'IEEE', className: 'venue' },
      coverBadge: { label: 'IEEE', className: 'pub-cover-badge-venue' },
      citation: {
        title: 'Domain-Generalized Road Crack Segmentation Via Causal-Inspired Channel Attention',
        authors: 'Yin, Y., Zhu, G., Yao, J., Li, Z., Zhuang, J., & Fan, Z.',
        venue: '2026 6th International Symposium on Intelligent Robotics and Systems (ISoIRS)',
        year: 2026,
        pages: '1–6',
        doi: '10.1109/ISOIRS70157.2026.11545303',
        type: 'inproceedings',
        publisher: 'IEEE'
      }
    },
    {
      id: 'mind-2025',
      title: 'A Causality-Guided Adaptive Dual-Population Evolutionary Algorithm for Constrained Multi-Objective Optimization',
      authorsHtml: 'Huang J., Wang Z., Li W., Hu J., Xu B., Huang S., <b>Yao J.</b>, Li Y., Fan Z.',
      venue: 'MIND 2025 · IEEE · pp. 217–222 · DOI: 10.1109/MIND67540.2025.11351801',
      summary: 'We incorporate causal inference into an adaptive dual-population evolutionary algorithm for constrained multi-objective optimization. A causality-guided population division strategy achieves a better trade-off between search efficiency, solution diversity, and constraint handling.',
      readUrl: 'https://ieeexplore.ieee.org/document/11351801',
      pdfUrl: 'papers/mind-2025-cmop.pdf',
      coverUrl: 'papers/covers/mind-2025-1.png',
      coverAlt: 'MIND 2025 — first page of paper',
      tag: { label: 'IEEE', className: 'venue' },
      coverBadge: { label: 'IEEE', className: 'pub-cover-badge-venue' },
      citation: {
        title: 'A Causality-Guided Adaptive Dual-Population Evolutionary Algorithm for Constrained Multi-Objective Optimization',
        authors: 'Huang, J., Wang, Z., Li, W., Hu, J., Xu, B., Huang, S., Yao, J., Li, Y., & Fan, Z.',
        venue: '2025 International Conference on Machine Intelligence and Nature-Inspired Computing (MIND)',
        year: 2025,
        pages: '217–222',
        doi: '10.1109/MIND67540.2025.11351801',
        type: 'inproceedings',
        publisher: 'IEEE'
      }
    },
    {
      id: 'cac-2025',
      title: 'Design and Implementation of a Mobile Robot System for Road Crack Detection',
      authorsHtml: 'Du Y., Zhu G., Yin Y., Zeng X., <b>Yao J.</b>, Fan Z.',
      venue: 'CAC 2025 · IEEE · pp. 5665–5670 · DOI: 10.1109/CAC67268.2025.11487324',
      summary: 'From algorithm to hardware, we design and implement a mobile robot system for road crack detection that integrates image acquisition, embedded model inference, and remote monitoring. Field tests on real-world road scenes validate the feasibility and engineering deployability of the proposed approach.',
      readUrl: 'https://ieeexplore.ieee.org/document/11487324',
      pdfUrl: 'papers/cac-2025-crack-robot.pdf',
      coverUrl: 'papers/covers/cac-2025-1.png',
      coverAlt: 'CAC 2025 — first page of paper',
      tag: { label: 'IEEE', className: 'venue' },
      coverBadge: { label: 'IEEE', className: 'pub-cover-badge-venue' },
      citation: {
        title: 'Design and Implementation of a Mobile Robot System for Road Crack Detection',
        authors: 'Du, Y., Zhu, G., Yin, Y., Zeng, X., Yao, J., & Fan, Z.',
        venue: '2025 China Automation Congress (CAC)',
        year: 2025,
        pages: '5665–5670',
        doi: '10.1109/CAC67268.2025.11487324',
        type: 'inproceedings',
        publisher: 'IEEE'
      }
    }
  ],

  worksInProgress: [
    {
      status: 'Under Review',
      authorsHtml: 'Wang M., Chen R., <b>Yao J.</b>, Zhuang J., Fan Z., Zhu G.',
      title: 'LiteCrackNAS: A Lightweight Neural Architecture Search Framework with a Diversity-Aware Strategy for Pavement Crack Detection',
      venue: 'Computer-Aided Civil and Infrastructure Engineering'
    },
    {
      status: 'To Submit',
      authorsHtml: '<b>Yao J.</b>, Zhu G., Zhuang J., et al.',
      title: 'Causal Feature Disentanglement for Domain-Generalized Road Crack Segmentation',
      venue: 'Advanced Engineering Informatics'
    }
  ],

  awards: [
    {
      emoji: '🏆',
      textHtml: '<b>National First Prize</b> — 25th / 26th / 27th China Robotics & AI Competition',
      detail: '3 consecutive years · 2023 — 2025'
    },
    {
      emoji: '🥇',
      textHtml: '<b>National First Prize</b> — 6th SFLEP National Cross-Cultural English Capability Competition',
      detail: '2023'
    },
    {
      emoji: '🏅',
      textHtml: 'National Third Prize — 2023 China Mechanical Engineering Innovation Competition (Digital Design of Mechanical Products)',
      detail: '2023'
    },
    {
      emoji: '🚀',
      textHtml: '<b>Southwest Region Champion</b> — 2026 National IC Innovation & Entrepreneurship Competition · Sophgo Cup',
      detail: '2026'
    }
  ],

  patents: [
    '基于陆空协同的道路裂缝智能识别与精准修补方法及系统 (Land-Air Collaborative Intelligent Road Crack Detection & Precise Repair Method and System)',
    '基于离散二进制粒子群优化的自动化编码-解码网络的视网膜血管分割方法及系统 (Automated Encoder-Decoder Network based on Discrete Binary PSO for Retinal Vessel Segmentation)',
    '基于改进粒子群算法优化的U型神经网络的道路裂缝分割方法及系统 (Improved PSO-optimized U-Net for Road Crack Segmentation)',
    '探地雷达信号图像处理方法、装置、设备及介质 (Ground-Penetrating Radar Signal Image Processing Method, Apparatus, Device & Medium)'
  ],

  highlight: {
    title: '📹 6th SFLEP National Cross-Cultural English Competition · 2023',
    description: 'Footage from the national finals and official recognition by the SFLEP organizing committee and Shantou University. See related coverage below for context.',
    links: [
      {
        icon: '🌐',
        label: 'SFLEP Official',
        url: 'https://ict.sflep.com/index.php?m=content&c=index&a=show&catid=142&id=26',
        title: 'SFLEP official page'
      },
      {
        icon: '🎓',
        label: 'STU News',
        url: 'https://www.stu.edu.cn/info/1085/10390.htm',
        title: 'Shantou University news'
      }
    ],
    posterUrl: 'videos/sflep-2023-poster.jpg',
    videoUrl: 'videos/sflep-2023-award.mp4'
  },

  contact: {
    headlineHtml: "Let's <span class=\"hl-green\">connect</span>.",
    subline: "Open to research collaboration, internships, and project discussions. Don't be a stranger.",
    email: 'junjie_yao0209@163.com',
    scholarUrl: 'https://scholar.google.com/citations?user=N9Y21zgAAAAJ',
    githubUrl: 'https://github.com/Junjie-Yao-Percy',
    location: 'Guangzhou, China'
  },

  footer: {
    primaryHtml: 'Built with <span class="heart">♥</span> by Yao Junjie · Last updated July 2026',
    legal: '© 2026 姚俊杰 · All rights reserved.'
  }
};
