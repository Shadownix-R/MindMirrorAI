// Helper to export and download wellness reflection report

export const downloadWellnessReport = (reportData, userEmail = '') => {
  if (!reportData) return;

  const content = `
==================================================
        MINDMIRROR AI - WELLNESS REFLECTION
==================================================
Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
${userEmail ? `User Email: ${userEmail}\n` : ''}

--------------------------------------------------
1. WELLNESS SNAPSHOT
--------------------------------------------------
• Primary Emotion:   ${reportData.primaryEmotion || 'N/A'}
• Stress Level:      ${reportData.stressLevel || 'N/A'}
• Energy Level:      ${reportData.energyLevel || 'N/A'}
• Sleep Quality:     ${reportData.sleepSummary || 'N/A'}
• Positive Habits:   ${reportData.positiveHabits || 'N/A'}
• Primary Stress:    ${reportData.mainStressArea || 'N/A'}

--------------------------------------------------
2. AI INSIGHT & REFLECTION
--------------------------------------------------
${reportData.aiReflection || ''}

--------------------------------------------------
3. PERSONALISED ACTION PLAN
--------------------------------------------------
${(reportData.actionPlan || []).map((item, idx) => `${idx + 1}. ${item.replace(/\*\*/g, '')}`).join('\n')}

--------------------------------------------------
4. TODAY'S WELLNESS CHALLENGE
--------------------------------------------------
${reportData.todaysChallenge || ''}

--------------------------------------------------
5. MOTIVATIONAL QUOTE
--------------------------------------------------
"${reportData.motivationalQuote?.text || ''}"
— ${reportData.motivationalQuote?.author || 'MindMirror AI'}

==================================================
MindMirror AI is a supportive wellness tool. 
If you are in crisis or feel unsafe, please contact local emergency services or trusted support networks.
==================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MindMirror_Reflection_${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
