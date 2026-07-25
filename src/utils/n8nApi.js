// n8n Webhook Service & Fallback AI Reflection Generator

export const submitToN8nWebhook = async (formData, webhookUrl = 'https://rushil13.app.n8n.cloud/webhook/mindmirror-assessment') => {
  // Extract values supporting both flat and nested objects
  const email = formData.email || formData.reflection?.email || '';
  const thoughts = formData.thoughts || formData.reflection?.thoughts || '';
  const ageGroup = formData.ageGroup || formData.basicInfo?.ageGroup || '18–24';
  const occupation = formData.occupation || formData.basicInfo?.occupation || 'Working Professional';
  const moodLabel = formData.moodLabel || formData.feelings?.moodLabel || 'Calm';
  const moodEmoji = formData.moodEmoji || formData.feelings?.moodEmoji || '😌';
  const stressLevel = formData.stressLevel ?? formData.feelings?.stressLevel ?? 5;
  const energyLevel = formData.energyLevel ?? formData.feelings?.energyLevel ?? 6;
  const sleepQuality = formData.sleepQuality || formData.lifestyle?.sleepQuality || 'Good';
  const habits = formData.habits || formData.lifestyle?.habits || [];
  const stressSource = formData.stressSource || 'Work';

  const payload = {
    timestamp: new Date().toISOString(),
    email,
    thoughts,
    journalReflection: thoughts,
    reflection: thoughts,
    ageGroup,
    occupation,
    mood: moodLabel,
    moodLabel,
    moodEmoji,
    emoji: moodEmoji,
    stressLevel,
    energyLevel,
    sleepQuality,
    habits,
    positiveHabits: habits,
    stressSource,
    primaryStressArea: stressSource,
    userProfile: {
      ageGroup,
      occupation,
      email,
    },
    wellnessMetrics: {
      mood: moodLabel,
      emoji: moodEmoji,
      stressLevel,
      energyLevel,
      sleepQuality,
      positiveHabits: habits,
      primaryStressArea: stressSource,
    },
  };

  let webhookSuccess = false;
  let webhookResponseData = null;
  let diagnosticInfo = {
    attemptedUrls: [],
    statusCode: null,
    errorMsg: null,
  };

  const targetUrl = webhookUrl.trim() || 'https://rushil13.app.n8n.cloud/webhook/mindmirror-assessment';
  
  // Construct list of URL variants to try (Production URL, Test URL, Proxied URL)
  const urlsToTry = [];

  // 1. If it's the n8n cloud URL, try via Vite proxy first (bypasses browser CORS completely)
  if (targetUrl.includes('rushil13.app.n8n.cloud')) {
    const proxiedProd = targetUrl.replace('https://rushil13.app.n8n.cloud', '/n8n-proxy');
    urlsToTry.push({ url: proxiedProd, label: 'Vite Proxy (Production URL)' });
    
    const proxiedTest = proxiedProd.replace('/webhook/', '/webhook-test/');
    urlsToTry.push({ url: proxiedTest, label: 'Vite Proxy (Test URL)' });
  }

  // 2. Direct URLs
  urlsToTry.push({ url: targetUrl, label: 'Direct Production URL' });
  if (targetUrl.includes('/webhook/')) {
    urlsToTry.push({ url: targetUrl.replace('/webhook/', '/webhook-test/'), label: 'Direct Test URL' });
  }

  // Loop through URL candidates until successful
  for (const item of urlsToTry) {
    if (webhookSuccess) break;

    diagnosticInfo.attemptedUrls.push(item.label);
    console.log(`[n8n Dispatcher] Attempting connection via ${item.label}: ${item.url}`);

    // Try standard JSON post first, then simple text/plain post
    for (const contentType of ['application/json', 'text/plain']) {
      if (webhookSuccess) break;
      try {
        const response = await fetch(item.url, {
          method: 'POST',
          headers: {
            'Content-Type': contentType,
          },
          body: JSON.stringify(payload),
        });

        diagnosticInfo.statusCode = response.status;

        if (response.ok) {
          webhookSuccess = true;
          console.log(`[n8n Dispatcher] SUCCESS (${response.status}) via ${item.label}`);
          try {
            const rawText = await response.text();
            try {
              webhookResponseData = JSON.parse(rawText);
            } catch (jsonErr) {
              webhookResponseData = { rawResponse: rawText };
            }
          } catch (e) {
            webhookResponseData = null;
          }
          break;
        } else {
          console.warn(`[n8n Dispatcher] ${item.label} returned HTTP ${response.status}`);
          diagnosticInfo.errorMsg = `HTTP ${response.status} returned by n8n`;
        }
      } catch (err) {
        console.warn(`[n8n Dispatcher] Fetch failed via ${item.label} (${contentType}):`, err.message);
        diagnosticInfo.errorMsg = err.message;
      }
    }
  }

  // Parse response from n8n if available
  let parsedN8nReport = null;
  if (webhookSuccess && webhookResponseData) {
    let dataObj = webhookResponseData;
    if (Array.isArray(dataObj) && dataObj.length > 0) {
      dataObj = dataObj[0];
    }

    const aiText = dataObj.aiReflection ||
                   dataObj.reflection ||
                   dataObj.output ||
                   dataObj.text ||
                   dataObj.message ||
                   dataObj.response ||
                   (typeof dataObj.rawResponse === 'string' ? dataObj.rawResponse : null);

    if (aiText) {
      parsedN8nReport = {
        primaryEmotion: dataObj.primaryEmotion || `${moodEmoji} ${moodLabel}`,
        stressLevel: dataObj.stressLevel || `${stressLevel} / 10`,
        energyLevel: dataObj.energyLevel || `${energyLevel} / 10`,
        sleepSummary: dataObj.sleepSummary || sleepQuality,
        positiveHabits: dataObj.positiveHabits || (habits.length > 0 ? habits.join(', ') : 'None logged'),
        mainStressArea: dataObj.mainStressArea || stressSource,
        aiReflection: aiText,
        actionPlan: dataObj.actionPlan || [
          "🌙 Take 3 deep box-breaths whenever feeling overwhelmed.",
          "🌿 Set a micro-boundary around " + stressSource + " today.",
          "🚶 Take a 10-minute walk outside to ground your senses."
        ],
        todaysChallenge: dataObj.todaysChallenge || "Spend 5 minutes in complete quiet with no digital notifications.",
        motivationalQuote: dataObj.motivationalQuote || {
          text: "Peace is not the absence of trouble, but the presence of quiet stillness within.",
          author: "MindMirror AI"
        }
      };
    }
  }

  const finalReport = parsedN8nReport || generateSmartFallbackReflection(formData);

  return {
    webhookSuccess,
    report: finalReport,
    diagnosticInfo,
  };
};

