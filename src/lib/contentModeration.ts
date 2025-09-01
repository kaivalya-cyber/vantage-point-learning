// Content moderation utility to detect malicious content while allowing educational criticism

const HARMFUL_PATTERNS = [
  // Personal attacks and harassment
  /\b(idiot|stupid|dumb|moron|retard|loser)\b/i,
  /\bgo (kill|die)\b/i,
  /\bkill yourself\b/i,
  
  // Hate speech and discrimination
  /\b(f[a@]gg[o0]t|n[i1]gg[e3]r|ch[i1]nk|sp[i1]c|k[i1]ke)\b/i,
  /\bhate (all|every) (black|white|asian|hispanic|muslim|christian|jewish) (people|students)\b/i,
  
  // Extreme profanity (while allowing mild criticism)
  /\bf[u\*]ck you\b/i,
  /\bsh[i1]t head\b/i,
  /\bb[i1]tch ass\b/i,
  
  // Threats and violence
  /\b(bomb|shoot|attack|hurt|harm) (the school|students|teachers)\b/i,
  /\bgoing to (kill|hurt|attack)\b/i,
  
  // Spam patterns
  /(.)\1{10,}/, // Repeated characters
  /\b(buy now|click here|free money|make money fast)\b/i,
];

// Educational criticism patterns that should be ALLOWED
const EDUCATIONAL_CRITICISM_PATTERNS = [
  /\b(hard|difficult|challenging|tough) (class|course|subject|teacher|professor)\b/i,
  /\b(hate|dislike) (math|science|history|english|physics|chemistry)\b/i,
  /\bworst (class|teacher|subject)\b/i,
  /\b(boring|stupid) (assignment|homework|test|quiz)\b/i,
  /\bthis (class|course) (sucks|is bad|is terrible)\b/i,
];

export interface ModerationResult {
  isAllowed: boolean;
  reason?: string;
  flaggedContent?: string;
}

export function moderateContent(content: string): ModerationResult {
  const normalizedContent = content.toLowerCase().trim();
  
  // Check if it's educational criticism (should be allowed)
  for (const pattern of EDUCATIONAL_CRITICISM_PATTERNS) {
    if (pattern.test(normalizedContent)) {
      return { isAllowed: true };
    }
  }
  
  // Check for harmful patterns
  for (const pattern of HARMFUL_PATTERNS) {
    const match = normalizedContent.match(pattern);       
    if (match) {
      return {
        isAllowed: false,
        reason: "Content contains inappropriate language or harmful content",
        flaggedContent: match[0]
      };
    }
  }
  
  // Check for excessive caps (might be shouting/aggressive)
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (content.length > 20 && capsRatio > 0.7) {
    return {
      isAllowed: false,
      reason: "Please avoid using excessive capital letters"
    };
  }
  
  // Check for very short, potentially unhelpful content
  if (normalizedContent.length < 3 && !normalizedContent.match(/^(yes|no|ok|hi)$/)) {
    return {
      isAllowed: false,
      reason: "Please provide more detailed content"
    };
  }
  
  return { isAllowed: true };
}

export function moderateQuestion(title: string, content: string): ModerationResult {
  // Check title        
  const titleResult = moderateContent(title);
  if (!titleResult.isAllowed) {
    return {
      ...titleResult,
      reason: `Question title: ${titleResult.reason}`
    };
  }
  
  // Check content
  const contentResult = moderateContent(content);
  if (!contentResult.isAllowed) {
    return {
      ...contentResult,
      reason: `Question content: ${contentResult.reason}`
    };
  }
  
  return { isAllowed: true };
}

export function moderateAnswer(content: string): ModerationResult {
  return moderateContent(content);
}