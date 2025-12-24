
import { UserProfile, ReadingResult, FortuneType } from "../types";

/**
 * SiliconFlow API 配置
 * 采用 OpenAI 兼容协议
 */
const SILICONFLOW_API_URL = "https://api.siliconflow.cn/v1/chat/completions";
const MODEL_NAME = "deepseek-ai/DeepSeek-V3";

export const generateFortune = async (
  profile: UserProfile,
  type: FortuneType,
  question?: string
): Promise<ReadingResult> => {
  let typeDescription = "";
  switch(type) {
    case FortuneType.BAZI:
      typeDescription = "深度八字排盘分析，包含四柱、五行损益、十神格局、大运流年。";
      break;
    case FortuneType.DAILY:
      typeDescription = "今日运势预测，包含今日吉凶、宜忌、财富/事业/感情的具体评分。";
      break;
    case FortuneType.ICHING:
      typeDescription = `周易金钱卦预测。针对问题：'${question || '近期运势'}'。模拟摇卦过程，给出本卦、变卦及爻辞解析。`;
      break;
    case FortuneType.ZODIAC:
      typeDescription = "生肖流年分析，分析本命生肖在当下的机遇与挑战。";
      break;
    case FortuneType.ROMANCE:
      typeDescription = "深度姻缘合婚分析。解析命中桃花、正缘特征、婚恋时机、感情和谐度及潜在阻碍。";
      break;
  }

  const systemInstruction = `你是一位精通中国传统命理（八字、周易、占星）的大师。语气儒雅、睿智且具有人文关怀。
你必须返回纯 JSON 格式的数据，不要包含任何 Markdown 代码块或额外文字。
JSON 结构如下：
{
  "title": "分析标题",
  "summary": "核心总结",
  "aspects": [
    { "label": "运势维度", "content": "分析内容", "score": 85, "icon": "font-awesome-icon-name" }
  ],
  "advice": "大师寄语",
  "luckyElements": { "color": "幸运色", "number": "幸运数字", "direction": "贵人方位" }
}`;

  const userPrompt = `
    分析任务：${typeDescription}
    用户信息：
    姓名：${profile.name}
    出生日期：${profile.birthDate}
    出生时间：${profile.birthTime || '未知'}
    性别：${profile.gender === 'male' ? '男 (乾造)' : '女 (坤造)'}
    地点：${profile.location || '未知'}
  `;

  try {
    const response = await fetch(SILICONFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || "天机受阻，无法连通星脉。");
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // 兼容性清理：移除可能存在的 Markdown 标记
    content = content.replace(/```json\n?/, '').replace(/\n?```/, '').trim();
    
    return JSON.parse(content) as ReadingResult;
  } catch (error) {
    console.error("SiliconFlow Analysis Error:", error);
    throw new Error("天机暂时受阻，大师正在闭关，请稍后再试。");
  }
};

export const chatWithMaster = async (message: string, history: { role: 'user' | 'bot', text: string }[]) => {
  try {
    const messages = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text
    }));
    
    messages.push({ role: 'user', content: message });

    const response = await fetch(SILICONFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: "你是一位精通易经、八字、占星与心理咨询的命理大师。你的语气儒雅、睿智、平和。你能够通过对话帮助人们找到内心的平静和未来的方向。" },
          ...messages
        ],
        temperature: 0.8
      })
    });

    if (!response.ok) return "星象紊乱，大师暂无法回应。";
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("SiliconFlow Chat Error:", error);
    return "星象紊乱，大师暂无法回应。";
  }
};