export const triggerEmailSend = async (webhookUrl, reportData, email) => {
  if (!webhookUrl || !email) return false;
  const targetUrl = webhookUrl.includes('rushil13.app.n8n.cloud')
    ? webhookUrl.replace('https://rushil13.app.n8n.cloud', '/n8n-proxy')
    : webhookUrl;

  try {
    const response = await fetch(targetUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send_email',
        email,
        report: reportData,
        timestamp: new Date().toISOString(),
      }),
    });
    return response.ok;
  } catch (err) {
    console.warn("Email trigger post error", err);
    return false;
  }
};

function generateSmartFallbackReflection(formData) {
  const mood = formData.moodLabel || formData.feelings?.moodLabel || 'Calm';
  const moodEmoji = formData.moodEmoji || formData.feelings?.moodEmoji || '😌';
  const stress = formData.stressLevel ?? formData.feelings?.stressLevel ?? 5;
  const energy = formData.energyLevel ?? formData.feelings?.energyLevel ?? 6;
  const sleep = formData.sleepQuality || formData.lifestyle?.sleepQuality || 'Good';
  const habits = formData.habits || formData.lifestyle?.habits || [];
  const stressArea = formData.stressSource || 'Work';
  const thoughts = formData.thoughts || formData.reflection?.thoughts || '';

  let reflectionText = `Thank you for taking a pause to mirror your inner thoughts. `;
  
  if (stress >= 7) {
    reflectionText += `It looks like you're navigating high stress around **${stressArea}** right now. Carrying a heavy emotional load can feel exhausting, but acknowledging it is a brave first step. `;
  } else if (stress >= 4) {
    reflectionText += `You are maintaining a balanced posture despite noticeable tension coming from **${stressArea}**. `;
  } else {
    reflectionText += `Your stress levels feel manageable right now, giving you a serene headspace to focus on self-growth. `;
  }

  if (thoughts.trim()) {
    reflectionText += `Your reflection on *" ${thoughts.slice(0, 70)}${thoughts.length > 70 ? '...' : ''} "* shows deep self-awareness. Remember that emotions are transient waves—they inform us, but they do not define us.`;
  } else {
    reflectionText += `Giving yourself this quiet moment of awareness helps regulate your central nervous system and realign your daily energy.`;
  }

  const actionPlan = [];

  if (sleep === 'Poor' || sleep === 'Very Poor') {
    actionPlan.push("🌙 **Sleep Hygiene Warmup**: Wind down 45 minutes before bed without screens. Try our Guided Ambient Rain in the Wellness Corner.");
  } else {
    actionPlan.push("🧘 **Mindful Transition**: Take 3 deep box-breaths whenever switching between major daily activities.");
  }

  if (stress >= 6) {
    actionPlan.push("🌿 **Micro-Boundary**: Delegate or set aside 1 non-essential task related to " + stressArea + " today to protect your mental battery.");
  } else {
    actionPlan.push("✨ **Gratitude Anchor**: Write down 1 subtle thing that brought you warmth today on our Gratitude Star Wall.");
  }

  if (!habits.includes('Went outside') || !habits.includes('Exercised recently')) {
    actionPlan.push("🚶 **Somatosensory Walk**: Take a brief 10-minute walk outside without headphones to ground your sensory awareness.");
  } else {
    actionPlan.push("💧 **Hydration & Pause**: Sip a glass of water slowly while releasing shoulder and jaw tension.");
  }

  const quotes = [
    { text: "Peace is not the absence of trouble, but the presence of quiet stillness within.", author: "Calm Mindfulness wisdom" },
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
    { text: "Small steps in the right direction can turn out to be the biggest step of your life.", author: "MindMirror AI" }
  ];
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const challenges = [
    "Spend 5 minutes in complete quiet with no digital notifications.",
    "Do 4 rounds of 4-7-8 breathing before your next meal.",
    "Pop 5 stress bubbles in our Bubble Pop corner to symbolize letting go.",
    "Send a kind text message to a trusted friend or family member."
  ];
  const selectedChallenge = challenges[Math.floor(Math.random() * challenges.length)];

  return {
    primaryEmotion: `${moodEmoji} ${mood}`,
    stressLevel: `${stress} / 10`,
    energyLevel: `${energy} / 10`,
    sleepSummary: sleep,
    positiveHabits: habits.length > 0 ? habits.join(', ') : 'None logged today',
    mainStressArea: stressArea,
    aiReflection: reflectionText,
    actionPlan: actionPlan,
    todaysChallenge: selectedChallenge,
    motivationalQuote: selectedQuote,
  };
}
